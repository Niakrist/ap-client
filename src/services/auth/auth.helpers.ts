import Cookies from "js-cookie";

export enum EnumTokens {
  ACCESS_TOKEN = "accesToken",
  REFRESH_TOKEN = "refreshToken",
}

export const getAccesToken = () => {
  const accesToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accesToken || null;
};

export const saveTokenStorage = (accesToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accesToken, {
    domain: "localhost",
    sameSite: "strict",
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
