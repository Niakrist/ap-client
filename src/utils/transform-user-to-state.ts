import { UserRole } from "@/app/types/types";
import { TProtectUserData } from "@/services/auth/auth.type";

export type TUserDataState = {
  id: number;
  role: UserRole;
  isAdmin: boolean;
  isLoggedIn: boolean;
};

export const transformUserToSstate = (
  user: TProtectUserData,
): TUserDataState | null => {
  return {
    ...user,
    isAdmin: user.role === UserRole.Admin,
    isLoggedIn: true,
  };
};
