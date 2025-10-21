import React from "react";
import styles from "./UserMainFields.module.scss";

import type {
  FieldErrors,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { IUserFormState } from "../user-form.types";
import { Field } from "@/components/ui/Field/Field";

const validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const UserMainFields = ({
  errors,
  register,
}: {
  errors: FieldErrors<IUserFormState>;
  register: UseFormRegister<IUserFormState>;
}) => {
  return (
    <div className={styles.userMainFields}>
      <Field
        {...register("email", {
          required: "Email is required field",
          pattern: {
            value: validEmail,
            message: "Пожалуйста введите вылидный Email",
          },
        })}
        placeholder="Email"
        autoComplete="none"
      />
      <Field
        {...register("password")}
        placeholder="Password"
        type="password"
      />
    </div>
  );
};

export default UserMainFields;
