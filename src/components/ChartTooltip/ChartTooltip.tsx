import { motion } from "motion/react";
import type { ChartTooltipProps } from "@/types/chart.type";
import * as S from "./ChartTooltip.styles";

export const ChartTooltip = ({ top, left, candle, time, visible }: ChartTooltipProps) => {
  if (!visible || !candle || !time) return null;

  const date = new Date((time as number) * 1000);

  return (
    <motion.div
      className={S.tooltipContainer}
      animate={{ x: left, y: top, opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 500, mass: 0.5 }}
      style={{ top: 0, left: 0 }}
    >
      <div className={S.priceLine}>가격</div>
      <div className={S.priceValue}>{candle.close.toFixed(2)} USD</div>
      <div className={S.dateLine}>{date.toLocaleString("ko-KR")}</div>
    </motion.div>
  );
};