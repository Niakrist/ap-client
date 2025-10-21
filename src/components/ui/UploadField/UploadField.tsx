import React, { CSSProperties } from "react";
import styles from "./UploadField.module.scss";
import { FieldError } from "react-hook-form";
import { useUploadFile } from "./useUploadFile";
import { div } from "framer-motion/client";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

interface IUploadFieldProps {
  folder?: string;
  value?: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
  error?: FieldError;
  style?: CSSProperties;
  isNoImage?: boolean;
}

export const UploadField = ({
  folder,
  value,
  onChange,
  placeholder,
  error,
  style,
  isNoImage = false,
}: IUploadFieldProps) => {
  const { isLoading, uploadFile } = useUploadFile(onChange, folder);

  return (
    <div style={style}>
      <div>
        <label>
          <div className={styles.mb2}>{placeholder}</div>
          <input type="file" onChange={uploadFile} />
          {error && (
            <div className={styles.error}>{error.message}</div>
          )}
        </label>

        {!isNoImage && (
          <div>
            {isLoading ? (
              <Skeleton count={1} className={styles.isLoading} />
            ) : (
              value && (
                <Image
                  alt=""
                  className={styles.images}
                  src={value}
                  width={100}
                  height={100}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
