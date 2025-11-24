import { useMemo } from "react";
import { useRealtimeOrderBook } from "@/hooks/useRealTimeOrderBookData";
import { cn } from "@/lib/utils";
import { useOrderBookQuery } from "@/queries/useOrderBookQuery";
import { numberParser } from "@/utils/numberParser";
import { SlidingNumber } from "../ui/shadcn-io/sliding-number";
import * as S from "./OrderBook.styles";

interface OrderBookProps {
  symbol: string;
}

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
      <div className={S.loadingContainer}>
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className={S.errorContainer}>
        Failed to load
      </div>
    );
  }

  return (
    <div className={S.container}>
      <div className={S.headerRow}>
          <span className={S.colPrice}>Price(USDT)</span>
          <span className={S.colAmount}>Amount</span>
          <span className={S.colTotal}>Total</span>
        </div>
      <div className={S.asksWrapper}>
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

      <div className={S.middleBar}>
        <span className={S.middlePriceWrapper}>
          <span className={S.dollarSign}>$</span>
          <SlidingNumber
            number={parseFloat(bids[0]?.[0] || "0")}
            decimalPlaces={2}
          />
        </span>
      </div>

      <div className={S.bidsWrapper}>
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
    <div className={S.rowContainer}>
      <div
        className={cn(
          S.rowBgBase,
          isAsk ? S.rowBgAsk : S.rowBgBid
        )}
        style={{ width: widthPercent }}
      />

      <span
        className={cn(
          S.colPrice,
          S.rowTextBase,
          isAsk ? S.rowTextAsk : S.rowTextBid
        )}
      >
        {priceNum.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </span>

      <span
        className={cn(
          S.colAmount,
          S.rowTextSecondary
        )}
      >
        {amountNum.toFixed(4)}
      </span>

      <span
        className={cn(
          S.colTotal,
          S.rowTextSecondary
        )}
      >
        {numberParser(total)}
      </span>
    </div>
  );
};