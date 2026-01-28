"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import styles from "./styles.module.css";
import Link from "next/link";
import { BackSvg } from "@/svgs/back";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAppSelector } from "@/redux/store/store";

const Request = () => {
  const router = useRouter();
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
        <Link href="/prerequisite">CONTINUE</Link>
      </div>
    </div>
  );
};

export default Request;
