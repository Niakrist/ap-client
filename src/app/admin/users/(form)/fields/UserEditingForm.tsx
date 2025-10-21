"use client";
import React, { useEffect } from "react";
import { IUserForm, IUserFormState } from "../user-form.types";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Loader } from "@/components/ui/Loader/Loader";
import { UserFromHeading } from "../UserFromHeading";
import UserMainFields from "./UserMainFields";
import { UserProfileFields } from "./UserProfileFields";
import { Button } from "@/components/ui/Button/Button";
import styles from "./UserEditingForm.module.scss";

const UserEditingForm = ({
  type,
  queriesResult: {
    onSubmit,
    data,
    initialUserLoading,
    isLoading,
    isNeedResetForm,
  },
}: IUserForm) => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<IUserFormState>({ mode: "onChange" });

  useEffect(() => {
    if (!data) return;
    reset({
      avatarUrl: data.avatarUrl,
      country: data.country,
      email: data.email,
      role: data.role,
    });
  }, [data]);

  useEffect(() => {
    if (isNeedResetForm) reset();
  }, [isNeedResetForm, reset]);

  if (initialUserLoading) return <Skeleton />;

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.userEdition}>
      <h1>
        <UserFromHeading type={type} email={data?.email} />
      </h1>
      <form
        className={styles.sizeForm}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <UserMainFields errors={errors} register={register} />
        <UserProfileFields register={register} control={control} />
        <Button variant="primary" className={styles.sizeForm}>
          {type === "create" ? "Create" : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default UserEditingForm;
