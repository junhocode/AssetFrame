import { CrosshairMode } from "lightweight-charts";

export const chartOptions = {
  height: 600,
  width: 600,
  layout: {
    backgroundColor: "#1e1e1e",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
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
};

export const statusContainer = 'w-[900px] h-[600px] flex items-center justify-center bg-[#1e1e1e] text-white';

export const errorContainer = `${statusContainer} text-red-500`;