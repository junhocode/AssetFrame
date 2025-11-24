import { useRef, useEffect, useState } from "react";
import { createChart } from "lightweight-charts";
import { useAtomValue } from "jotai/react";
import { darkModeAtom } from "@/atoms/themeAtom";
import { ChartTooltip } from "../ChartTooltip/ChartTooltip";
import { useFormattedChartData } from "@/hooks/useFormattedChartData";
import { useChartInfiniteScroll } from "@/hooks/useChartInfiniteScroll";
import { useLatestTradePrice } from "@/hooks/useLatestTradePrice";
import { getRandomColor } from "@/utils/randomColorGenarator";
import {
  CANDLESTICK_SERIES_OPTIONS,
  VOLUME_SERIES_OPTIONS,
  VOLUME_SCALE_OPTIONS,
  VOLUME_PRICE_SCALE_ID,
  INITIAL_TOOLTIP_STATE,
} from "@/constants/configs";
import type {
  IChartApi,
  ISeriesApi,
  CandlestickData,
  LineWidth
} from "lightweight-charts";
import type { ChartTooltipProps, KlineChartProps } from "@/types/chart.type";
import * as S from "./KlineChart.styles";

export const KlineChart = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  params,
  indicatorData,
}: KlineChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const isDark = useAtomValue(darkModeAtom);

  const OSCILLATORS = ["RSI", "MACD", "Stochastic", "ATR", "OBV"];

  const indicatorSeriesRef = useRef(new Map<string, ISeriesApi<"Line">>());
  const [tooltipState, setTooltipState] = useState<ChartTooltipProps>(
    INITIAL_TOOLTIP_STATE
  );

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

    const chart = createChart(
      chartContainerRef.current,
      S.chartOptions(isDark)
    );
    chart
      .timeScale()
      .subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);

    new ResizeObserver(entries => {
        if (entries.length === 0 || entries[0].target !== chartContainerRef.current) { return; }
        const newRect = entries[0].contentRect;
        chart.applyOptions({ height: newRect.height, width: newRect.width });
      }).observe(chartContainerRef.current);  

    const candleSeries = chart.addCandlestickSeries(CANDLESTICK_SERIES_OPTIONS);
    const volumeSeries = chart.addHistogramSeries(VOLUME_SERIES_OPTIONS);
    chart.priceScale(VOLUME_PRICE_SCALE_ID).applyOptions(VOLUME_SCALE_OPTIONS);

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    chart.subscribeCrosshairMove((param) => {
      const container = chartContainerRef.current;
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

      const chartRect = container.getBoundingClientRect();
      const containerWidth = container.clientWidth;

      const tooltipWidth = 210;
      const tooltipHeight = 70;
      const margin = 15;

      const isRightSide = param.point.x > containerWidth / 2

      let left;
      if (isRightSide) {
        left = chartRect.left + param.point.x - tooltipWidth - margin;
      } else {
        left = chartRect.left + param.point.x + margin; 
      }

      let top = chartRect.top + param.point.y - tooltipHeight - margin;
      if (top < 0) {
        top = chartRect.top + param.point.y + margin;
      }

      setTooltipState({ top, left, candle, time: param.time, visible: true });
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      indicatorSeriesRef.current.clear(); 
    };
  }, [handleVisibleLogicalRangeChange]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions(S.chartOptions(isDark));
  }, [isDark]);

  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    candleSeriesRef.current.setData(candlestickData);
    volumeSeriesRef.current.setData(volumeData);

    if (visibleRangeRef.current && data?.pages) {
      const addedDataCount = data.pages[0]?.klines.length ?? 0;
      const newFrom = visibleRangeRef.current.from + addedDataCount;
      const newTo = visibleRangeRef.current.to + addedDataCount;

      chartRef.current
        ?.timeScale()
        .setVisibleLogicalRange({ from: newFrom, to: newTo });
      visibleRangeRef.current = null;

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 100);
    }
  }, [candlestickData, volumeData, data, visibleRangeRef, scrollLockRef]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const currentIndicatorKeys = Object.keys(indicatorData);
    const seriesMap = indicatorSeriesRef.current;

    seriesMap.forEach((series, key) => {
      if (!currentIndicatorKeys.includes(key)) {
        chart.removeSeries(series);
        seriesMap.delete(key);
      }
    });

    const hasOscillator = currentIndicatorKeys.some((key) =>
      OSCILLATORS.some((type) => key.includes(type))
    );

    chart.priceScale("right").applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: hasOscillator ? 0.3 : 0.1,
      },
    });

    currentIndicatorKeys.forEach((key) => {
      const dataForSeries = indicatorData[key];
      if (!dataForSeries) return;

      const isOscillator = OSCILLATORS.some((type) => key.includes(type));

      const existingSeries = seriesMap.get(key);

      if (existingSeries) {
        existingSeries.setData(dataForSeries);
      } else {
        const seriesOptions = {
          color: getRandomColor(),
          lineWidth: 2 as LineWidth,
          priceScaleId: isOscillator ? "oscillator-scale" : "right",
        };

        const newSeries = chart.addLineSeries(seriesOptions);

        if (isOscillator) {
          chart.priceScale("oscillator-scale").applyOptions({
            scaleMargins: {
              top: 0.75,
              bottom: 0,
            },
          });
        }

        newSeries.setData(dataForSeries);
        seriesMap.set(key, newSeries);
      }
    });
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

  return (
    <>
      <div ref={chartContainerRef} className={S.chart} />
      <ChartTooltip {...tooltipState} />
    </>
  );
};
