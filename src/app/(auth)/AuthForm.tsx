"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFormData } from "../types/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth/auth.service";
import toast from "react-hot-toast";
import styles from "./AuthForm.module.scss";
import { Field } from "@/components/ui/Field/Field";
import { Button } from "@/components/ui/Button/Button";
import { Loader } from "@/components/ui/Loader/Loader";

interface IAuthFormForm {
  isLogin: boolean;
}

export const AuthForm = ({ isLogin }: IAuthFormForm) => {
  const { register, handleSubmit, reset } = useForm<IAuthFormData>();

  const router = useRouter();

  const { mutate: mutateLogin, isPending: isLoginPending } =
    useMutation({
      mutationKey: ["login"],
      mutationFn: (data: IAuthFormData) =>
        authService.main("login", data),
      onSuccess() {
        reset();
        router.push("/");
        toast.success("Login successful");
      },
    });

  const {
    mutate: mutateRegister,
    isPending: isLoginRegister,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthFormData) =>
      authService.main("register", data),
    onSuccess() {
      reset();
      router.push("/");
      toast.success("Register successful");
    },
  });

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
    isLogin ? mutateLogin(data) : mutateRegister(data);
  };

  const isPending = isLoginPending || isLoginRegister;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Field
        className={styles.extra}
        label="Email"
        type="email"
        placeholder="Enter email "
        {...register("email", { required: true })}
      />
      {error && <p className={styles.error}>{error.message}</p>}

      <Field
        className={styles.extra}
        label="Password"
        type="password"
        placeholder="Enter password "
        {...register("password", { required: true })}
      />

      <div className={styles.extra}>
        <Button
          type="submit"
          variant={isLogin ? "primary" : "secondary"}
          disabled={isPending}
        >
          {isPending ? (
            <Loader />
          ) : isLogin ? (
            "Войти"
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </div>
    </form>
  );
};
