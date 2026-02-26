import * as React from "react";
import { useState } from "react";
import { IndicatorSelector } from "@/components/IndicatorSelector/IndicatorSelector";
import { Chart } from "@/components/Chart/Chart";
import { OrderBook } from "@/components/OrderBook/OrderBook";
import { PeriodCounter } from "@/components/PeriodCounter/PeriodCounter";
import { TickerSelector } from "@/components/TickerSelector/TickerSelector";
import { IntervalSelector } from "@/components/IntervalSelector/IntervalSelector";
import { Spinner } from "@/components/ui/spinner";
import { useTickers } from "@/hooks/useTickers";
import { useChartData } from "@/hooks/useChartData";
import { useInfiniteKlinesQuery } from "@/queries/useInfiniteKlineQuery";
import type { LineData } from "lightweight-charts";
import * as S from "./Main.styles";
import { useKline } from "@/ws/useKline";

export const Main = () => {
  const [ticker, setTicker] = useState<string>("BTCUSDT");
  const [timeScale, setTimeScale] = useState<string>("1m");
  const [indicatorData, setIndicatorData] = useState<{
    [key: string]: LineData[];
  }>({});
  const [period, setPeriod] = React.useState<number>(20);

  const chartParams = {
    symbol: ticker, 
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
  } = useInfiniteKlinesQuery(chartParams);

  const { candlestickData } = useChartData(data);

  useTickers();

  useKline(chartParams);

  React.useEffect(() => {
    if (!candlestickData || candlestickData.length === 0) {
      document.title = "AssetFrame";
      return;
    }

    const lastCandle = candlestickData[candlestickData.length - 1];
    const price = 'close' in lastCandle ? lastCandle.close : (lastCandle as any).value;

    const formattedPrice = price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    document.title = `AssetFrame | ${ticker} ${formattedPrice}`;

  }, [candlestickData, ticker]);

  const handleTickerChange = (newTicker: string) => {
    setTicker(newTicker);
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
            <TickerSelector value={ticker} onChange={handleTickerChange} />
            <IntervalSelector
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
            <Chart
              key={ticker}
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
          <OrderBook symbol={ticker} />
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};