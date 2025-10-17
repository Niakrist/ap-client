import React from "react";
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import statisticsService from "@/services/statistics.service";
import { Loader } from "@/components/ui/Loader/Loader";
import styles from "./MainChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options: ChartOptions<"line"> = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const MainChart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["main-chart"],
    queryFn: () => statisticsService.getRegistrationsByMonth(),
    select({ data }): ChartData<"line", number[], string> {
      return {
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Number of registrations",
            data: data.map((item) => item.count),
            borderColor: "#e6a34d",
            tension: 0.1,
          },
        ],
      };
    },
  });
  return isPending ? (
    <Loader />
  ) : data ? (
    <Line data={data} options={options} className={styles.line} />
  ) : null;
};
