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

     if (seriesRef.current) {
      seriesRef.current.applyOptions({ visible });
    }

    if (visible) {
      const maData = calculateMovingAverageSeriesData({
          candleData: data,
          maLength: options.length
      });
      
      if (maData && maData.length > 0) {
        seriesRef.current?.setData(maData)
      } else {
        seriesRef.current?.setData([]);
      }
    }

    return () => {
      if (chart && seriesRef.current) {
        try {
          chart.removeSeries(seriesRef.current);
        } catch {
          //empty block
        }
      }
      seriesRef.current = null;
    };
    
  }, [chart, data, options, visible]); 
};