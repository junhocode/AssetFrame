import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import type { SelectorProps } from "@/types/selector.type";


export function ItemSelector({ value, onChange }: SelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <NativeSelect value={value} onChange={handleChange}>
      <NativeSelectOption value="BTCUSDT">Bitcoin</NativeSelectOption>
      <NativeSelectOption value="ETHUSDT">Ethereum</NativeSelectOption>
    </NativeSelect>
  );
}
