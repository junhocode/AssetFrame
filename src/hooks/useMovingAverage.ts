import { useRef, useEffect } from "react";
import type { ISeriesApi } from "lightweight-charts";
import type { MovingAverageHookProps } from "@/types/chart.type";
import { calculateMovingAverageSeriesData } from "@/utils/movingAverageCalculator";

export const useMovingAverage = ({ chart, data, options, visible }: MovingAverageHookProps) => {
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const series = chart.addLineSeries(options);
    seriesRef.current = series;

    return () => {
      if (seriesRef.current) {
        try {
          chart.removeSeries(seriesRef.current);
        } catch (e) {
          console.warn("이평선 시리즈 제거 중 오류 발생", e);
        }
        seriesRef.current = null;
      }
    };
  }, [chart, options]);

  useEffect(() => {
    if (!seriesRef.current) {
      return;
    }

    seriesRef.current.applyOptions({ visible });

    if (visible && data.length > 0) {
      const maData = calculateMovingAverageSeriesData({
        candleData: data,
        maLength: options.length, 
      });
      seriesRef.current.setData(maData);
    }
  }, [data, visible, options.length]);
};