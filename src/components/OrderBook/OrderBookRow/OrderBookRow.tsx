import { parseNumber } from "@/utils/parseNumber";
import { cn } from "@/lib/utils";
import type { OrderBookRowProps } from "@/types/orderBook.type";
import * as S from "./OrderBookRow.styles"

export const OrderBookRow = ({ price, amount, maxQty, type }: OrderBookRowProps) => {
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
        {parseNumber(total)}
      </span>
    </div>
  );
};