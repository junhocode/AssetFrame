export const container =
  "flex w-full h-full flex-col bg-card font-mono text-xs rounded-md overflow-hidden";

export const loadingContainer = 
  "flex h-full items-center justify-center text-xs text-muted-foreground font-mono";

export const errorContainer = 
  "flex h-full items-center justify-center text-xs text-destructive font-mono";

export const asksWrapper =
  "flex flex-1 flex-col justify-end min-h-0 pb-1 overflow-hidden";

export const bidsWrapper =
  "flex flex-1 flex-col pt-1 min-h-0 overflow-hidden";

export const headerRow = 
  "flex w-full px-3 text-[#848E9C] text-xs font-semibold items-center";

export const colPrice = 
  "w-[30%] shrink-0 text-left truncate";

export const colAmount = 
  "w-[35%] shrink-0 text-right truncate";

export const colTotal = 
  "w-[35%] shrink-0 text-right truncate";

export const middleBar = 
  "shrink-0 border-y border-border py-2 bg-muted/30 flex items-center justify-center z-20";

export const middlePriceWrapper = 
  "flex text-lg font-bold text-yellow-600 dark:text-yellow-300 items-center";

export const dollarSign = 
  "mr-1";

export const rowContainer = 
  "relative flex w-full h-[25px] shrink-0 cursor-pointer items-center px-3 hover:bg-muted/50";

export const rowBgBase = 
  "absolute right-0 top-0 bottom-0 z-0 transition-all duration-300";

export const rowBgAsk = 
  "bg-red-500/15 dark:bg-red-500/20";

export const rowBgBid = 
  "bg-green-500/15 dark:bg-green-500/20";

export const rowTextBase = 
  "z-10 font-medium";

export const rowTextAsk = 
  "text-red-600 dark:text-red-400";

export const rowTextBid = 
  "text-green-600 dark:text-green-400";

export const rowTextSecondary = 
  "z-10 text-muted-foreground opacity-90";