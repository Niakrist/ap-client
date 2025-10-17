import { Metadata } from "next";
import styles from "./RegisterPage.module.scss";
import { AuthForm } from "../AuthForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <h2 className={styles.title}>Регистрация</h2>
        <AuthForm isLogin={false} />;
      </div>
    </div>
  );
}
