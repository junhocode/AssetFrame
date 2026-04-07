import { useMemo } from "react";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { OrderBookRow } from "@/components/OrderBook/OrderBookRow/OrderBookRow";
import { useOrderBookQuery } from "@/queries/useOrderBookQuery";
import { useOrderBook } from "@/ws/useOrderBook";
import * as S from "./OrderBook.styles";

export const OrderBook = ({ symbol }: { symbol: string }) => {
  const { data, isLoading } = useOrderBookQuery(symbol);
  useOrderBook(symbol);

  const maxQuantity = useMemo(() => {
    if (!data) return 0;
    const quantities = [
      ...data.bids.map(([, qty]) => parseFloat(qty)),
      ...data.asks.map(([, qty]) => parseFloat(qty)),
    ];
    return quantities.length > 0 ? Math.max(...quantities) : 0;
  }, [data]);

  if (isLoading) {
    return <div className={S.loadingContainer}>Loading...</div>;
  }

  if (!data) {
    return <div className={S.errorContainer}>Failed to load</div>;
  }

  const { asks, bids } = data;

  return (
    <div className={S.container}>
      <div className={S.headerRow}>
        <span className={S.colPrice}>Price(USDT)</span>
        <span className={S.colAmount}>Amount</span>
        <span className={S.colTotal}>Total</span>
      </div>

      <div className={S.asksWrapper}>
        {asks.map(([price, amount]) => (
          <OrderBookRow
            key={price}
            price={price}
            amount={amount}
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
        {bids.map(([price, amount]) => (
          <OrderBookRow
            key={price}
            price={price}
            amount={amount}
            maxQty={maxQuantity}
            type="bid"
          />
        ))}
      </div>
    </div>
  );
};