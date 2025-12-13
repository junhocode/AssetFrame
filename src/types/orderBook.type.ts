type OrderBookEntry = [string, string];

interface RateLimits {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
  count: number;
}

export interface OrderBookResponse {
  lastUpdateId: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  rateLimits?: RateLimits[];
}

export interface OrderBookRowProps {
  price: string;
  amount: string;
  maxQty: number;
  type: "ask" | "bid";
}