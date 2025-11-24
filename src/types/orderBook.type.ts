export type OrderBookEntry = [string, string];

export interface RateLimits {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
    count: number;
}

export interface GetOrderBookResponse {
    lastUpdateId: number;
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    rateLimits?: RateLimits[]
}