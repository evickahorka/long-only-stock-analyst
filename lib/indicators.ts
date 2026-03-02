import { OHLC } from "./types";

export const sma = (v: number[], p: number) => v.map((_, i) => i + 1 < p ? NaN : v.slice(i - p + 1, i + 1).reduce((a,b)=>a+b,0)/p);
export const ema = (v: number[], p: number) => { const k=2/(p+1); let prev=v[0] ?? 0; return v.map((x,i)=> i===0?x:(prev=(x*k+prev*(1-k)))); };
export const atr14 = (ohlc: OHLC[]) => {
  const tr = ohlc.map((c,i)=> i===0? c.high-c.low : Math.max(c.high-c.low, Math.abs(c.high-ohlc[i-1].close), Math.abs(c.low-ohlc[i-1].close)));
  return ema(tr,14);
};
