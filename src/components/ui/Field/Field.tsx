import React, { forwardRef } from "react";
import styles from "./Field.module.scss";
interface IFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  extra?: string;
}

export const Field = forwardRef<HTMLInputElement, IFieldProps>(
  ({ label, extra, ...props }, ref) => {
    return (
      <div className={`${extra}`}>
        <label className={styles.label}>
          {label}
          <input ref={ref} className={styles.inputField} {...props} />
        </label>
      </div>
    );
  },
);
