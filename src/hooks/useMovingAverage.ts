import { useRef, useEffect } from "react";
import type { ISeriesApi } from "lightweight-charts";
import type { MovingAverageHookProps } from "@/types/chart.type";
import { calculateMovingAverageSeriesData } from "@/utils/movingAverageCalculator";

export const useMovingAverage = ({ chart, data, options, visible }: MovingAverageHookProps) => {
    const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chart || data.length === 0) {
        return;
    }

    if (!seriesRef.current) {
      const { ...seriesOptions } = options; 
      seriesRef.current = chart.addLineSeries({
        ...seriesOptions,
        lastValueVisible: false, 
        priceLineVisible: false,
      });
    }

    seriesRef.current.applyOptions({ visible });

    if (visible) {
      const maData = calculateMovingAverageSeriesData({
          candleData: data,
          maLength: options.length
      });
      seriesRef.current.setData(maData);
    }
    
  }, [chart, data, options, visible]); 
};