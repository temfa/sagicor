import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import { Button } from "../button";

export const Sorry = ({ link }: { link: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LogoSvg />
        <div>
          <h2>Sorry, we are only opening accounts for residents of Barbados</h2>
          <p>If you are not a resident of Barbados, please download the Sagicor Bank Mobile App available in the Play Store or App Store to continue banking with us.</p>
        </div>
      </div>
      <Button buttonText="Exit" loading={false} onClick={() => (window.location.href = link)} active />
    </div>
  );
};
