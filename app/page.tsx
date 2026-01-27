"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import styles from "./page.module.css";
import Link from "next/link";
import { decryptWith3DesClient } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { setItem } from "@/utils/lib";

export default function Home() {
  const searchParams = useSearchParams();
  const params = searchParams.get("params");
  const payload = decryptWith3DesClient(decodeURIComponent(params as string), "KopqC22gKwFmXpLw369IlPNCtozTvzLBwUFKCv3KHX8=");
  const parsedPayload = JSON.parse(payload);
  setItem("params", payload);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoWhiteSvg />
          <h2 onClick={() => (window.location.href = parsedPayload.deepLinkUrl)}>Exit</h2>
        </div>
        <div className={styles.wrapper}>
          <h2>
            Welcome! <br /> <span>Before we get started...</span>
          </h2>
          <p>
            Please take a moment to read and accept our <span>Terms and Conditions</span> in order to continue with your registration process.
          </p>
        </div>
      </div>
      <div className={styles.link}>
        <Link href="/how">OPEN ACCOUNT</Link>
      </div>
    </div>
  );
}
