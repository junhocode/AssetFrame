import { CrosshairMode } from "lightweight-charts";

export const chartOptions = {
  height: 600,
  width: 1200,
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.2)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.2)",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  watermark: {
    color: "rgba(197, 203, 206, 0.5)",
    visible: true,
    text: "junhocode",
    fontSize: 24,
  },
};

export const statusContainer = "flex items-center justify-center";

export const errorContainer = `${statusContainer} text-red-500`;

export const chart =
  "relative w-full h-full rounded-lg overflow-hidden shadow-lg";
