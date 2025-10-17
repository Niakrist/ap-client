"use client";
import { saveTokenStorage } from "@/services/auth/auth.helpers";
import authService from "@/services/auth/auth.service";
import { transformUserToSstate } from "@/utils/transform-user-to-state";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.profile(),
    refetchInterval: 180000000, // 30 minutes in milliseconds
  });

  const { isSuccess, data: dataTokens } = useQuery({
    queryKey: ["new tokens"],
    queryFn: () => authService.getNewTokens(),
    enabled: !data?.data,
  });

  useEffect(() => {
    if (isSuccess) return;
    if (dataTokens?.data.accessToken) {
      saveTokenStorage(dataTokens.data.accessToken);
    }
  }, [isSuccess]);

  const profile = data?.data;
  const userState = profile ? transformUserToSstate(profile) : null;

  return {
    isLoading,
    user: {
      ...profile,
      ...userState,
    },
  };
};
