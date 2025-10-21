import { Metadata } from "next";
import UserForm from "../fields/UserForm";

export const metadata: Metadata = {
  title: "Создание пользователя",
};

export default function CreateUserPage() {
  return <UserForm type="create" />;
}
