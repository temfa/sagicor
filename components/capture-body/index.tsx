"use client";
import { LogoSvg } from "@/svgs/logo";
import styles from "./styles.module.css";
import CameraCapture from "../camera";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CaptureBody = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const headings = ["Front of ID", "Back of ID", "Selfie"];
  return (
    <div className={styles.container}>
      <LogoSvg />
      <div>
        <h2>{headings[page - 1]}</h2>
        {page === 1 && <CameraCapture action={() => setPage(page + 1)} />}
        {page === 2 && <CameraCapture action={() => setPage(page + 1)} />}
        {page === 3 && <CameraCapture action={() => router.push("/register")} />}
      </div>
    </div>
  );
};
