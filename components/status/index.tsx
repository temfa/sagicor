import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import { Button } from "../button";

export const StatusBody = () => {
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
      <Button buttonText="Exit" loading={false} active />
    </div>
  );
};
