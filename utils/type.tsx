import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, ReactNode } from "react";
import { Control, DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export type SelectProps = {
  title: string;
  value: string;
};

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  type?: string;
  placeholder: string;
  control?: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  errors?: Partial<DeepMap<T, FieldError>>;
  disabled?: boolean;
  icon?: ReactNode;
  onInput?: FormEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  data?: SelectProps[];
  maxLength?: number;
  ariaLabel?: string;
}
