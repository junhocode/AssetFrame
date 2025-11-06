import "./App.css";
import KlineChart from "./components/KlineChart/KlineChart";

export function App() {
  const chartParams = { symbol: 'BTCUSDT', interval: '1m', limit: 100 };
  
  return (
    <div className="w-[500px] h-[300px] m-[50px] border">
      <KlineChart params={chartParams}/>
    </div>
  );
}

export default App;
