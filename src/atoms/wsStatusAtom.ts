import { atom } from "jotai";

type WsStatus = "connecting" | "connected" | "error";

export const wsAtom = atom({
  orderBook: "connecting" as WsStatus,
  trade: "connecting" as WsStatus,
  kline: "connecting" as WsStatus,
});

export const wsStatusAtom = atom((get) => {
  const ws = get(wsAtom);
  const values = Object.values(ws);
  
  if (values.every((s) => s === "connected")) return "connected";
  if (values.some((s) => s === "error")) return "error";
  return "connecting";
});