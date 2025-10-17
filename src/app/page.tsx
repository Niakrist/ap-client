"use client";
import styles from "./page.module.css";
import { useProfile } from "@/hooks/useProfile";
import { Profileinfo } from "./admin/users/Profileinfo/Profileinfo";
import { MainChart } from "./admin/charts/MainChart/MainChart";
import { RadarChart } from "./admin/charts/RadarChart/RadarChart";
import { NumbersChart } from "./admin/charts/NumbersChart/NumbersChart";
import { RecentVideo } from "./admin/RecentVideo/RecentVideo";

export default function Home() {
  const { user, isLoading } = useProfile();
  return isLoading ? (
    <div className={styles.isLoading}></div>
  ) : (
    <main className={styles.main}>
      <Profileinfo />
      {!user.isAdmin ? "You are not an admin" : <></>}
      <MainChart />
      <NumbersChart />
      <div>
        <RadarChart />
        <RecentVideo />
      </div>
    </main>
  );
}
