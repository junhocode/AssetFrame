import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';

export default function App() {
  const chartParams = {
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: 200
  };

  useRealtimeChartData(chartParams);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-500">
      <KlineChart params={chartParams} />
    </div>
  );
}