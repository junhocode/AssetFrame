import ReactDOM from "react-dom";
import type { ChartTooltipProps } from "@/types/chart.type";
import { motion } from 'motion/react';
import * as S from "./ChartTooltip.styles";

export const ChartTooltip = ({
  top,
  left,
  candle,
  time,
  visible,
}: ChartTooltipProps) => {
  if (!visible || !candle || !time) {
    return null;
  }

  const price = candle.close;
  const date = new Date((time as number) * 1000);
  const dateStr = date.toLocaleString("ko-KR");

  const tooltipContent = (
    <motion.div
      className={S.tooltipContainer}
      animate={{
        x: left,
        y: top,
        opacity: 1,
        scale: 1
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 500,
        mass: 0.5
      }}
      style={{
        top: 0,
        left: 0,
      }}
    >
      <div className={S.priceLine}>가격</div>
      <div className={S.priceValue}>{price.toFixed(2)} USD</div>
      <div className={S.dateLine}>{dateStr}</div>
    </motion.div>
  );

  return ReactDOM.createPortal(tooltipContent, document.body);
};
