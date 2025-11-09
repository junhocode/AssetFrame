import { useState } from 'react';
import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import { ItemSelector } from './components/ItemSelector/ItemSelector';
import { TimeScaleSelector } from './components/TimeScaleSelector/TimeScaleSelector';

export default function App() {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
  const [timeScale, setTimeScale] = useState<string>('1m');

  const chartParams = {
    symbol: symbol,
    interval: timeScale,
    limit: 200
  };

  useRealtimeChartData(chartParams);

  const handleSymbolChange = (symbol: string) => {
    setSymbol(symbol)
  }

  const handleTimeScaleChange = (timeScale: string) => {
    setTimeScale(timeScale)
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col items-start gap-4">
        <div className='flex gap-3'>
        <ItemSelector value={symbol} onChange={handleSymbolChange}/>
        <TimeScaleSelector value={timeScale} onChange={handleTimeScaleChange}/>
        </div>
        <div className='border rounded-xl'>
        <KlineChart params={chartParams} />
        </div>
      </div>
    </div>
  );
}