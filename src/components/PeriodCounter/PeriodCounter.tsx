import { Counter } from "../ui/shadcn-io/counter";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

interface PeriodCounterProps {
  period: number;
  setPeriod: (value: number) => void;
  isDisabled: boolean;
}

export const PeriodCounter = ({period, setPeriod, isDisabled}: PeriodCounterProps) => {

  return isDisabled? (
    <HoverCard openDelay={100} closeDelay={50}>
    <HoverCardTrigger asChild>
    <Counter 
        number={period}
        setNumber={setPeriod}
        disabled={isDisabled}
        min={1}
        max={60}
    />
    </HoverCardTrigger>
    <HoverCardContent side="top">
        <div>
        <span className="text-red-400 text-sm">지표 표기 기간은 보조 지표를 선택한 후 조정할 수 있습니다.</span>
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
  )
};
