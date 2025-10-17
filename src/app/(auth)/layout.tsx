import { getServerAuth } from "@/utils/get-server-auth";
import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: PropsWithChildren<unknown>) {
  const user = await getServerAuth();

  if (user?.isLoggedIn) {
    return redirect(user.isAdmin ? "/" : "/");
  }

  return children;
}
