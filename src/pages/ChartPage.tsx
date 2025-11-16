import { useState } from "react";
import KlineChart from "@/components/KlineChart/KlineChart";
import { Spinner } from "@/components/ui/spinner";
import { useRealtimeChartData } from "@/hooks/useRealtimeChartData";
import { SymbolSelector } from "@/components/SymbolSelector/SymbolSelector";
import { useInfiniteKlinesQuery } from "@/queries/useInfiniteKlineQuery";
import TimeScaleSelector from "@/components/TimeScaleSelector/TimeScaleSelector";
import IndicatorSelector from "@/components/IndicatorSelector/IndicatorSelector";
import useFormattedChartData from "@/hooks/useFormattedChartData";
import type { LineData } from "lightweight-charts";
import { keepPreviousData } from "@tanstack/react-query";

export default function ChartPage() {
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [timeScale, setTimeScale] = useState<string>("1m");
  const [indicatorData, setIndicatorData] = useState<{ [key: string]: LineData[] }>({});

  const chartParams = {
    symbol: symbol,
    interval: timeScale,
    limit: 500,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteKlinesQuery(
    chartParams,
    { placeholderData: keepPreviousData }
  );

  const { candlestickData } = useFormattedChartData(data);

  useRealtimeChartData(chartParams);

  const handleSymbolChange = (symbol: string) => {
    setSymbol(symbol);
  };

  const handleTimeScaleChange = (timeScale: string) => {
    setTimeScale(timeScale);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen w-screen bg-[#ece8e8]">
        <Spinner />
        <span>Loading Chart...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#ece8e8]">
        Sorry, there has been an error.. Please refresh!
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#ece8e8]">
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-3 items-center">
          <SymbolSelector value={symbol} onChange={handleSymbolChange} />
          <TimeScaleSelector value={timeScale} onChange={handleTimeScaleChange} />
          <IndicatorSelector
            candlestickData={candlestickData}
            onIndicatorChange={setIndicatorData}
          />
        </div>
        <div
          className={`relative transition-opacity duration-300 ${
            isFetching && !isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          <KlineChart
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            params={chartParams}
            indicatorData={indicatorData}
          />
          {isFetching && !isFetchingNextPage && (
             <div className="absolute inset-0 z-10 flex flex-col justify-center items-center gap-2 bg-gray-200 bg-opacity-30">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}