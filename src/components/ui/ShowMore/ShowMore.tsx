import React from "react";
import styles from "./ShowMore.module.scss";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

interface IShowMoreProps {
  onLoader: () => void;
  isLoading: boolean;
}

export const ShowMore = ({ onLoader, isLoading }: IShowMoreProps) => {
  return (
    <div className={styles.showMore}>
      <Button variant="secondary" onClick={onLoader} disabled={isLoading}>
        {isLoading ? <Loader /> : "Show more"}
      </Button>
    </div>
  );
};
