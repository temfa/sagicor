/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import { decrypt3DESBrowser } from "@/utils/helper";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../../app/page.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addDetails } from "@/redux/slice/details";

export const HomePage = () => {
  const [parsedPayload, setParsedPayload] = useState({ email: "", phoneNumber: "", successDeepLinkUrl: "", failureDeepLinkUrl: "" });
  const searchParams = useSearchParams();
  const params = searchParams.get("params");

  const dispatch = useDispatch();
  useEffect(() => {
    if (params) {
      const payload = decrypt3DESBrowser(params as string);
      setParsedPayload(JSON.parse(payload));
      dispatch(addDetails(payload));
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoWhiteSvg />
          <h2 onClick={() => (window.location.href = parsedPayload.successDeepLinkUrl)}>Exit</h2>
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
