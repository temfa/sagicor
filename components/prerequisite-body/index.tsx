/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { LogoSvg } from "@/svgs/logo";
import { Button } from "../button";
import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Select } from "../select";
import Image from "next/image";

type FormData = {
  country: string;
  idType: string;
};

export const PrerequisiteBody = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const submit = () => {
    setPage(4);
  };
  return (
    <div className={styles.container}>
      <LogoSvg />
      <div className={styles.wrapper}>
        {page === 1 ? (
          <div className={styles.first}>
            <h2>Please prepare your document before starting the process</h2>
            <div>
              <Image src="/images/hand.png" width={250} height={200} alt="Hand" />
            </div>
          </div>
        ) : page === 2 ? (
          <div className={styles.second}>
            <div>
              <h2>Read before you proceed</h2>
              <h2>Here are some best practices so that the process is smooth</h2>
            </div>
            <p>
              Before we get started, you need to agree to the following: <br /> 1.You must take a picture of your original ID. <br />
              2. You must take a selfie.
            </p>
          </div>
        ) : page === 3 ? (
          <form onSubmit={handleSubmit(submit)} className={styles.fourth}>
            <div>
              <div className={styles.header}>
                <h2>About your ID...</h2>
                <p>What type of ID will you be using and in what country was it issued?</p>
              </div>
              <div className={styles.formGroup}>
                <Select
                  label="Country"
                  placeholder="Choose  Country"
                  data={[
                    { title: "Barbados", value: "Barbados" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="country"
                  register={register}
                  rules={{
                    required: "Country is required",
                  }}
                />
                {errors.country && <span className="error">{errors.country.message}</span>}
              </div>
              <div className={styles.formGroup}>
                <Select
                  label="ID Type"
                  placeholder="Choose ID Type"
                  data={[
                    { title: "Driver's License", value: "Driver's License" },
                    { title: "National ID", value: "National ID" },
                  ]}
                  name="idType"
                  register={register}
                  rules={{
                    required: "ID Type is required",
                  }}
                />
                {errors.idType && <span className="error">{errors.idType.message}</span>}
              </div>
            </div>
            <Button buttonText={"CONTINUE"} loading={false} active />
          </form>
        ) : (
          <div className={styles.first}>
            <h2>Capture your document</h2>
            <div>
              <Image src="/images/scan.png" width={250} height={200} alt="Hand" />
            </div>
          </div>
        )}
      </div>
      {page !== 3 && (
        <Button
          buttonText={page === 1 ? "START" : "CONTINUE"}
          loading={false}
          active
          onClick={() => {
            page !== 4 ? setPage(page + 1) : router.push("/capture");
          }}
        />
      )}
    </div>
  );
};
