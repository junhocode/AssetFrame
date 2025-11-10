import { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';
import useFormattedChartData from '@/hooks/useFormattedChartData';
import useChartInfiniteScroll from '@/hooks/useChartInfiniteScroll';
import { useMovingAverage } from '@/hooks/useMovingAverage';
import {
  CANDLESTICK_SERIES_OPTIONS,
  VOLUME_SERIES_OPTIONS,
  VOLUME_SCALE_OPTIONS,
  VOLUME_PRICE_SCALE_ID,
  MA20_OPTIONS,
  MA60_OPTIONS,
} from '@/constants/configs'
import type { KlineChartProps } from '@/types/chart.type';
import * as S from './KlineChart.styles'

export default function KlineChart({ data, fetchNextPage, hasNextPage, isFetchingNextPage, showMA20, showMA60 }: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const { candlestickData, volumeData } = useFormattedChartData(data);
  const { handleVisibleLogicalRangeChange, visibleRangeRef } = useChartInfiniteScroll({
    chartRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  useMovingAverage({ chart: chartRef.current, data: candlestickData, options: MA20_OPTIONS, visible: showMA20 });
  useMovingAverage({ chart: chartRef.current, data: candlestickData, options: MA60_OPTIONS, visible: showMA60 });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, S.chartOptions);
    const candleSeries = chart.addCandlestickSeries(CANDLESTICK_SERIES_OPTIONS);
    const volumeSeries = chart.addHistogramSeries(VOLUME_SERIES_OPTIONS);
    chart.priceScale(VOLUME_PRICE_SCALE_ID).applyOptions(VOLUME_SCALE_OPTIONS);
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange);

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [handleVisibleLogicalRangeChange]);

  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current || !volumeSeriesRef.current) return;

    const isInfiniteScrollAction = !!visibleRangeRef.current;

    if (candlestickData.length > 0) {
      candleSeriesRef.current.setData(candlestickData);
      volumeSeriesRef.current.setData(volumeData);
    }

    if (isInfiniteScrollAction && data?.pages) {
        const addedDataCount = data.pages[0]?.candles.length ?? 0;
        const newFrom = visibleRangeRef.current!.from + addedDataCount;
        const newTo = visibleRangeRef.current!.to + addedDataCount;

        chartRef.current.timeScale().setVisibleLogicalRange({ from: newFrom, to: newTo });
        visibleRangeRef.current = null;
    }

  }, [data, candlestickData, volumeData, visibleRangeRef]);


  return <div ref={chartContainerRef}/>;
}