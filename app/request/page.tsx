import { LogoWhiteSvg } from "@/svgs/logo-white";
import styles from "./styles.module.css";
import Link from "next/link";
import { BackSvg } from "@/svgs/back";

const Request = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <BackSvg color="#FFFFFF" />
          <LogoWhiteSvg />
          <h2>Exit</h2>
        </div>
        <div className={styles.wrapper}>
          <h2>Let’s get to know you!</h2>
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
