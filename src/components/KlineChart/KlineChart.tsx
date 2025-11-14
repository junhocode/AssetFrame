import { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import type {
  IChartApi,
  ISeriesApi,
  CandlestickData,
} from "lightweight-charts";
import useFormattedChartData from "@/hooks/useFormattedChartData";
import useChartInfiniteScroll from "@/hooks/useChartInfiniteScroll";
import { useLatestTradePrice } from "@/hooks/useLatestTradePrice";
import {
  CANDLESTICK_SERIES_OPTIONS,
  VOLUME_SERIES_OPTIONS,
  VOLUME_SCALE_OPTIONS,
  VOLUME_PRICE_SCALE_ID,
} from "@/constants/configs";
import type { KlineChartProps } from "@/types/chart.type";
import * as S from "./KlineChart.styles";

export default function KlineChart({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  params,
  indicatorData,
}: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const indicatorSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const { candlestickData, volumeData } = useFormattedChartData(data);
  const { handleVisibleLogicalRangeChange, visibleRangeRef, scrollLockRef } =
    useChartInfiniteScroll({
      chartRef,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    });

  const latestPriceRef = useLatestTradePrice(params.symbol);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chart = createChart(chartContainerRef.current, S.chartOptions);
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);

    const candleSeries = chart.addCandlestickSeries(CANDLESTICK_SERIES_OPTIONS);
    const volumeSeries = chart.addHistogramSeries(VOLUME_SERIES_OPTIONS);
    chart.priceScale(VOLUME_PRICE_SCALE_ID).applyOptions(VOLUME_SCALE_OPTIONS);
    const lineSeries = chart.addLineSeries({
      color: "rgba(255, 165, 0, 1)",
      lineWidth: 2,
      crosshairMarkerVisible: false,
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;
    indicatorSeriesRef.current = lineSeries;

    tooltipRef.current = document.createElement("div");
    tooltipRef.current.style.position = "absolute";
    tooltipRef.current.style.display = "none";
    tooltipRef.current.style.pointerEvents = "none";
    tooltipRef.current.style.zIndex = "1000";
    tooltipRef.current.style.background = "white";
    tooltipRef.current.style.border = "1px solid rgba(38,166,154,1)";
    tooltipRef.current.style.borderRadius = "4px";
    tooltipRef.current.style.padding = "8px";
    tooltipRef.current.style.fontSize = "12px";
    tooltipRef.current.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
    tooltipRef.current.style.color = "black";
    chartContainerRef.current.appendChild(tooltipRef.current);

    chart.subscribeCrosshairMove((param) => {
      const container = chartContainerRef.current;
      const series = candleSeriesRef.current;
      const tooltip = tooltipRef.current;
      if (!container || !series || !tooltip) return;

      if (
        !param.point || !param.time || param.point.x < 0 ||
        param.point.x > container.clientWidth || param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        tooltip.style.display = "none";
        return;
      }

      const candle = param.seriesData.get(series) as CandlestickData;
      if (!candle) return;

      const price = candle.close ?? candle.customValues;
      const date = new Date((param.time as number) * 1000);
      const dateStr = date.toLocaleString("ko-KR");

      tooltip.innerHTML = `
        <div style="font-weight: bold; color: rgba(38,166,154,1)">Price</div>
        <div style="font-size: 16px; margin-top: 4px;">${price?.toFixed(2)}</div>
        <div style="margin-top: 4px; color: gray;">${dateStr}</div>
      `;

      const tooltipWidth = 100;
      const tooltipHeight = 70;
      const margin = 12;

      let left = param.point.x + margin;
      if (left > container.clientWidth - tooltipWidth) left = param.point.x - tooltipWidth - margin;

      let top = param.point.y + margin;
      if (top > container.clientHeight - tooltipHeight) top = param.point.y - tooltipHeight - margin;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.display = "block";
    });

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [handleVisibleLogicalRangeChange]);

  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;
    
    candleSeriesRef.current.setData(candlestickData);
    volumeSeriesRef.current.setData(volumeData);
    
    if (visibleRangeRef.current && data?.pages) {
      const addedDataCount = data.pages[0]?.klines.length ?? 0;
      const newFrom = visibleRangeRef.current.from + addedDataCount;
      const newTo = visibleRangeRef.current.to + addedDataCount;
      
      chartRef.current?.timeScale().setVisibleLogicalRange({ from: newFrom, to: newTo });
      visibleRangeRef.current = null;
      
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 100);
    }
  }, [candlestickData, volumeData, data, visibleRangeRef, scrollLockRef]);

  useEffect(() => {
    if (!indicatorSeriesRef.current) return;
    indicatorSeriesRef.current.setData(indicatorData);
  }, [indicatorData]);

  useEffect(() => {
    if (!candleSeriesRef.current) return;

    const intervalId = setInterval(() => {
      const series = candleSeriesRef.current;
      const lastPrice = latestPriceRef.current;

      if (!lastPrice || candlestickData.length === 0) return;

      const lastCandle = candlestickData[candlestickData.length - 1];
      const newTick = {
        time: lastCandle.time,
        open: lastCandle.open,
        high: Math.max(lastCandle.high, lastPrice),
        low: Math.min(lastCandle.low, lastPrice),
        close: lastPrice,
      };
      series?.update(newTick as CandlestickData);
    }, 200);

    return () => clearInterval(intervalId);
  }, [candlestickData, latestPriceRef]);

  return <div ref={chartContainerRef} className="relative w-full h-full rounded-lg overflow-hidden shadow-lg" />;
}