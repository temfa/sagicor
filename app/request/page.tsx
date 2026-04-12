/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import styles from "./styles.module.css";
import { BackSvg } from "@/svgs/back";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/redux/store/store";
import { useVerification } from "@/hooks/useVerification";
import { Loader } from "@/components/loader";

const Request = () => {
  const router = useRouter();
  const details = useAppSelector((store) => store.details);
  const parsedDetails = useMemo(() => {
    if (!details) return null;

    try {
      return details;
    } catch {
      return null;
    }
  }, [details]);

  const link = parsedDetails?.failureDeepLinkUrl ?? "";

  const { start, loading, error, authentixLink, success } = useVerification();

  const action = () => {
    if (!parsedDetails) return;

    start(`+${parsedDetails.phoneNumber}`, parsedDetails.metaData?.device_id, parsedDetails.metaData?.device_mac);
  };

  useEffect(() => {
    if (success) router.push("/register");
  }, [success]);

  useEffect(() => {
    if (error) {
      router.push("/status");
      console.log(error);
    }
  }, [error, link]);

  if (authentixLink)
    return (
      <div className={styles.iframe}>
        <iframe src={authentixLink} title="" />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <BackSvg color="#FFFFFF" action={() => router.back()} />
          <LogoWhiteSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
        </div>
        <div className={styles.wrapper}>
          <h2>
            Let’s <span>get to know you!</span>{" "}
          </h2>
          <p>We’ll need your Barbados issued ID (national ID, passport, or driver’s license) and selfie.</p>
        </div>
      </div>
      <div className={styles.link}>
        <button onClick={action}>{loading ? <Loader /> : "CONTINUE"} </button>
      </div>
    </div>
  );
};

export default Request;
