"use client";
import { useMemo, useState } from "react";
import styles from "./styles.module.css";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { BackSvg } from "@/svgs/back";
import { useAppSelector } from "@/redux/store/store";

export const UserBody = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);
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
          <BackSvg color="#2B388F" action={() => router.back()} />
          <LogoSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
        </div>
        <div className={styles.how}>
          <h2>
            <span> Read Account Opening </span>Terms and Conditions
          </h2>
          <div>
            <p>
              Security deposit agreement outlines the amount of security deposit to be collected, the reasons why the deposit may be kept, and when and how it will be returned to
              the tenant. The security deposit agreement is often part of a longer lease agreement.
            </p>
            <p>
              A lease agreement gives the terms of a lease, such as whether it is a month-to-month lease or for a fixed period of time. A sublease agreement is between a current
              tenant and a new tenant who temporarily will rent the space from the current tenant.
            </p>
            <p>
              All of these tenancy agreements also will have information about payment, expectations while renting the space, and beginning and end dates of the rental term. Our
              tenancy agreement templates help you ensure that all of the necessary information is there.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.input}>
          <input type="checkbox" name="" id="" onChange={() => setActive(true)} />
          <p>I consent to the collection and usage of my data</p>
        </div>
        <Button buttonText="CONFIRM" loading={false} active={active} onClick={() => router.push("/resident")} />
      </div>
    </div>
  );
};
