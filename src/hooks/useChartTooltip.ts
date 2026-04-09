import { useState, useEffect, useRef } from "react";
import { INITIAL_TOOLTIP_STATE } from "@/constants/configs";
import type { IChartApi, ISeriesApi, CandlestickData } from "lightweight-charts";
import type { ChartTooltipProps } from "@/types/chart.type";

export const useChartTooltip = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  chartRef: React.RefObject<IChartApi | null>,
  candleSeriesRef: React.RefObject<ISeriesApi<"Candlestick"> | null>
) => {
  const [tooltipState, setTooltipState] = useState<ChartTooltipProps>(INITIAL_TOOLTIP_STATE);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const handler = (param: any) => {
      const container = containerRef.current;
      const series = candleSeriesRef.current;
      if (!container || !series || !param.point || !param.time) {
        setTooltipState((prev) => ({ ...prev, visible: false }));
        return;
      }

      const candle = param.seriesData.get(series) as CandlestickData;
      if (!candle) {
        setTooltipState((prev) => ({ ...prev, visible: false }));
        return;
      }

      const tooltip = tooltipRef.current;
      const tooltipWidth = tooltip?.offsetWidth ?? 210;
      const tooltipHeight = tooltip?.offsetHeight ?? 70;
      const margin = 15;
      const containerWidth = container.clientWidth;
      const isRightSide = param.point.x > containerWidth / 2;

      const left = isRightSide
        ? param.point.x - tooltipWidth - margin
        : param.point.x + margin;

      let top = param.point.y - tooltipHeight - margin;
      if (top < 0) top = param.point.y + margin;

      setTooltipState({ top, left, candle, time: param.time, visible: true });
    };

    chart.subscribeCrosshairMove(handler);
    return () => chart.unsubscribeCrosshairMove(handler);
  }, [chartRef, containerRef, candleSeriesRef]);

  return { tooltipState, tooltipRef };
};