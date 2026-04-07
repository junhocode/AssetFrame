import { Counter } from "@/components/ui/counter";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { PeriodCounterProps } from "@/types/selector.type";
import * as S from "./PeriodCounter.styles";

export const PeriodCounter = ({
  period,
  setPeriod,
  isDisabled,
}: PeriodCounterProps) => {
  const counter = (
    <Counter
      number={period}
      setNumber={setPeriod}
      disabled={isDisabled}
      min={1}
      max={60}
      className={isDisabled ? S.counter : undefined}
    />
  );

  return (
    <div className={S.wrapper}>
      {isDisabled ? (
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>{counter}</HoverCardTrigger>
          <HoverCardContent side="top">
            <span className={S.disabledMessage}>
              Period can be chosen after at least one indicator is activated.
            </span>
          </HoverCardContent>
        </HoverCard>
      ) : (
        counter
      )}
    </div>
  );
};