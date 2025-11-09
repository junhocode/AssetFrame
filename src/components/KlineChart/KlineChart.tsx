import { useRef, useMemo, useEffect, useCallback } from "react";
import { createChart } from "lightweight-charts";
import type { IChartApi, ISeriesApi, LogicalRange, CandlestickData } from "lightweight-charts";
import { useInfiniteKlinesQuery } from "@/queries/useKlineQuery";
import { useMovingAverage } from "@/hooks/useMovingAverage";
import type { KlineChartProps } from "@/types/chart.type";
import * as S from "./KlineChart.styles";

export default function KlineChart({ params, showMA20, showMA60 }: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteKlinesQuery(params);

  const chartData = useMemo(() => {
    if (!data?.pages) return { candlestickData: [], volumeData: []}

  const candlestickData = data?.pages
    .flatMap((page) => page.candles)
    .sort((a, b) => (a.time as number) - (b.time as number)); 

  const volumeData = data?.pages
    .flatMap((page) => page.volumes)
    .sort((a, b) => (a.time as number) - (b.time as number));

  return { candlestickData, volumeData };
  }, [data]);  

  useMovingAverage({
    chart: chartRef.current,
    data: chartData.candlestickData as CandlestickData[], 
    options: { length: 20, color: '#2962FF', lineWidth: 2 },
    visible: showMA20,
  });

  // 60일 이평선
  useMovingAverage({
    chart: chartRef.current,
    data: chartData.candlestickData as CandlestickData[], 
    options: { length: 60, color: '#FF6D00', lineWidth: 2 },
    visible: showMA60,
  });

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
    if (chartData.candlestickData.length > 0 && candleSeriesRef.current) {
      candleSeriesRef.current.setData(chartData.candlestickData);
    }
    if (chartData.volumeData.length > 0 && volumeSeriesRef.current) {
      volumeSeriesRef.current.setData(chartData.volumeData);
    }
  }, [chartData]);

  if (isLoading) {
    return <div className={S.statusContainer}>Loading Chart...</div>;
  }
  if (isError) {
    return <div className={S.errorContainer}>Error: Could not load chart data.</div>;
  }

  return <div ref={chartContainerRef}/>;
}