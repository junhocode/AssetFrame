import { useRef, useEffect } from "react";
import type { ISeriesApi } from "lightweight-charts";
import type { MovingAverageFunctionProps, MovingAverageHookProps } from "@/types/chart.type";

function calculateMovingAverageSeriesData({ candleData, maLength }: MovingAverageFunctionProps) {
    const maData = [];

    for (let i = 0; i < candleData.length; i++) {
        if (i < maLength - 1) { 
            maData.push({ time: candleData[i].time }); 
        } else {
            let sum = 0;
            for (let j = 0; j < maLength; j++) {
                sum += candleData[i - j].close;
            }
            const maValue = sum / maLength;
            maData.push({ time: candleData[i].time, value: maValue });
        }
    }

    return maData;
}

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