import { atom } from 'jotai';

export const wsOrderBookAtom = atom(false);
export const wsTradeAtom = atom(false);
export const wsKlineAtom = atom(false);

export const wsStatusAtom = atom((get) => {
  const isOrderBookReady = get(wsOrderBookAtom);
  const isTradeReady = get(wsTradeAtom);
  const isKlineReady = get(wsKlineAtom);
  
  return isOrderBookReady && isTradeReady && isKlineReady;
});