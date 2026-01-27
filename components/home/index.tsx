"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import { decrypt3DESBrowser } from "@/utils/helper";
import { setItem } from "@/utils/lib";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../../app/page.module.css";

export const HomePage = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("params");
  const payload = decrypt3DESBrowser(params as string);
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
};
