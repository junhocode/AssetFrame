import type { SymbolData } from "@/types/symbol.type";

export const COIN_WHITELIST: SymbolData[] = [
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

export const WHITELISTED_SYMBOLS: string[] = COIN_WHITELIST.map(
  (coin) => coin.symbol
);
