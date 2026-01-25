import React from "react";
import styles from "./styles.module.css";

type Props = {
  buttonText: string;
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
  loading: boolean;
};

export const Button = ({ buttonText, active, onClick, disabled, loading = false }: Props) => {
  return (
    <button className={active ? (disabled ? styles.disabled : styles.active) : styles.inactive} onClick={onClick}>
      {loading ? "Loading..." : buttonText}
    </button>
  );
};
