import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import type { SelectorProps } from "@/types/selector.type";

export function IndicatorSelector({ value, onChange }: SelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <NativeSelect value={value} onChange={handleChange}>
        <NativeSelectOption value="">Select an Indicator</NativeSelectOption>
      <NativeSelectOption value="MA20">Moving Average 20</NativeSelectOption>
      <NativeSelectOption value="MA60">Moving Average 60</NativeSelectOption>
    </NativeSelect>
  );
}
