import { useState } from 'react';
import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import { ItemSelector } from './components/ItemSelector/ItemSelector';

export default function App() {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');

  const chartParams = {
    symbol: symbol,
    interval: '1m',
    limit: 200
  };

  useRealtimeChartData(chartParams);

  const handleSymbolChange = (symbol: string) => {
    setSymbol(symbol)
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-500">
      <div className="flex flex-col items-start gap-4">
        <ItemSelector value={symbol} onChange={handleSymbolChange}/>
        <KlineChart params={chartParams} />
      </div>
    </div>
  );
}