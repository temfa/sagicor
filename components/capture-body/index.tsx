"use client";
import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import CameraCapture from "../camera";
import { useRouter } from "next/navigation";

export const CaptureBody = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <LogoSvg />
      <CameraCapture action={() => router.push("/register")} />
    </div>
  );
};
