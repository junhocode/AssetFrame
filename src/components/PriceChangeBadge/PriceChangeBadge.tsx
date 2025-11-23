import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { SlidingNumber } from "../ui/shadcn-io/sliding-number";
import { cn } from "@/lib/utils";

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

  let colorClass = "text-neutral-500";
  let Icon = Minus;

  if (isPositive) {
    colorClass = "text-green-500";
    Icon = ArrowUp;
  } else if (isNegative) {
    colorClass = "text-red-500";
    Icon = ArrowDown;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium",
        "font-mono tabular-nums slashed-zero",
        colorClass,
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0" strokeWidth={2.5} />

      <div className="flex items-center">
        <SlidingNumber number={Math.abs(numValue)} decimalPlaces={2} />
        <span>%</span>
      </div>
    </div>
  );
};
