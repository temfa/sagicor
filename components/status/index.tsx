"use client";
import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import { Button } from "../button";
import { useAppSelector } from "@/redux/store/store";
import { useMemo } from "react";

export const StatusBody = () => {
  const details = useAppSelector((store) => store.details);
  const link = useMemo(() => {
    if (!details) return "";
    try {
      return JSON.parse(details)?.deepLinkUrl ?? "";
    } catch {
      return "";
    }
  }, [details]);
  return (
    <div className={styles.container}>
      <LogoSvg />
      <div className={styles.content}>
        <h2>Thank you!</h2>
        <div>
          <h2>We’ve received your application and it is currently being reviewed.</h2>
          <p>Look out for an email from us within 5 business days advising you of the next steps to continue the account opening process.</p>
        </div>
      </div>
      <Button buttonText="Exit" onClick={() => (window.location.href = link)} loading={false} active />
    </div>
  );
};
