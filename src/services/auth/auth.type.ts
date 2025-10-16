import { UserRole } from "@/app/types/types";

export interface ITokenInside {
  id: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export type TProtectUserData = Omit<ITokenInside, "iat" | "exp">;
