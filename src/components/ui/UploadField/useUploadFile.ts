import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { FileService } from "@/services/file.service";
import toast from "react-hot-toast";

type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string,
) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isLoading: boolean;
};

export const useUploadFile: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationKey: ["upload file"],
    mutationFn: (data: FormData) => FileService.upload(data, folder),

    onSuccess({ data }) {
      onChange(data[0].url);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);

      try {
        const files = e.target.files;

        if (!files?.length) return;
        const formData = new FormData();
        formData.append("media", files[0]);

        await mutateAsync(formData);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [mutateAsync],
  );

  return useMemo(
    () => ({ uploadFile, isLoading }),
    [uploadFile, isLoading],
  );
};
