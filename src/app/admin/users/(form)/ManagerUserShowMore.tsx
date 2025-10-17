import { ShowMore } from "@/components/ui/ShowMore/ShowMore";
import React, { Dispatch, SetStateAction } from "react";

interface IManagerUserShowMoreProps {
  loading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

export const ManagerUserShowMore = ({
  setPage,
  loading,
}: IManagerUserShowMoreProps) => {
  return (
    <ShowMore
      isLoading={loading}
      onLoader={() => setPage((prev) => prev + 1)}
    />
  );
};
