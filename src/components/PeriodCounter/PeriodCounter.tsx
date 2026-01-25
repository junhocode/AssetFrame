import { Counter } from "@/components/ui/counter";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { PeriodCounterProps } from "@/types/selector.type";
import * as S from "./PeriodCounter.styles";

export const PeriodCounter = ({
  period,
  setPeriod,
  isDisabled,
}: PeriodCounterProps) => {
  return (
    <div className={S.wrapper}>
      {isDisabled ? (
        <HoverCard openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Counter
              number={period}
              setNumber={setPeriod}
              disabled={isDisabled}
              min={1}
              max={60}
              className={S.counter}
            />
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <div>
              <span className={S.disabledMessage}>
                Period can be chosen after one or more indicator is activated.
              </span>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Counter
          number={period}
          setNumber={setPeriod}
          disabled={isDisabled}
          min={1}
          max={60}
        />
      )}
    </div>
  );
};