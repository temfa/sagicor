/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { LogoWhiteSvg } from "@/svgs/logo-white";
import { decrypt3DESBrowser } from "@/utils/helper";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../app/page.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addDetails } from "@/redux/slice/details";

export const HomePage = () => {
  const [parsedPayload, setParsedPayload] = useState({
    email: "",
    phoneNumber: "",
    successDeepLinkUrl: "",
    failureDeepLinkUrl: "",
    metaData: {
      device_id: "",
      ip_address: "",
      device_mac: "",
      appVersion: "",
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = searchParams.get("params");

  const isValidJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (params) {
      const payload = decrypt3DESBrowser(params as string);
      console.log(payload);
      if (payload.success) {
        if (isValidJson(payload.data)) {
          setParsedPayload(JSON.parse(payload.data));
          dispatch(addDetails(JSON.parse(payload.data)));
        } else {
          router.push(`/status?state=INVALID_PARAMS`);
        }
      } else {
        router.push(`/status?state=INVALID_PARAMS`);
      }
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
          <p>Please take a moment to read and consent to how Sagicor Bank collects and uses your data in order to continue with your registration process.</p>
        </div>
      </div>
      <div className={styles.link}>
        <Link href="/how">OPEN ACCOUNT</Link>
      </div>
    </div>
  );
};
