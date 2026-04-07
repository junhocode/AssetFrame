import { useEffect } from "react";
import type { ISeriesApi, CandlestickData } from "lightweight-charts";

export const useTradePriceUpdate = (
  candleSeriesRef: React.RefObject<ISeriesApi<"Candlestick"> | null>,
  candlestickData: CandlestickData[],
  latestPriceRef: React.RefObject<number | null>
) => {
  useEffect(() => {
    if (!candleSeriesRef.current || !candlestickData.length) return;

    const intervalId = setInterval(() => {
      const series = candleSeriesRef.current;
      const lastPrice = latestPriceRef.current;
      if (!series || !lastPrice) return;

      const last = candlestickData[candlestickData.length - 1];
      series.update({
        time: last.time,
        open: last.open,
        high: Math.max(last.high, lastPrice),
        low: Math.min(last.low, lastPrice),
        close: lastPrice,
      } as CandlestickData);
    }, 200);

    return () => clearInterval(intervalId);
  }, [candlestickData, latestPriceRef, candleSeriesRef]);
};