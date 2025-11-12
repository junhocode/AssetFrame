import { useRef, useEffect } from "react";
import type { ISeriesApi } from "lightweight-charts";
import type { MovingAverageHookProps } from "@/types/chart.type";

export function useMovingAverage({ chart, data, options, visible }: MovingAverageHookProps) {
  const maSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chart) {
      return;
    }

    if (!visible) {
      if (maSeriesRef.current) {
        try {
          chart.removeSeries(maSeriesRef.current);
        } catch (e) {
          console.warn('이평선 시리즈 제거 중 오류 발생 (차트가 이미 제거되었을 수 있음):', e);
        }
        maSeriesRef.current = null;
      }
      return;
    }

    if (!maSeriesRef.current) {
      maSeriesRef.current = chart.addLineSeries(options);
    }
    
    if (data.length > 0) {
      maSeriesRef.current.setData(data);
    }

    return () => {
      if (maSeriesRef.current) {
        try {
          chart.removeSeries(maSeriesRef.current);
        } catch (e) {
          console.warn('이평선 시리즈 제거 중 오류 발생 (차트가 이미 제거되었을 수 있음):', e);
        }
        maSeriesRef.current = null;
      }
    };
    
  }, [chart, visible, data, options]); 
}