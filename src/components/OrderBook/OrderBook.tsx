import { useMemo } from "react";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { OrderBookRow } from "@/components/OrderBook/OrderBookRow/OrderBookRow";
import { useOrderBookQuery } from "@/queries/useOrderBookQuery";
import * as S from "./OrderBook.styles";
import { useOrderBook } from "@/ws/useOrderBook";

export const OrderBook = ({ symbol }: { symbol: string }) => {
  const { data, isLoading } = useOrderBookQuery(symbol);

  useOrderBook(symbol);

  const maxQuantity = useMemo(() => {
    if (!data) return 0;
    const maxBid = Math.max(...data.bids.map(([, qty]) => parseFloat(qty)));
    const maxAsk = Math.max(...data.asks.map(([, qty]) => parseFloat(qty)));
    return Math.max(maxBid, maxAsk);
  }, [data]);

  const asks = data?.asks || [];

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