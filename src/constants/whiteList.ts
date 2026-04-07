import type { DisplayTicker } from "@/types/ticker.type";

export const WHITELISTED_CRYPTOS: DisplayTicker[] = [
  {
    symbol: "BTCUSDT",
    name: "Bitcoin",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  },
  {
    symbol: "ETHUSDT",
    name: "Ethereum",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  },
  {
    symbol: "BNBUSDT",
    name: "BNB",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  },
  {
    symbol: "SOLUSDT",
    name: "Solana",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  },
  {
    symbol: "XRPUSDT",
    name: "XRP",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  },
];

export const WHITELISTED_SYMBOLS: string[] = WHITELISTED_CRYPTOS.map(
  (coin) => coin.symbol
);

export const INDICATORS = [
  { value: "ATR", label: "Average True Range (ATR)" },
  { value: "BollingerBands", label: "Bollinger Bands (BB)" },
  { value: "EMA", label: "Exponential Moving Average (EMA)" },
  { value: "MACD", label: "Moving Average Convergence Divergence (MACD)" },
  { value: "RSI", label: "Relative Strength Index (RSI)" },
  { value: "SMA", label: "Simple Moving Average (SMA)" },
  { value: "Stochastic", label: "Stochastic Oscillator (KD)" },
];

// 인디케이터 중 OSC 타입은 차트 ui를 분할하기 때문에 따로 종류를 포함한 상수를 만든다
export const OSCILLATOR_TYPES = ["RSI", "MACD", "Stochastic", "ATR", "OBV"];

export const INTERVALS = ["1s", "1m", "15m", "1h", "4h", "1d", "1w", "1M"];
