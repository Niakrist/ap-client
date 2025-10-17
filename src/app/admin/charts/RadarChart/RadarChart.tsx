import React from "react";

import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

import { Radar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import statisticsService from "@/services/statistics.service";
import { Loader } from "@/components/ui/Loader/Loader";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const options: ChartOptions<"radar"> = {
  scales: {
    r: {
      ticks: {
        stepSize: 10, // Шаг между значениями
        display: false,
      },
      pointLabels: {
        font: {
          size: 14, // Увеличить значение для большего размера текста
        },
      },
    },
  },
  elements: {
    line: { borderWidth: 3 },
  },
};

export const RadarChart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["radar-chart"],
    queryFn: () => statisticsService.getCountByCountry(),
    select({ data }): ChartData<"radar", number[], string> {
      return {
        labels: data.map((item) => item.country),
        datasets: [
          {
            label: "Number of users",
            data: data.map((item) => item.count),
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "#be496b",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      };
    },
  });
  return isPending ? (
    <Loader />
  ) : data ? (
    <Radar data={data} options={options} />
  ) : null;
};
