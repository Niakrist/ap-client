import { useDebounce } from "@/hooks/useDebounse";
import userServices from "@/services/user.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useManagerUsersQuery = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { debounceValue } = useDebounce(searchTerm, 1000);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["users", debounceValue],
    queryFn: () => {
      return userServices.getUsers({
        searchTerm: debounceValue,
        skip: 0,
        take: page * 10,
      });
    },
  });

  useEffect(() => {
    if (page === 1) return;

    refetch();
  }, [page]);

  const { mutate: deleteUser } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: number) => userServices.deleteUser(id),
    onSuccess() {
      refetch();
    },
  });

  const users = data?.data.items?.length ? data.data.items : null;

  return {
    users,
    isPending,
    deleteUser,
    searchTerm,
    setSearchTerm,
    isHasMore: data?.data.isHasMore,
    setPage,
  };
};
