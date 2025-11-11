export interface BinanceRestSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;
  isSpotTradingAllowed: boolean;
}

export interface BinanceRestExchangeInfoResponse {
  symbols: BinanceRestSymbol[];
}

export interface SymbolData {
  value: string;
  label: string;
}