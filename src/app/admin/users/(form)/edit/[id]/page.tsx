import { Metadata } from "next";
import UserForm from "../../fields/UserForm";

interface IParamsPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Редактирование пользователя",
};

export default async function EditUserPage({
  params,
}: IParamsPageProps) {
  if (!params) return <div>Loading</div>;
  const { id } = await params;

  return <UserForm type="edit" id={id} />;
}
