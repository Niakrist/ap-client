import { useProfile } from "@/hooks/useProfile";
import authService from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { LogOut } from "lucide-react";
import styles from "./Profileinfo.module.css";

export const Profileinfo = () => {
  const { push } = useRouter();
  const { user } = useProfile();

  const { mutate: mutateLogout, isPending: isLogoutPending } =
    useMutation({
      mutationKey: ["logout"],
      mutationFn: () => authService.logout(),
      onSuccess() {
        push("/login");
      },
    });

  return (
    user && (
      <div className={styles.profileinfo}>
        {user.avatarUrl && (
          <Image
            src={user.avatarUrl}
            alt="Avatar"
            width={100}
            height={100}
          />
        )}
        <div>
          <h2 className={styles.title}>Добрый день</h2>
          <p className={styles.text}>Ваш email: {user.email}</p>
          <p>Роль: {user.role}</p>
          {user && (
            <button
              className={styles.logOut}
              onClick={() => mutateLogout()}
              disabled={isLogoutPending}
            >
              <LogOut />
            </button>
          )}
        </div>
      </div>
    )
  );
};
