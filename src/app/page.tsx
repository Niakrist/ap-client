"use client";
import { Heading } from "@/components/ui/Heading/Heading";
import styles from "./page.module.css";
import { useProfile } from "@/hooks/useProfile";
import { Profileinfo } from "./admin/users/Profileinfo/Profileinfo";

export default function Home() {
  const { user, isLoading } = useProfile();
  return isLoading ? (
    <div className={styles.isLoading}></div>
  ) : (
    <main className={styles.main}>
      <Profileinfo />
      {!user.isAdmin ? "You are not an admin" : <></>}
    </main>
  );
}
