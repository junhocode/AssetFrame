import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import type { SelectorProps } from "@/types/selector.type"; 

export function TimeScaleSelector({ value, onChange }: SelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <NativeSelect value={value} onChange={handleChange}>
      <NativeSelectOption value="1m">1 minute</NativeSelectOption>
      <NativeSelectOption value="1s">1 second</NativeSelectOption>
    </NativeSelect>
  );
}
