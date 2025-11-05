import './App.css';
import CandlestickChart from './components/Chart/Chart';
import { WebSocketProvider } from './wss/WebSocketProvider';

export function App() {
    return (
        <div className="w-[500px] h-[300px] m-[50px] border">
          <WebSocketProvider>
            <CandlestickChart />
          </WebSocketProvider> 
        </div>
    );
}

export default App;