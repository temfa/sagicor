/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../button";
import { LogoSvg } from "@/svgs/logo";
import { Select } from "../select";
import { useForm } from "react-hook-form";
import Input from "../input";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { getData, saveData } from "@/services/session";
import Loading from "@/app/loading";

type FormData = Record<string, any>;

type DataField = {
  descr: string;
  subDescr: string;
  data: any;
  id: number;
};

export const MultiForm = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [data1, setData1] = useState<DataField>({
    descr: "",
    subDescr: "",
    data: [],
    id: 0,
  });

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  const details = useAppSelector((store) => store.details);
  const sessionId = useAppSelector((store) => store.sessionId);

  const parsedDetails = useMemo(() => {
    if (!details) return null;

    try {
      return details;
    } catch {
      return null;
    }
  }, [details]);

  useEffect(() => {
    const fetchData = async () => {
      if (!parsedDetails) return;

      try {
        const data = await getData(sessionId, parsedDetails?.metaData?.device_id, parsedDetails?.metaData?.device_mac, parsedDetails?.email);

        if (!data) {
          setPageLoading(false);
          return;
        }

        setData1(data);

        // ✅ SAFE PREFILL
        const defaultValues: Record<string, any> = {};

        if (Array.isArray(data?.data)) {
          data.data.forEach((item: any) => {
            if (!item || !Array.isArray(item.fields)) return;

            item.fields.forEach((field: any) => {
              if (!field || typeof field.id === "undefined") return;

              const fieldKey = `step_1_${field.id}`;

              // handle all possible value states
              if (field.value !== undefined && field.value !== null) {
                defaultValues[fieldKey] = field.value;
              } else {
                defaultValues[fieldKey] = "";
              }
            });
          });
        }

        // ✅ ensure reset happens after render cycle
        setTimeout(() => {
          reset(defaultValues);
        }, 0);
      } catch (err) {
        console.log("getData error:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, [sessionId, parsedDetails, reset]);

  // ================= FIELD MAP =================
  const { fieldByDescr } = useMemo(() => {
    const fieldByDescr: Record<string, any[]> = {};

    data1?.data?.forEach((item: any) => {
      item.fields.forEach((field: any) => {
        if (!fieldByDescr[field.descr]) {
          fieldByDescr[field.descr] = [];
        }
        fieldByDescr[field.descr].push(field);
      });
    });

    return { fieldByDescr };
  }, [data1?.data]);

  // ================= VALIDATION =================
  const stepFields = useMemo(() => {
    if (!data1?.data) return [];

    return data1.data
      .flatMap((item: any) =>
        item.fields.map((field: any) => ({
          name: `step_${page}_${field.id}`,
          hidden: field.hidden,
          optional: field.descr?.toLowerCase().includes("optional"),
        })),
      )
      .filter((f: any) => !f.hidden && !f.optional)
      .map((f: any) => f.name);
  }, [data1, page]);

  // ================= HANDLE NEXT =================
  const handleNext = async () => {
    setLoading(true);

    const isValid = await trigger(stepFields);

    if (!isValid) {
      setLoading(false);
      return;
    }

    const values = getValues();

    const result = data1?.data
      ?.flatMap((item: any) => item.fields)
      .map((field: any) => {
        const fieldKey = `step_${page}_${field.id}`;

        if (!field.hidden) {
          const value = values[fieldKey] ?? "";

          return {
            id: field.id,
            value,
          };
        }

        const match = (fieldByDescr[field.descr] || []).find((f: any) => !f.hidden);

        if (match) {
          const matchKey = `step_${page}_${match.id}`;
          const value = values[matchKey] ?? "";

          return {
            id: field.id,
            value,
          };
        }

        return {
          id: field.id,
          value: "",
        };
      });

    try {
      const dataGotten = await saveData(String(parsedDetails?.metaData?.device_id), String(parsedDetails?.metaData?.device_mac), result, data1.id);

      if (dataGotten?.isCompleted) {
        router.push(`/status?state=${dataGotten?.error}`);
        return;
      }

      if (dataGotten?.success) {
        const nextPage = page + 1;

        setData1(dataGotten);

        const nextStepFields = dataGotten?.data?.flatMap((item: any) => item.fields.map((field: any) => `step_${nextPage}_${field.id}`));

        const emptyValues = nextStepFields.reduce((acc: any, id: string) => {
          acc[id] = "";
          return acc;
        }, {});

        reset(emptyValues);

        setPage(nextPage);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(data1);

  const link = parsedDetails?.failureDeepLinkUrl ?? "";

  if (pageLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <LogoSvg />
          <h2 onClick={() => (window.location.href = link)}>Exit</h2>
        </div>

        <div className={styles.first} key={page}>
          <div>
            <h2>{data1.descr}</h2>
            <p>{data1.subDescr}</p>
          </div>

          <div className={styles.form}>
            {data1?.data?.map((item: any, index: number) =>
              item?.fields?.map((field: any, fieldIndex: number) => {
                if (field.hidden) return null;

                const fieldName = `step_${page}_${field.id}`;
                const isOptional = field.descr?.toLowerCase().includes("optional");

                const rules = isOptional ? {} : { required: `${field.descr} is required` };

                return (
                  <div key={`${index}-${fieldIndex}`}>
                    {field?.picklist ? (
                      <>
                        <Select
                          label={field.descr}
                          placeholder={`Choose ${field.descr}`}
                          data={field.picklist.slice(1).map((option: any) => ({
                            title: option.value,
                            value: option.key,
                          }))}
                          name={fieldName}
                          register={register}
                          rules={rules}
                        />
                        {errors?.[fieldName] && <span className="error">{errors[fieldName]?.message as string}</span>}
                      </>
                    ) : (
                      <>
                        <Input
                          label={field.descr}
                          placeholder={`Enter ${field.descr}`}
                          name={fieldName}
                          register={register}
                          type={field.type === 6 ? "date" : "text"}
                          rules={rules}
                        />
                        {errors?.[fieldName] && <span className="error">{errors[fieldName]?.message as string}</span>}
                      </>
                    )}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>

      <Button buttonText="Next" loading={loading} active onClick={handleNext} />
    </div>
  );
};
