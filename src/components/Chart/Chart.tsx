import { useRef, useEffect } from "react";
import { useAtomValue } from "jotai/react";
import { themeAtom } from "@/atoms/themeAtom";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip";
import { useChartData } from "@/hooks/useChartData";
import { useChartInfiniteScroll } from "@/hooks/useChartInfiniteScroll";
import { useChartInit } from "@/hooks/useChartInit";
import { useChartTooltip } from "@/hooks/useChartTooltip";
import { useChartIndicators } from "@/hooks/useChartIndicators";
import { useTradePriceUpdate } from "@/hooks/useTradePriceUpdate";
import { useTradePrice } from "@/ws/useTradePrice";
import type { IChartApi } from "lightweight-charts";
import type { ChartProps } from "@/types/chart.type";
import * as S from "./Chart.styles";

export const Chart = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  params,
  indicatorData,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const isDark = useAtomValue(themeAtom);

  const { candlestickData, volumeData } = useChartData(data);
  const { handleVisibleLogicalRangeChange, visibleRangeRef, scrollLockRef } =
    useChartInfiniteScroll({
      chartRef,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    });

  const { candleSeriesRef, volumeSeriesRef } = useChartInit(
    chartContainerRef,
    chartRef,
    S.chartOptions(isDark),
    handleVisibleLogicalRangeChange
  );

  const tooltipState = useChartTooltip(chartContainerRef, chartRef, candleSeriesRef);
  const { latestPriceRef } = useTradePrice(params.symbol);

  useChartIndicators(chartRef, indicatorData);
  useTradePriceUpdate(candleSeriesRef, candlestickData, latestPriceRef);

  // 테마 변경
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions(S.chartOptions(isDark));
  }, [isDark]);

  // 캔들 + 볼륨 데이터 반영
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    candleSeriesRef.current.setData(candlestickData);
    volumeSeriesRef.current.setData(volumeData);

    if (visibleRangeRef.current && data?.pages) {
      const addedDataCount = data.pages[0]?.length ?? 0;
      const newFrom = visibleRangeRef.current.from + addedDataCount;
      const newTo = visibleRangeRef.current.to + addedDataCount;

      chartRef.current?.timeScale().setVisibleLogicalRange({ from: newFrom, to: newTo });
      visibleRangeRef.current = null;

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 100);
    }
  }, [candlestickData, volumeData, data, visibleRangeRef, scrollLockRef]);

  return (
    <div className={S.chartWrapper}>
      <div ref={chartContainerRef} className={S.chart} />
      <ChartTooltip {...tooltipState} />
    </div>
  );
};