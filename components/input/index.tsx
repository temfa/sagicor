"use client";
import React from "react";
import styles from "./styles.module.css";
import { FieldValues } from "react-hook-form";
import { InputProps } from "@/utils/type";

const Input = <T extends FieldValues>({ name, label, type, placeholder, register, rules, disabled, icon, onInput, onKeyDown, maxLength, ariaLabel }: InputProps<T>) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      {icon ? (
        <div>
          {icon}
          <input
            type={type}
            placeholder={placeholder}
            {...(register && register(name, rules))}
            disabled={disabled}
            onInput={onInput}
            maxLength={maxLength}
            style={{ color: disabled ? "#FFFFFF99" : "#FFFFFFFA" }}
            aria-label={ariaLabel}
          />
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...(register && register(name, rules))}
          disabled={disabled}
          onInput={onInput}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          style={{ color: disabled ? "#FFFFFF99" : "#FFFFFFFA" }}
          aria-label={ariaLabel}
        />
      )}
    </div>
  );
};

export default Input;
