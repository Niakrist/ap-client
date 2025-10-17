import React from "react";
import cn from "clsx";
import styles from "./Button.module.scss";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "disabled";
  isCircle?: boolean;
}

export const Button = ({ variant, isCircle, className, children, ...props }: IButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        {
          [styles.circle]: isCircle,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
