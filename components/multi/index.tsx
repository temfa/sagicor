/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../button";
import { BackSvg } from "@/svgs/back";
import { LogoSvg } from "@/svgs/logo";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import Input from "../input";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

export const MultiForm = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();

  const details = JSON.parse(useAppSelector((store) => store.details));
  console.log(details);

  useEffect(() => {
    setValue("email", details?.email);
    console.log(details.email);
  }, [details]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {page !== 1 && <BackSvg color="#2B388F" />}
          <LogoSvg />
          <h2>Exit</h2>
        </div>
        {page === 1 ? (
          <div className={styles.first}>
            <div>
              <h2>
                Personal <span>Information</span>
              </h2>
              <p>Review and fill in any missing details below.</p>
            </div>
            <div className={styles.form}>
              <Select
                label="Title"
                placeholder="Choose Title"
                data={[
                  { title: "Mr", value: "Mr" },
                  { title: "Mrs", value: "Mrs" },
                  { title: "Miss", value: "Miss" },
                  { title: "Dr", value: "Dr" },
                ]}
                name="title"
                register={register}
              />
              <Input label="First Name" placeholder="Enter First Name" name="fname" register={register} type="text" />
              <Input label="Middle Name" placeholder="Enter Middle Name" name="mname" register={register} type="text" />
              <Input label="Last Name" placeholder="Enter Last Name" name="lname" register={register} type="text" />
              <Select
                label="Gender"
                placeholder="Choose Gender"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="gender"
                register={register}
              />
              <Select
                label="Citizenship"
                placeholder="Choose Citizenship"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="citizenship"
                register={register}
              />
              <Select
                label="Nationality"
                placeholder="Choose Nationality"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="nationality"
                register={register}
              />
              <Input label="Date of Birth" placeholder="DD/MM/YYYY" name="dob" register={register} type="date" />
              <Input label="Place of Birth" placeholder="Enter Place of Birth" name="placeOfBirth" register={register} type="text" />
              <Input label="Email" placeholder="Enter Email" name="email" register={register} type="email" />
            </div>
          </div>
        ) : page === 2 ? (
          <div className={styles.second}>
            <h2>
              Please enter <span>your address</span>
            </h2>
            <div className={styles.form}>
              <Input label="Address Line 1" placeholder="Enter Address Line 1" name="address1" register={register} type="text" />
              <Input label="Address Line 2 (Optional)" placeholder="Enter Address Line 2" name="address2" register={register} type="text" />
              <Select
                label="City"
                placeholder="Choose City"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="city"
                register={register}
              />
              <Select
                label="State/Province/Region/Parish"
                placeholder="Choose State"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="state"
                register={register}
              />
              <Select
                label="Country"
                placeholder="Choose Country"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="country"
                register={register}
              />
              <Input label="ZIP/Postal Code" placeholder="Enter ZIP/Postal Code" name="zipCode" register={register} type="text" />
            </div>
          </div>
        ) : page === 3 ? (
          <div className={styles.second}>
            <h2>
              Check your <span>document data</span>
            </h2>
            <div className={styles.form}>
              <Input label="Document ID Number" placeholder="Enter Document ID Number" name="documentNumber" register={register} type="text" />
              <Input label="National ID Number" placeholder="Enter National ID Number" name="nationalNumber" register={register} type="text" />
              <Select
                label="Type"
                placeholder="Choose Type"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="city"
                register={register}
              />
              <Select
                label="Issuing Country"
                placeholder="Choose Issuing Country"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="state"
                register={register}
              />
              <Input label="Issue Date" placeholder="Enter DD/MM/YYYY" name="issueDate" register={register} type="date" />
              <Input label="Expiry Date" placeholder="Enter DD/MM/YYYY" name="expiryDate" register={register} type="date" />
            </div>
          </div>
        ) : (
          <div className={styles.first}>
            <div>
              <h2>
                Questions we <span>have to ask</span>
              </h2>
              <p>(Banking regulators need to know).</p>
            </div>
            <div className={styles.form}>
              <Select label="Source of Funds" placeholder="Choose Source" data={[{ title: "Mr", value: "Mr" }]} name="source" register={register} />
              <Input label="Source of Other Funds" placeholder="Enter Source of Other Funds" name="other" register={register} type="text" />
              <Select
                label="Purpose of Account"
                placeholder="Choose Purpose of Account"
                data={[
                  { title: "Male", value: "Male" },
                  { title: "Female", value: "Female" },
                ]}
                name="gender"
                register={register}
              />
            </div>
          </div>
        )}
      </div>
      <Button buttonText="Next" loading={false} active onClick={() => (page !== 4 ? setPage(page + 1) : router.push("/status"))} />
    </div>
  );
};
