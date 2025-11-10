import { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import { useInfiniteKlinesQuery } from "@/queries/useKlineQuery";
import { useMovingAverage } from "@/hooks/useMovingAverage";
import useFormattedChartData from "@/hooks/useFormattedChartData";
import useChartInfiniteScroll from "@/hooks/useChartInfiniteScroll";
import type { KlineChartProps } from "@/types/chart.type";
import * as S from "./KlineChart.styles";

export default function KlineChart({ params, showMA20, showMA60 }: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteKlinesQuery(params);

  const { candlestickData, volumeData } = useFormattedChartData(data);

  const { handleVisibleLogicalRangeChange } = useChartInfiniteScroll({
    data, 
    chartRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  useMovingAverage({
    chart: chartRef.current,
    data: candlestickData, 
    options: { length: 20, color: '#2962FF', lineWidth: 2 },
    visible: showMA20,
  });

  useMovingAverage({
    chart: chartRef.current,
    data: candlestickData, 
    options: { length: 60, color: '#FF6D00', lineWidth: 2 },
    visible: showMA60,
  });

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
    if (candlestickData.length > 0 && candleSeriesRef.current) {
      candleSeriesRef.current.setData(candlestickData);
    }
    if (volumeData.length > 0 && volumeSeriesRef.current) {
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