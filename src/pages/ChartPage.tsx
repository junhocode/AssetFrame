import { useState } from 'react';
import KlineChart from '@/components/KlineChart/KlineChart';
import { Spinner } from '@/components/ui/spinner';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import { ItemSelector } from '@/components/ItemSelector/ItemSelector';
import { useInfiniteKlinesQuery } from '@/queries/useKlineQuery';
import { TimeScaleSelector } from '@/components/TimeScaleSelector/TimeScaleSelector';
import { IndicatorSelector } from '@/components/IndicatorSelector/IndicatorSelector';

export default function ChartPage() {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
  const [timeScale, setTimeScale] = useState<string>('1m');
  const [indicator, setIndicator] = useState<string>('');

  const chartParams = {
    symbol: symbol,
    interval: timeScale,
    limit: 500
  };

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError 
  } = useInfiniteKlinesQuery(chartParams);

  const showMA20 = indicator === 'MA20';
  const showMA60 = indicator === 'MA60';

  useRealtimeChartData(chartParams);

  const handleSymbolChange = (symbol: string) => {
    setSymbol(symbol)
  }

  const handleTimeScaleChange = (timeScale: string) => {
    setTimeScale(timeScale)
  }

  const handleIndicatorChange = (indicator: string) => {
    setIndicator(indicator)
  }

  if (isLoading) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen w-screen">
      <Spinner />
      <span>Loading Chart...</span>
    </div>
  );
}

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Sorry, there has been an error.. Please refresh!
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col items-start gap-4">
        <div className='flex gap-3'>
        <ItemSelector value={symbol} onChange={handleSymbolChange}/>
        <TimeScaleSelector value={timeScale} onChange={handleTimeScaleChange}/>
        <IndicatorSelector value={indicator} onChange={handleIndicatorChange}/>
        </div>
        <div className={`transition-opacity duration-300 ${isFetchingNextPage ? 'opacity-40' : 'opacity-100'}`}>
        <KlineChart 
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            showMA20={showMA20}
            showMA60={showMA60}
        /> 
        {isFetchingNextPage && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="absolute inset-0 bg-transparent pointer-events-auto" /> 
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}