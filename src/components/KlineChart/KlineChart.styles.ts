import { CrosshairMode } from "lightweight-charts";

export const chartOptions = (isDark: boolean) => {
  return(
    isDark ? {
      height: 600,
      width: 1200,
      crosshair: {
          mode: CrosshairMode.Normal,
        },
      layout: {
        background: { color: "#171717" },
        textColor: "#D4D4D4",
      },
      grid: {
        vertLines: { color: "#262626" },
        horzLines: { color: "#262626" },
      },
      rightPriceScale: { borderColor: "#404040" },
      timeScale: { borderColor: "#404040" },
      watermark: {
        color: "rgba(255, 255, 255, 0.1)",
        visible: true,
        text: "junhocode",
        fontSize: 24,
      },
    } : {
      height: 600,
      width: 1200,
      crosshair: {
          mode: CrosshairMode.Normal,
        },
        layout: {
          background: { color: "#FFFFFF" },
          textColor: "#191919",
        },
        grid: {
          vertLines: { color: "rgba(197, 203, 206, 0.2)" },
          horzLines: { color: "rgba(197, 203, 206, 0.2)" },
        },
        rightPriceScale: { borderColor: "rgba(197, 203, 206, 0.8)" },
        timeScale: { borderColor: "rgba(197, 203, 206, 0.8)" },
        watermark: {
          color: "rgba(197, 203, 206, 0.5)",
          visible: true,
          text: "junhocode",
          fontSize: 24,
        },
    }
  )  
};

export const statusContainer = "flex items-center justify-center";

export const errorContainer = `${statusContainer} text-red-500`;

export const chart =
  "relative w-full h-full rounded-lg overflow-hidden shadow-lg";