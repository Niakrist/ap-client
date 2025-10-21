import React from "react";
import { TypeUserForm } from "./user-form.types";

export const UserFromHeading = ({
  type,
  email,
}: {
  type: TypeUserForm;
  email: string;
}) => {
  switch (type) {
    case "create":
      return "Создание пользователя";
    case "edit":
      return `Редактирование "${email}"`;
    default:
      return "Редактирование профиля";
  }
};
