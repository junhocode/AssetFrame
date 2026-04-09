import { forwardRef } from "react";
import { motion } from "motion/react";
import type { ChartTooltipProps } from "@/types/chart.type";
import * as S from "./ChartTooltip.styles";

export const ChartTooltip = forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ top, left, candle, time, visible }, ref) => {
    const date = candle && time ? new Date((time as number) * 1000) : null;

    return (
      <div ref={ref} className={S.tooltipContainer}>
        <motion.div
          className={S.tooltipInner}
          animate={{
            x: left,
            y: top,
            opacity: visible && candle ? 1 : 0,
            scale: visible && candle ? 1 : 0.9,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 500, mass: 0.5 }}
        >
          <div className={S.priceLine}>가격</div>
          <div className={S.priceValue}>{candle?.close.toFixed(2) ?? "0"} USD</div>
          <div className={S.dateLine}>{date?.toLocaleString("ko-KR") ?? ""}</div>
        </motion.div>
      </div>
    );
  }
);