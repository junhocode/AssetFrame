import { useRef, useEffect, useCallback } from "react";
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type LogicalRange,
} from "lightweight-charts";
import { useInfiniteKlinesQuery } from "@/queries/useKlineQuery";
import type { KlineChartProps } from "@/types/chart.type";
import * as S from "./KlineChart.styles";

export default function KlineChart({ params }: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteKlinesQuery(params);

  const candlestickData = data?.pages
    .flatMap((page) => page.candles)
    .sort((a, b) => (a.time as number) - (b.time as number)); 

  const volumeData = data?.pages
    .flatMap((page) => page.volumes)
    .sort((a, b) => (a.time as number) - (b.time as number));

  const handleVisibleLogicalRangeChange = useCallback((logicalRange: LogicalRange | null) => {
    if (!logicalRange) return;
    
    const isNearLeftEdge = logicalRange.from < 20;

    if (
      isNearLeftEdge &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, S.chartOptions);
    const candleSeries = chart.addCandlestickSeries({
      upColor: "rgba(0, 150, 136, 1)",  
      downColor: "rgba(255, 82, 82, 1)",
      borderDownColor: "rgba(255, 82, 82, 1)",
      borderUpColor: "rgba(0, 150, 136, 1)",
      wickDownColor: "rgba(255, 82, 82, 1)",
      wickUpColor: "rgba(0, 150, 136, 1)",
    });
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "volume-scale",
    });
    chart.priceScale("volume-scale").applyOptions({
        scaleMargins: { top: 0.8, bottom: 0 },
    });

    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [handleVisibleLogicalRangeChange]);

  useEffect(() => {
    if (candlestickData && candleSeriesRef.current) {
      candleSeriesRef.current.setData(candlestickData);
    }
    if (volumeData && volumeSeriesRef.current) {
      volumeSeriesRef.current.setData(volumeData);
    }
  }, [candlestickData, volumeData]);

  if (isLoading) {
    return <div className={S.statusContainer}>Loading Chart...</div>;
  }
  if (isError) {
    return <div className={S.errorContainer}>Error: Could not load chart data.</div>;
  }

  return <div ref={chartContainerRef}/>;
}