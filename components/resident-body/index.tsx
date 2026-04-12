"use client";
import { BackSvg } from "@/svgs/back";
import styles from "./styles.module.css";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { useMemo, useState } from "react";
import { Sorry } from "../sorry";

export const ResidentBody = () => {
  const router = useRouter();
  const details = useAppSelector((store) => store.details);
  const link = useMemo(() => {
    if (!details) return "";
    try {
      return details?.failureDeepLinkUrl ?? "";
    } catch {
      return "";
    }
  }, [details]);
  const failedLink = useMemo(() => {
    if (!details) return "";
    try {
      return details?.failureDeepLinkUrl ?? "";
    } catch {
      return "";
    }
  }, [details]);
  const [status, setStatus] = useState(false);
  if (status) return <Sorry link={failedLink} />;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <BackSvg color="#2B388F" action={() => router.back()} />
          <LogoSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
        </div>
        <div className={styles.content}>
          <h2>
            Are you a resident of <span>Barbados?</span>{" "}
          </h2>
          <p>Currently, we are only opening accounts for residents of Barbados.</p>
        </div>
      </div>
      <div className={styles.button}>
        <Button buttonText="Yes" loading={false} active onClick={() => router.push("request")} />
        <Button buttonText="No" loading={false} active disabled onClick={() => setStatus(true)} />
      </div>
    </div>
  );
};
