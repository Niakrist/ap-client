import { UserRole } from "@/app/types/types";
import { EnumTokens } from "@/services/auth/auth.helpers";
import authService from "@/services/auth/auth.service";
import { ITokenInside } from "@/services/auth/auth.type";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const refreshToken = request.cookies.get(
    EnumTokens.REFRESH_TOKEN,
  )?.value;

  let accessToken = request.cookies.get(
    EnumTokens.ACCESS_TOKEN,
  )?.value;

  const isAdminPage = request.url.includes("/");

  if (!refreshToken) {
    request.cookies.delete(EnumTokens.ACCESS_TOKEN);
    return redirectToLogin(isAdminPage, request);
  }

  if (!accessToken) {
    try {
      const data = await authService.getNewTokenByRefresh(
        refreshToken,
      );
      accessToken = data.accessToken;
    } catch (error) {
      request.cookies.delete(EnumTokens.ACCESS_TOKEN);
      return redirectToLogin(isAdminPage, request);
    }
  }

  try {
    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );

    if (payload?.role === UserRole.Admin) {
      return NextResponse.next();
    }
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("exp claim timestamp check failed")
    ) {
      console.log("Токен истек");
      return redirectToLogin(isAdminPage, request);
    }
    console.log("Ошибка при верификации токена", error);
    return redirectToLogin(isAdminPage, request);
  }
};

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};

const redirectToLogin = (
  isAdminPage: boolean,
  request: NextRequest,
) => {
  return NextResponse.redirect(
    new URL(isAdminPage ? "/404" : "/login", request.url),
  );
};
