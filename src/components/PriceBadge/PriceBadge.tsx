import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { cn } from "@/lib/utils";
import type { PriceBadgeProps } from "@/types/selector.type";
import * as S from "./PriceBadge.styles";

const getVariant = (value: number) => {
  if (value > 0) return { color: S.positiveColor, Icon: ArrowUp };
  if (value < 0) return { color: S.negativeColor, Icon: ArrowDown };
  return { color: S.neutralColor, Icon: Minus };
};

export const PriceBadge = ({ value, className }: PriceBadgeProps) => {
  const numValue = Number(value);
  const { color, Icon } = getVariant(numValue);

  return (
    <div className={cn(S.container, color, className)}>
      <Icon className={S.icon} strokeWidth={2.5} />
      <div className={S.valueWrapper}>
        <SlidingNumber number={Math.abs(numValue)} decimalPlaces={2} />
        <span>%</span>
      </div>
    </div>
  );
};