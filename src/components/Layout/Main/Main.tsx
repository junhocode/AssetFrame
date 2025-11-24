import * as React from "react";
import { useState } from "react";

import { keepPreviousData } from "@tanstack/react-query";
import type { LineData } from "lightweight-charts";

import { useFormattedChartData } from "@/hooks/useFormattedChartData";
import { useRealtimeChartData } from "@/hooks/useRealtimeChartData";
import { useInfiniteKlinesQuery } from "@/queries/useInfiniteKlineQuery";

import { IndicatorSelector } from "@/components/IndicatorSelector/IndicatorSelector";
import { KlineChart } from "@/components/KlineChart/KlineChart";
import { OrderBook } from "@/components/OrderBook/OrderBook";
import { PeriodCounter } from "@/components/PeriodCounter/PeriodCounter";
import { SymbolSelector } from "@/components/SymbolSelector/SymbolSelector";
import { TimeScaleSelector } from "@/components/TimeScaleSelector/TimeScaleSelector";
import { Spinner } from "@/components/ui/spinner";

import * as S from "./Main.styles";

export const Main = () => {
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [timeScale, setTimeScale] = useState<string>("1m");
  const [indicatorData, setIndicatorData] = useState<{
    [key: string]: LineData[];
  }>({});
  const [period, setPeriod] = React.useState<number>(20);

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
  } = useInfiniteKlinesQuery(chartParams, {
    placeholderData: keepPreviousData,
  });

  const { candlestickData } = useFormattedChartData(data);

  useRealtimeChartData(chartParams);

  const handleSymbolChange = (symbol: string) => {
    setSymbol(symbol);
  };

  const handleTimeScaleChange = (timeScale: string) => {
    setTimeScale(timeScale);
  };

  const isDisabled = Object.keys(indicatorData).length === 0;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={S.loading}>
          <Spinner />
          <span>Loading Chart..</span>
        </div>
      );
    }

    if (isError) {
      return (
        <div className={S.container}>
          Sorry, there has been an error.. Please refresh!
        </div>
      );
    }

    return (
      <div className={S.container}>
        <div className={S.set}>
          <div className={S.selectors}>
            <SymbolSelector value={symbol} onChange={handleSymbolChange} />
            <TimeScaleSelector
              value={timeScale}
              onChange={handleTimeScaleChange}
            />
            <IndicatorSelector
              candlestickData={candlestickData}
              period={period}
              onIndicatorChange={setIndicatorData}
            />
            <PeriodCounter
              period={period}
              setPeriod={setPeriod}
              isDisabled={isDisabled}
            />
          </div>

          <div
            className={`${S.chartContainer} ${
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
              <div className={S.fetching}>
                <Spinner />
              </div>
            )}
          </div>
        </div>

        <div className={S.orderBookContainer}>
          <OrderBook symbol={symbol} />
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};