import React from "react";

import styles from "./NumbersChart.module.css";
import { useQuery } from "@tanstack/react-query";
import statisticsService from "@/services/statistics.service";
import { Loader } from "@/components/ui/Loader/Loader";
import { motion } from "framer-motion";
import { AreaChart, BarChart3 } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  ROTATE_CARD,
} from "./numbers-animation";

export const NumbersChart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["numbers"],
    queryFn: () => statisticsService.getNumbers(),
  });

  return isPending ? (
    <Loader />
  ) : data?.data.length ? (
    <motion.div
      className={styles.wrapper}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.data.map((number, index) => (
        <motion.div
          key={number.name}
          className={styles.number}
          variants={itemVariants}
          whileHover={ROTATE_CARD.whileHover}
          transition={ROTATE_CARD.transition}
          style={{ perspective: 1000 }}
        >
          <div className={styles.info}>
            <div>{number.name}</div>
            <div className={styles.value}>{number.value}</div>
          </div>
          <div className={styles.chart}>
            {index % 2 === 0 ? (
              <AreaChart color="#e6a34d" size={45} />
            ) : (
              <BarChart3 color="#be496b" size={45} />
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  ) : null;
};
