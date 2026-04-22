/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useVerification.ts

import { addSessionId } from "@/redux/slice/sessionId";
import { checkSession, endSession, startSession } from "@/services/session";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

interface UseVerificationReturn {
  start: (phoneNumber: string, udid: string, addid: string) => Promise<void>;
  loading: boolean;
  success: boolean;
  //   polling: boolean;
  error: string | null;
  authentixLink: string | null;
}

export const useVerification = (): UseVerificationReturn => {
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [authentixLink, setAuthentixLink] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [udid, setUdid] = useState<string>("");
  const [addid, setAddid] = useState<string>("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useDispatch();
  const attemptsRef = useRef(0);

  const router = useRouter();

  const MAX_ATTEMPTS = 60;

  const start = async (phoneNumber: string, udid: string, addid: string) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const session = await startSession(phoneNumber, udid, addid);
      console.log(session);
      setAddid(addid);
      setUdid(udid);

      setAuthentixLink(session.link);
      dispatch(addSessionId(session.id));
      const result = await endSession(session.id, udid, addid);
      if (result.BimPaySaveDocResult.success) {
        setSessionId(session.id);
        setPolling(true);
        attemptsRef.current = 0;
      }
    } catch (err: any) {
      setError(err.message || "Failed to start verification");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!polling || !sessionId) return;

    let isActive = true;

    const poll = async () => {
      if (!isActive) return;

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setError("Verification timed out");
        setPolling(false);
        return;
      }

      attemptsRef.current++;

      try {
        const result = await checkSession(sessionId, udid, addid);

        if (result.BimPayCheckAu10tixResult.status === "DONE") {
          setPolling(false);
          setSuccess(true);
          router.push("/register");
          setTimeout(() => {
            setAuthentixLink(null);
          }, 2000);
          return;
        }

        if (result.BimPayCheckAu10tixResult.status === "FAILED") {
          setError("Verification failed");
          setPolling(false);
          return;
        }

        timeoutRef.current = setTimeout(poll, 5000);
      } catch {
        timeoutRef.current = setTimeout(poll, 5000);
      }
    };

    poll();

    return () => {
      isActive = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [polling, sessionId, udid, addid]);

  return {
    start,
    loading,
    // polling,
    error,
    success,
    authentixLink,
  };
};
