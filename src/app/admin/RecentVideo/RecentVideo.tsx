import { IYoutubeResponse } from "@/services/youtube.service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import styles from "./RecentVideo.module.css";
export const RecentVideo = () => {
  const { data } = useQuery({
    queryKey: ["recent video"],
    queryFn: () => axios.get<IYoutubeResponse>("/api/youtube"),
    select: ({ data }) => data,
  });
  return data ? (
    <div>
      <h3 className={styles.title}>Recent Video</h3>
      <a
        href={`https://youtu.be/${data.videoId}`}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <img src={data.thumbnail} alt={data.title} width={70} />
        <span>{data.title}</span>
      </a>
    </div>
  ) : null;
};
