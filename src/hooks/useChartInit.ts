import { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import {
  VOLUME_SERIES_OPTIONS,
  VOLUME_SCALE_OPTIONS,
  VOLUME_PRICE_SCALE_ID,
} from "@/constants/configs";
import type { IChartApi, ISeriesApi } from "lightweight-charts";

export const useChartInit = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  chartRef: React.MutableRefObject<IChartApi | null>,
  chartOptions: object,
  onVisibleRangeChange: (range: any) => void
) => {
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || chartRef.current) return;

    const chart = createChart(container, chartOptions);
    chart.timeScale().subscribeVisibleLogicalRangeChange(onVisibleRangeChange);

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || entries[0].target !== container) return;
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    resizeObserver.observe(container);

    candleSeriesRef.current = chart.addCandlestickSeries();
    volumeSeriesRef.current = chart.addHistogramSeries(VOLUME_SERIES_OPTIONS);
    chart.priceScale(VOLUME_PRICE_SCALE_ID).applyOptions(VOLUME_SCALE_OPTIONS);
    chartRef.current = chart;

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [onVisibleRangeChange]);

  return { candleSeriesRef, volumeSeriesRef };
};