"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  transformUserToSstate,
  TUserDataState,
} from "./transform-user-to-state";
import { EnumTokens } from "@/services/auth/auth.helpers";
import authService from "@/services/auth/auth.service";
import { ITokenInside } from "@/services/auth/auth.type";

export const getServerAuth =
  async (): Promise<TUserDataState | null> => {
    const JWT_SECRET = process.env.JWT_SECREET;

    let accessToken = (await cookies()).get(
      EnumTokens.ACCESS_TOKEN,
    )?.value;

    const refreshToken = (await cookies()).get(
      EnumTokens.REFRESH_TOKEN,
    )?.value;

    if (!refreshToken) return null;

    if (!accessToken) {
      try {
        const data = await authService.getNewTokenByRefresh(
          refreshToken,
        );
        accessToken = data.accessToken;
      } catch (error) {
        return null;
      }
    }

    try {
      const { payload }: { payload: ITokenInside } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(JWT_SECRET),
      );

      if (!payload) {
        return null;
      }
      return transformUserToSstate(payload);
    } catch (error) {
      return null;
    }
  };
