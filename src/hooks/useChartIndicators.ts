import { useRef, useEffect } from "react";
import { stringToColor } from "@/utils/stringToColor";
import { OSCILLATOR_TYPES } from "@/constants/whiteList";
import type { IChartApi, ISeriesApi, LineData, LineWidth } from "lightweight-charts";

export const useChartIndicators = (
  chartRef: React.RefObject<IChartApi | null>,
  indicatorData: Record<string, LineData[]>
) => {
  const seriesMapRef = useRef(new Map<string, ISeriesApi<"Line">>());

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const currentKeys = Object.keys(indicatorData);
    const seriesMap = seriesMapRef.current;

    seriesMap.forEach((series, key) => {
      if (!currentKeys.includes(key)) {
        chart.removeSeries(series);
        seriesMap.delete(key);
      }
    });

    const hasOscillator = currentKeys.some((key) =>
      OSCILLATOR_TYPES.some((type) => key.includes(type))
    );

    chart.priceScale("right").applyOptions({
      scaleMargins: { top: 0.1, bottom: hasOscillator ? 0.3 : 0.1 },
    });

    currentKeys.forEach((key) => {
      const data = indicatorData[key];
      if (!data) return;

      const isOscillator = OSCILLATOR_TYPES.some((type) => key.includes(type));
      const existing = seriesMap.get(key);

      if (existing) {
        existing.setData(data);
      } else {
        const newSeries = chart.addLineSeries({
          color: stringToColor(key),
          lineWidth: 2 as LineWidth,
          priceScaleId: isOscillator ? "oscillator-scale" : "right",
        });

        if (isOscillator) {
          chart.priceScale("oscillator-scale").applyOptions({
            scaleMargins: { top: 0.75, bottom: 0 },
          });
        }

        newSeries.setData(data);
        seriesMap.set(key, newSeries);
      }
    });
  }, [indicatorData, chartRef]);

  return seriesMapRef;
};