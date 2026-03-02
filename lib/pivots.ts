import { OHLC } from "./types";

export function pivotLow(ohlc: OHLC[], left=5,right=5){
  const out:number[]=[];
  for(let i=left;i<ohlc.length-right;i++){
    const low=ohlc[i].low;
    const ok=[...ohlc.slice(i-left,i),...ohlc.slice(i+1,i+right+1)].every(c=>c.low>low);
    if(ok) out.push(i);
  }
  return out;
}
export function pivotHigh(ohlc: OHLC[], left=5,right=5){
  const out:number[]=[];
  for(let i=left;i<ohlc.length-right;i++){
    const high=ohlc[i].high;
    const ok=[...ohlc.slice(i-left,i),...ohlc.slice(i+1,i+right+1)].every(c=>c.high<high);
    if(ok) out.push(i);
  }
  return out;
}
