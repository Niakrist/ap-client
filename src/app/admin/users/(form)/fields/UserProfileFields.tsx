import React from "react";
import {
  Control,
  Controller,
  UseFormRegister,
} from "react-hook-form";
import { IUserFormState } from "../user-form.types";
import styles from "./UserProfileFields.module.scss";
import { Field } from "@/components/ui/Field/Field";
import { UploadField } from "@/components/ui/UploadField/UploadField";

export const UserProfileFields = ({
  control,
  register,
}: {
  control: Control<IUserFormState, any>;
  register: UseFormRegister<IUserFormState>;
}) => {
  return (
    <div className={styles.userProfile}>
      <div>
        <Field {...register("country")} placeholder="Country" />
      </div>
      <div>
        <Controller
          control={control}
          name="avatarUrl"
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => {
            return (
              <UploadField
                onChange={onChange}
                value={value}
                error={error}
                folder="users"
                placeholder="Avatar"
              />
            );
          }}
        />
      </div>
    </div>
  );
};
