import { useMemo } from "react";
import { useOrderBookQuery } from "@/queries/useOrderBookQuery";
import { SlidingNumber } from "../ui/shadcn-io/sliding-number";
import { useRealtimeOrderBook } from "@/hooks/useRealTimeOrderBookData";
import { cn } from "@/lib/utils";
import { numberParser } from "@/utils/numberParser";

interface OrderBookProps {
  symbol: string;
}

const colStyles = {
  price: "w-[30%] shrink-0 text-left truncate",
  amount: "w-[35%] shrink-0 text-right truncate",
  total: "w-[35%] shrink-0 text-right truncate",
};

export const OrderBook = ({ symbol }: OrderBookProps) => {
  const { data, isLoading } = useOrderBookQuery(symbol);

  useRealtimeOrderBook(symbol);

  const maxQuantity = useMemo(() => {
    if (!data) return 0;
    const maxBid = Math.max(...data.bids.map(([, qty]) => parseFloat(qty)));
    const maxAsk = Math.max(...data.asks.map(([, qty]) => parseFloat(qty)));
    return Math.max(maxBid, maxAsk);
  }, [data]);

  const asks = useMemo(() => {
    return data?.asks ? [...data.asks].reverse() : [];
  }, [data?.asks]);

  const bids = data?.bids || [];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-muted-foreground font-mono">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-destructive font-mono">
        Failed to load
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-card font-mono text-xs overflow-hidden">
      <div className="flex w-full px-3 text-[#848E9C] text-xs font-semibold items-center">
        <span className={colStyles.price}>Price(USDT)</span>
        <span className={colStyles.amount}>Amount({symbol})</span>
        <span className={colStyles.total}>Total</span>
      </div>

      <div className="flex flex-1 flex-col justify-start overflow-hidden min-h-0 pb-1">
        {asks.map((ask) => (
          <OrderBookRow
            key={ask[0]}
            price={ask[0]}
            amount={ask[1]}
            maxQty={maxQuantity}
            type="ask"
          />
        ))}
      </div>

      <div className="shrink-0 border-y border-border py-2 bg-muted/30 flex items-center justify-center overflow-hidden z-20">
        <span className="flex text-lg font-bold text-yellow-300 items-center">
          <span className="mr-1">$</span>
          <SlidingNumber
            number={parseFloat(bids[0]?.[0] || "0")}
            decimalPlaces={2}
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-1 overflow-hidden min-h-0">
        {bids.map((bid) => (
          <OrderBookRow
            key={bid[0]}
            price={bid[0]}
            amount={bid[1]}
            maxQty={maxQuantity}
            type="bid"
          />
        ))}
      </div>
    </div>
  );
};

interface OrderBookRowProps {
  price: string;
  amount: string;
  maxQty: number;
  type: "ask" | "bid";
}

const OrderBookRow = ({ price, amount, maxQty, type }: OrderBookRowProps) => {
  const priceNum = parseFloat(price);
  const amountNum = parseFloat(amount);
  const total = priceNum * amountNum;

  const widthPercent = `${Math.min((amountNum / maxQty) * 100, 100)}%`;
  const isAsk = type === "ask";

  return (
    <div className="relative flex w-full h-[25px] shrink-0 cursor-pointer items-center px-3 hover:bg-muted/50">
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 z-0 transition-all duration-300",
          isAsk
            ? "bg-red-500/15 dark:bg-red-500/20"
            : "bg-green-500/15 dark:bg-green-500/20"
        )}
        style={{ width: widthPercent }}
      />

      <span
        className={cn(
          colStyles.price,
          "z-10 font-medium",
          isAsk
            ? "text-red-600 dark:text-red-400"
            : "text-green-600 dark:text-green-400"
        )}
      >
        {priceNum.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </span>

      <span
        className={cn(
          colStyles.amount,
          "z-10 text-muted-foreground opacity-90"
        )}
      >
        {amountNum.toFixed(4)}
      </span>

      <span
        className={cn(
          colStyles.total,
          "z-10 text-muted-foreground opacity-90"
        )}
      >
        {numberParser(total)}
      </span>
    </div>
  );
};