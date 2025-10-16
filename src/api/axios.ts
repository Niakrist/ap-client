import { API_URL } from "@/constants/main.constants";
import type { CreateAxiosDefaults } from "axios";
import { errorCatch, getContentType } from "./api.helper";
import axios from "axios";
import { getAccesToken, removeFromStorage } from "@/services/auth/auth.helpers";
import authService from "@/services/auth/auth.service";

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
};

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
  const accessToken = getAccesToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 ||
      errorCatch(error) === "jwt expired" ||
      (errorCatch(error) === "jwt must be provided" && error.config && !error.config._isRetry)
    ) {
      originalRequest._isRetry === true;

      try {
        await authService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (
          errorCatch(error) === "jwt expired" ||
          errorCatch(error) === "Refresh token not passed"
        ) {
          removeFromStorage();
        }
      }
      throw error;
    }
  },
);
