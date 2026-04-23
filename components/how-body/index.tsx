"use client";
import { useMemo, useState } from "react";
import styles from "./styles.module.css";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

export const HowBody = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const details = useAppSelector((store) => store.details);

  const link = useMemo(() => {
    if (!details) return "";
    try {
      return details?.failureDeepLinkUrl ?? "";
    } catch {
      return "";
    }
  }, [details]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
        </div>
        <div className={styles.how}>
          <h2>How we use your data</h2>
          <p>
            <span>Sagicor Bank</span> collects and stores identification information (ID card, driver&rsquo;s licence, passport, selfie and address) to allow us to verify your
            identity and secure your account when you register to use the services of Sagicor Bank (Barbados) Limited.
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.input}>
          <input type="checkbox" name="" id="" onChange={() => setActive(!active)} />
          <p>I consent to the collection and usage of my data</p>
        </div>
        <Button
          buttonText="CONFIRM"
          loading={false}
          active={active}
          onClick={() => {
            if (active) router.push("/resident");
          }}
        />
      </div>
    </div>
  );
};
