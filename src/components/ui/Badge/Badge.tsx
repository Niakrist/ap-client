import React from "react";
import cn from "clsx";
import styles from "./Badge.module.scss";

interface IBadgeProps {
  value: number;
  maxValue: number;
  color: "blue" | "red";
}

export const Badge = ({ maxValue, value, color }: IBadgeProps) => {
  return (
    <div
      className={cn(styles.badge, {
        [styles.blue]: color === "red",
        [styles.red]: color === "blue",
      })}
    >
      {value}/{maxValue}
    </div>
  );
};
