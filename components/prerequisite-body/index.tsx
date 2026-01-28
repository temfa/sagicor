/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const PrerequisiteBody = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <LogoSvg />
      <div className={styles.wrapper}>
        {page === 1 ? (
          <div className={styles.first}>
            <h2>Please prepare your document before starting the process</h2>
          </div>
        ) : page === 2 ? (
          <div className={styles.second}>
            <div>
              <h2>Read before you proceed</h2>
              <h2>Here are some best practices so that the process is smooth</h2>
            </div>
            <p>
              Before we get started, you need to agree to the following: <br /> 1.You must take a picture of you original ID. <br />
              2. You must take a selfie.
            </p>
          </div>
        ) : page === 3 ? (
          <div className={styles.fourth}>
            <div className={styles.header}>
              <h2>About your ID...</h2>
              <p>What type of ID will you be using and in what country was it issued?</p>
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <select>
                <option value="">Country</option>
                <option value="Barbados">Barbados</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>ID Type</label>
              <select>
                <option value="">ID Type</option>
                <option value="id">National ID</option>
                <option value="driver">Drivers License</option>
              </select>
            </div>
          </div>
        ) : (
          <div className={styles.first}>
            <h2>Capture your document</h2>
          </div>
        )}
      </div>
      <Button
        buttonText={page === 1 ? "Start" : "Continue"}
        loading={false}
        active
        onClick={() => {
          page !== 4 ? setPage(page + 1) : router.push("/capture");
        }}
      />
    </div>
  );
};
