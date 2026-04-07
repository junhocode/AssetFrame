import { MultiSelect } from "../ui/multi-select";
import { INDICATORS } from "@/constants/whiteList";
import { useIndicators } from "@/hooks/useIndicators";
import type { IndicatorSelectorProps } from "@/types/selector.type";
import * as S from "./IndicatorSelector.styles";

export const IndicatorSelector = ({
  candlestickData,
  period,
  onIndicatorChange,
}: IndicatorSelectorProps) => {
  const { selectedValues, handleSelectionChange } = useIndicators(
    candlestickData,
    period,
    onIndicatorChange
  );

  return (
    <div className={S.multiSelectorContainer}>
      <MultiSelect
        options={INDICATORS}
        onValueChange={handleSelectionChange}
        value={selectedValues}
        placeholder="Select an indicator.."
        className={S.multiSelector}
        maxCount={1}
        maxWidth="1"
      />
    </div>
  );
};