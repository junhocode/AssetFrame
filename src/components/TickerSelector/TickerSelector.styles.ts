import { cn } from "@/lib/utils";

export const combobox =
  "w-[200px] flex items-center dark:hover:border-yellow-300 justify-between hover:border hover:border-yellow-600 hover:dark:border-yellow-300";

export const errorCombobox = "w-[200px] text-red-600";

export const chevronIcon = "pl-1 h-4 w-4 shrink-0 opacity-50";

export const popoverContent = "w-[200px] p-0";

export const scrollArea = "max-h-[300px] overflow-y-auto overflow-x-hidden";

export const tickerRow = "flex items-center";

export const logoIcon = "w-5 h-5 mr-2 rounded-full shrink-0";

export const tickerName = "grow mr-2";

export const checkIcon = (isSelected: boolean) =>
  cn("h-4 w-4 ml-1 shrink-0", isSelected ? "opacity-100" : "opacity-0");