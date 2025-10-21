import { useMutation, useQuery } from "@tanstack/react-query";
import { IQueriesResult, IUserFormState } from "./user-form.types";
import userServices from "@/services/user.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";

export const useUserQueries = (
  id = "",
  isCreatedForm: boolean,
): IQueriesResult => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userServices.getUserById(id),
  });

  const { push } = useRouter();
  const [isNeedResetForm, setIsNeedResetForm] = useState(false);

  const { mutate: createUser } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (data: IUserFormState) =>
      userServices.createUser(data),
    onSuccess() {
      toast.success("Пользователь успешно создан");
      refetch();
      setIsNeedResetForm(true);
      push("/");
    },
  });

  const { mutate: updateUser, isPending: isLoadingUpdate } =
    useMutation({
      mutationKey: ["updateUser"],
      mutationFn: (data: IUserFormState) =>
        userServices.updateUser(id, data),
      onSuccess() {
        toast.success("Пользователь успешно обновлен");
        refetch();
      },
    });

  const onSubmit: SubmitHandler<IUserFormState> = async (data) => {
    if (isCreatedForm) {
      createUser(data);
    } else if (id) {
      updateUser(data);
    }
  };

  return {
    data: data?.data,
    isLoading: isLoading || isLoadingUpdate,
    onSubmit,
    isNeedResetForm,
  };
};
