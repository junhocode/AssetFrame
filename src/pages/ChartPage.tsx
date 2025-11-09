import { useState } from 'react';
import KlineChart from '@/components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import { ItemSelector } from '@/components/ItemSelector/ItemSelector';
import { TimeScaleSelector } from '@/components/TimeScaleSelector/TimeScaleSelector';
import { IndicatorSelector } from '@/components/IndicatorSelector/IndicatorSelector';

export default function ChartPage() {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
  const [timeScale, setTimeScale] = useState<string>('1m');
  const [indicator, setIndicator] = useState<string>('');

  const chartParams = {
    symbol: symbol,
    interval: timeScale,
    limit: 200
  };

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

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col items-start gap-4">
        <div className='flex gap-3'>
        <ItemSelector value={symbol} onChange={handleSymbolChange}/>
        <TimeScaleSelector value={timeScale} onChange={handleTimeScaleChange}/>
        <IndicatorSelector value={indicator} onChange={handleIndicatorChange}/>
        </div>
        <div className='border rounded-xl'>
        <KlineChart 
        params={chartParams}
        showMA20={showMA20}
        showMA60={showMA60}
        /> </div>
      </div>
    </div>
  );
}