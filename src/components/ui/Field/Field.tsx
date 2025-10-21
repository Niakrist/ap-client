import React, { forwardRef } from "react";
import styles from "./Field.module.scss";
import { FieldError } from "react-hook-form";
import { IUserFormState } from "@/app/admin/users/(form)/user-form.types";
interface IFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export const Field = forwardRef<HTMLInputElement, IFieldProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className={styles.label}>
          {label}
          <input ref={ref} className={styles.inputField} {...props} />
        </label>
      </div>
    );
  },
);
