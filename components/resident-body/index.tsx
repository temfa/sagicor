"use client";
import { BackSvg } from "@/svgs/back";
import styles from "./styles.module.css";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { getItem } from "@/utils/lib";

export const ResidentBody = () => {
  const router = useRouter();
  const link = getItem("params");
  const parsedLink = JSON.parse(link as string);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <BackSvg color="#2B388F" />
          <LogoSvg />
          <h2 onClick={() => (window.location.href = parsedLink.deepLinkUrl)}>Exit</h2>
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
        <Button buttonText="No" loading={false} active disabled />
      </div>
    </div>
  );
};
