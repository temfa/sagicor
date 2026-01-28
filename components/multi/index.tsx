"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../button";
import { BackSvg } from "@/svgs/back";
import { LogoSvg } from "@/svgs/logo";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import Input from "../input";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

const stepFields: Record<number, (keyof FormData)[]> = {
  1: ["title", "fname", "mname", "lname", "gender", "citizenship", "nationality", "dob", "placeOfBirth"],
  2: ["address1", "address2", "city", "state", "country", "zipCode"],
  3: ["documentNumber", "nationalNumber", "type", "issuingCountry", "issueDate", "expiryDate"],
  4: ["source", "other", "purpose"],
};
type FormData = {
  title: string;
  fname: string;
  mname?: string;
  lname: string;
  gender: string;
  citizenship: string;
  nationality: string;
  dob: string;
  placeOfBirth: string;

  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  type: string;

  documentNumber: string;
  nationalNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingCountry: string;
  purpose: string;
  source: string;
  other?: string;
};

export const MultiForm = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const details = useAppSelector((store) => store.details);

  const link = details
    ? (() => {
        try {
          return JSON.parse(details)?.deepLinkUrl ?? "";
        } catch {
          return "";
        }
      })()
    : "";

  const handleNext = async () => {
    const fieldsToValidate = stepFields[page];
    const values = getValues();
    console.log(values);

    const isValid = await trigger(fieldsToValidate);

    if (!isValid) return;

    if (page < 4) {
      setPage((prev) => prev + 1);
    } else {
      router.push("/status");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {page !== 1 && <BackSvg color="#2B388F" action={() => setPage(page - 1)} />}
          <LogoSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
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
              <div>
                <div>
                  <Select
                    label="Title"
                    placeholder="Choose Title"
                    data={[
                      { title: "Mr", value: "Mr" },
                      { title: "Mrs", value: "Mrs" },
                      { title: "Miss", value: "Miss" },
                    ]}
                    name="title"
                    register={register}
                    rules={{ required: "Title is required" }}
                  />
                </div>
                {errors.title && <span className="error">{errors?.title?.message}</span>}
              </div>
              <div>
                <Input label="First Name" placeholder="Enter First Name" name="fname" register={register} type="text" rules={{ required: "First Name is required" }} />
                {errors.fname && <span className="error">{errors?.fname?.message}</span>}
              </div>
              <div>
                <Input label="Middle Name" placeholder="Enter Middle Name" name="mname" register={register} type="text" rules={{ required: "Middle is required" }} />
                {errors.mname && <span className="error">{errors?.mname?.message}</span>}
              </div>
              <div>
                <Input label="Last Name" placeholder="Enter Last Name" name="lname" register={register} type="text" rules={{ required: "Last Name is required" }} />
                {errors.lname && <span className="error">{errors?.lname?.message}</span>}
              </div>
              <div>
                <Select
                  label="Gender"
                  placeholder="Choose Gender"
                  data={[
                    { title: "Male", value: "Male" },
                    { title: "Female", value: "Female" },
                  ]}
                  name="gender"
                  register={register}
                  rules={{ required: "Gender is required" }}
                />
                {errors.gender && <span className="error">{errors?.gender?.message}</span>}
              </div>
              <div>
                <Select
                  label="Citizenship"
                  placeholder="Choose Citizenship"
                  data={[
                    { title: "Barbados", value: "Barbados" },
                    //   { title: "Tourist", value: "Tourist" },
                  ]}
                  name="citizenship"
                  register={register}
                  rules={{ required: "Citizenship is required" }}
                />
                {errors.citizenship && <span className="error">{errors?.citizenship?.message}</span>}
              </div>
              <div>
                <Select
                  label="Nationality"
                  placeholder="Choose Nationality"
                  data={[
                    { title: "Barbados", value: "Barbados" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="nationality"
                  register={register}
                  rules={{ required: "Nationality is required" }}
                />
                {errors.nationality && <span className="error">{errors?.nationality?.message}</span>}
              </div>
              <div>
                <Input label="Date of Birth" placeholder="DD/MM/YYYY" name="dob" register={register} type="date" rules={{ required: "Date of Birth is required" }} />
                {errors.dob && <span className="error">{errors?.dob?.message}</span>}
              </div>
              <div>
                <Input
                  label="Place of Birth"
                  placeholder="Enter Place of Birth"
                  name="placeOfBirth"
                  register={register}
                  type="text"
                  rules={{ required: "Place of Birth is required" }}
                />
                {errors.placeOfBirth && <span className="error">{errors?.placeOfBirth?.message}</span>}
              </div>
            </div>
          </div>
        ) : page === 2 ? (
          <div className={styles.second}>
            <h2>
              Please enter <span>your address</span>
            </h2>
            <div className={styles.form}>
              <div>
                <Input
                  label="Address Line 1"
                  placeholder="Enter Address Line 1"
                  name="address1"
                  register={register}
                  type="text"
                  rules={{ required: "Address Line 1 is required" }}
                />
                {errors.address1 && <span className="error">{errors?.address1?.message}</span>}
              </div>
              <div>
                <Input label="Address Line 2 (Optional)" placeholder="Enter Address Line 2" name="address2" register={register} type="text" />
                {errors.address2 && <span className="error">{errors?.address2?.message}</span>}
              </div>
              <div>
                <Select
                  label="City"
                  placeholder="Choose City"
                  data={[
                    { title: "St. James", value: "St. James" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="city"
                  register={register}
                  rules={{ required: "City is required" }}
                />
                {errors.city && <span className="error">{errors?.city?.message}</span>}
              </div>
              <div>
                <Select
                  label="State/Province/Region/Parish"
                  placeholder="Choose State"
                  data={[
                    { title: "St. John", value: "St. John" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="state"
                  register={register}
                  rules={{ required: "State is required" }}
                />
                {errors.state && <span className="error">{errors?.state?.message}</span>}
              </div>
              <div>
                <Select
                  label="Country"
                  placeholder="Choose Country"
                  data={[
                    { title: "Barbados", value: "Barbados" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="country"
                  register={register}
                  rules={{ required: "Country is required" }}
                />
                {errors.country && <span className="error">{errors?.country?.message}</span>}
              </div>
              <div>
                <Input label="ZIP/Postal Code" placeholder="Enter ZIP/Postal Code" name="zipCode" register={register} type="text" rules={{ required: "Zip/Postal is required" }} />
                {errors.zipCode && <span className="error">{errors?.zipCode?.message}</span>}
              </div>
            </div>
          </div>
        ) : page === 3 ? (
          <div className={styles.second}>
            <h2>
              Check your <span>document data</span>
            </h2>
            <div className={styles.form}>
              <div>
                <Input
                  label="Document ID Number"
                  placeholder="Enter Document ID Number"
                  name="documentNumber"
                  register={register}
                  type="text"
                  rules={{ required: "Document ID Number is required" }}
                />
                {errors.documentNumber && <span className="error">{errors?.documentNumber?.message}</span>}
              </div>
              <div>
                <Input
                  label="National ID Number"
                  placeholder="Enter National ID Number"
                  name="nationalNumber"
                  register={register}
                  type="text"
                  rules={{ required: "National ID Number is required" }}
                />
                {errors.nationalNumber && <span className="error">{errors?.nationalNumber?.message}</span>}
              </div>
              <div>
                <Select
                  label="Type"
                  placeholder="Choose Type"
                  data={[
                    { title: "Driver's License", value: "Driver's License" },
                    { title: "National ID", value: "National ID" },
                  ]}
                  name="type"
                  register={register}
                  rules={{ required: "Type is required" }}
                />
                {errors.type && <span className="error">{errors?.type?.message}</span>}
              </div>
              <div>
                <Select
                  label="Issuing Country"
                  placeholder="Choose Issuing Country"
                  data={[
                    { title: "Barbados", value: "Barbados" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="issuingCountry"
                  register={register}
                  rules={{ required: "Issuing Country is required" }}
                />
                {errors.issuingCountry && <span className="error">{errors?.issuingCountry?.message}</span>}
              </div>
              <div>
                <Input label="Issue Date" placeholder="Enter DD/MM/YYYY" name="issueDate" register={register} type="date" rules={{ required: "Issue Date is required" }} />
                {errors.issueDate && <span className="error">{errors?.issueDate?.message}</span>}
              </div>
              <div>
                <Input label="Expiry Date" placeholder="Enter DD/MM/YYYY" name="expiryDate" register={register} type="date" rules={{ required: "Expiry is required" }} />
                {errors.expiryDate && <span className="error">{errors?.expiryDate?.message}</span>}
              </div>
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
              <div>
                <Select
                  label="Source of Funds"
                  placeholder="Choose Source"
                  data={[{ title: "Income", value: "Income" }]}
                  name="source"
                  register={register}
                  rules={{ required: "Source of Funds is required" }}
                />
                {errors.source && <span className="error">{errors?.source?.message}</span>}
              </div>
              <div>
                <Input label="Source of Other Funds" placeholder="Enter Source of Other Funds" name="other" register={register} type="text" />
                {errors.other && <span className="error">{errors?.other?.message}</span>}
              </div>
              <div>
                <Select
                  label="Purpose of Account"
                  placeholder="Choose Purpose of Account"
                  data={[
                    { title: "Savings", value: "Savings" },
                    //   { title: "Female", value: "Female" },
                  ]}
                  name="purpose"
                  register={register}
                  rules={{ required: "Purpose of Account is required" }}
                />
                {errors.purpose && <span className="error">{errors?.purpose?.message}</span>}
              </div>
            </div>
          </div>
        )}
      </div>
      <Button buttonText="Next" loading={false} active onClick={handleNext} />
    </div>
  );
};
