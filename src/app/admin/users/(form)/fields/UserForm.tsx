"use client";
import React from "react";
import { IUserForm } from "../user-form.types";
import { useUserQueries } from "../useUserQueries";
import UserEditingForm from "./UserEditingForm";

const UserForm = ({ type, id }: Pick<IUserForm, "id" | "type">) => {
  const result = useUserQueries(id, type === "create");

  return (
    <UserEditingForm queriesResult={result} type={type} id={id} />
  );
};

export default UserForm;
