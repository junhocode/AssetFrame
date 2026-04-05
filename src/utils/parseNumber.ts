export const parseNumber = (num: number, decimals: number = 2): string => {
  if (!Number.isFinite(num)) return "N/A";
  if (num === 0) return "0";

  const format = (value: number, suffix: string) =>
    parseFloat(value.toFixed(decimals)) + suffix;

  if (num >= 1_000_000_000) return format(num / 1_000_000_000, "B");
  if (num >= 1_000_000) return format(num / 1_000_000, "M");
  if (num >= 1_000) return format(num / 1_000, "K");

  return num.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
};
