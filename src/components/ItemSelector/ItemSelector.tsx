import { NativeSelect, NativeSelectOption } from "../ui/native-select"

export function ItemSelector() {
  return (
    <NativeSelect>
      <NativeSelectOption value="BTCUSDT">종목을 선택해 주세요.</NativeSelectOption>
      <NativeSelectOption value="BTCUSDT">Bitcoin</NativeSelectOption>
      <NativeSelectOption value="ETHUSDT">Ethereum</NativeSelectOption>
    </NativeSelect>
  )
}
