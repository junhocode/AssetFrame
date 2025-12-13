import { useMemo, useRef } from "react"; 
import { SlidingNumber } from "@/components/ui/sliding-number";
import { useRealtimeOrderBook } from "@/hooks/useRealTimeOrderBookData";
import { useOrderBookQuery } from "@/queries/useOrderBookQuery";
import { cn } from "@/lib/utils";
import { parseNumber } from "@/utils/parseNumber";
import type { OrderBookRowProps } from "@/types/orderBook.type";
import { useFitRows } from "@/hooks/useFitRows";
import * as S from "./OrderBook.styles";

const ROW_HEIGHT = 25;

const OrderBookRow = ({ price, amount, maxQty, type }: OrderBookRowProps) => {
  const priceNum = parseFloat(price);
  const amountNum = parseFloat(amount);
  const total = priceNum * amountNum;

  const widthPercent = `${Math.min((amountNum / maxQty) * 100, 100)}%`;
  const isAsk = type === "ask";

  return (
    <div className={S.rowContainer}>
      <div
        className={cn(S.rowBgBase, isAsk ? S.rowBgAsk : S.rowBgBid)}
        style={{ width: widthPercent }}
      />
      <span
        className={cn(
          S.colPrice,
          S.rowTextBase,
          isAsk ? S.rowTextAsk : S.rowTextBid
        )}
      >
        {priceNum.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
      <span className={cn(S.colAmount, S.rowTextSecondary)}>
        {amountNum.toFixed(4)}
      </span>
      <span className={cn(S.colTotal, S.rowTextSecondary)}>
        {parseNumber(total)}
      </span>
    </div>
  );
};

export const OrderBook = ({ symbol }: { symbol: string }) => {
  const { data, isLoading } = useOrderBookQuery(symbol);
  
  const asksRef = useRef<HTMLDivElement>(null);
  const bidsRef = useRef<HTMLDivElement>(null);

  const asksCount = useFitRows(asksRef, ROW_HEIGHT);
  const bidsCount = useFitRows(bidsRef, ROW_HEIGHT);

  useRealtimeOrderBook(symbol);

  const maxQuantity = useMemo(() => {
    if (!data) return 0;
    const maxBid = Math.max(...data.bids.map(([, qty]) => parseFloat(qty)));
    const maxAsk = Math.max(...data.asks.map(([, qty]) => parseFloat(qty)));
    return Math.max(maxBid, maxAsk);
  }, [data]);

  const displayAsks = useMemo(() => {
    const originalAsks = data?.asks || [];
    return originalAsks.slice(0, Math.max(0, asksCount));
  }, [data?.asks, asksCount]);

  const displayBids = useMemo(() => {
    const originalBids = data?.bids || [];
    return originalBids.slice(0, Math.max(0, bidsCount));
  }, [data?.bids, bidsCount]);

  if (isLoading) {
    return <div className={S.loadingContainer}>Loading...</div>;
  }

  if (!data) {
    return <div className={S.errorContainer}>Failed to load</div>;
  }

  return (
    <div className={S.container}>
      <div className={S.headerRow}>
        <span className={S.colPrice}>Price(USDT)</span>
        <span className={S.colAmount}>Amount</span>
        <span className={S.colTotal}>Total</span>
      </div>

      <div ref={asksRef} className={S.asksWrapper}>
        {displayAsks.map((ask) => (
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
            number={parseFloat(data.bids[0]?.[0] || "0")} 
            decimalPlaces={2}
          />
        </span>
      </div>

      {/* Bids (매수) - Ref 연결 필수 */}
      <div ref={bidsRef} className={S.bidsWrapper}>
        {displayBids.map((bid) => (
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