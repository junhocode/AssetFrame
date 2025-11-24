import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlidingNumber } from "../ui/shadcn-io/sliding-number";
import * as S from "./PriceChangeBadge.styles";

interface PriceChangeBadgeProps {
  value: number | string;
  className?: string;
}

export const PriceChangeBadge = ({
  value,
  className,
}: PriceChangeBadgeProps) => {
  const numValue = Number(value);

  const isPositive = numValue > 0;
  const isNegative = numValue < 0;

  let colorClass = S.neutralColor;
  let Icon = Minus;

  if (isPositive) {
    colorClass = S.positiveColor;
    Icon = ArrowUp;
  } else if (isNegative) {
    colorClass = S.negativeColor;
    Icon = ArrowDown;
  }

  return (
    <div className={cn(S.container, colorClass, className)}>
      <Icon className={S.icon} strokeWidth={2.5} />

      <div className={S.valueWrapper}>
        <SlidingNumber number={Math.abs(numValue)} decimalPlaces={2} />
        <span>%</span>
      </div>
    </div>
  );
};