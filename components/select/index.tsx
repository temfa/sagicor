import React from "react";
import styles from "./styles.module.css";
import { FieldValues } from "react-hook-form";
import { InputProps } from "@/utils/type";

export const Select = <T extends FieldValues>({ name, label, placeholder, register, rules, data, onChange }: InputProps<T>) => {
  return (
    <div className={styles.select}>
      <label htmlFor="">{label}</label>
      <select {...(register && register(name, rules))} onChange={onChange}>
        <option value="">{placeholder}</option>
        {data?.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
