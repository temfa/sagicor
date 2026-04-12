"use client";
import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import { Button } from "../button";
import { useAppSelector } from "@/redux/store/store";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearDetails } from "@/redux/slice/details";
import { clearSessionId } from "@/redux/slice/sessionId";

type StatusConfig = {
  title: string;
  subtitle?: string;
  description: string;
};

const STATUS_MAP: Record<string, StatusConfig> = {
  UNDER_REVIEW: {
    title: "Thank you!",
    subtitle: "We’ve received your application and it is currently being reviewed.",
    description: "Look out for an email from us within 5 business days advising you of the next steps to continue the account opening process.",
  },
  ACCOUNT_OPENING_ERROR: {
    title: "We’re unable to open your account",
    description:
      "We regret to inform you that we were unfortunately unable to open your account at this time. If you have any questions or concerns please visit the Support Centre page on our website and select an appropriate contact method.",
  },
  EXISTING_USER: {
    title: "Oops.. it looks like you are already in the system",
    description: "Please login to the Sagicor Bank Mobile App to add an existing account.",
  },
  INVALID_PARAMS: {
    title: "Invalid Parameters",
    description: "Please contact your administrator.",
  },
};

const DEFAULT_STATUS: StatusConfig = {
  title: "Oops... an error occurred",
  description: "Please try again in a few minutes.",
};

export const StatusBody = () => {
  const details = useAppSelector((store) => store.details);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "";

  const parsedDetails = useMemo(() => {
    if (!details) return null;

    try {
      return state === "UNDER_REVIEW" ? details.successDeepLinkUrl : details.failureDeepLinkUrl;
    } catch {
      return null;
    }
  }, [details, state]);

  const config = STATUS_MAP[state] || DEFAULT_STATUS;

  return (
    <div className={styles.container}>
      <LogoSvg />

      <div className={styles.content}>
        <h2>{config.title}</h2>

        <div>
          {config.subtitle && <h2>{config.subtitle}</h2>}
          <p>{config.description}</p>
        </div>
      </div>

      <Button
        buttonText="Exit"
        onClick={() => {
          if (parsedDetails) {
            dispatch(clearDetails());
            dispatch(clearSessionId());
            window.location.href = parsedDetails;
          }
        }}
        loading={false}
        active
      />
    </div>
  );
};
