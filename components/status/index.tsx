"use client";
import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import { Button } from "../button";
import { getItem } from "@/utils/lib";

export const StatusBody = () => {
  const link = getItem("params");
  const parsedLink = JSON.parse(link as string);
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
      <Button buttonText="Exit" onClick={() => (window.location.href = parsedLink.deepLinkUrl)} loading={false} active />
    </div>
  );
};
