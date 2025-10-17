import { Metadata } from "next";
import { AuthForm } from "../AuthForm";
import styles from "./LoginPage.module.scss";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <h2 className={styles.title}>Войти</h2>
        <AuthForm isLogin={true} />
      </div>
    </div>
  );
}
