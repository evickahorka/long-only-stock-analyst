import { provider } from "@/lib/market";
import { atr14, sma } from "@/lib/indicators";
import { calcFibZones, calcTpZones } from "@/lib/fib";
import { pivotHigh, pivotLow } from "@/lib/pivots";
import { fundamentalsScore, sentimentScore } from "@/lib/scoring";

export async function GET(req:Request){
  const ticker=new URL(req.url).searchParams.get("ticker");
  if(!ticker) return Response.json({error:"ticker required"},{status:400});
  const [d1,w1,f] = await Promise.all([provider.ohlc(ticker,"D1"),provider.ohlc(ticker,"W1"),provider.fundamentals(ticker)]);
  if(!d1.length || !w1.length) return Response.json({message:"Data unavailable"});
  const wc=w1.map(x=>x.close); const s50=sma(wc,50); const s200=sma(wc,200); const i=wc.length-1;
  const weeklyUptrend = wc[i] > s200[i] && s50[i] > s200[i] && s200[i] > s200[Math.max(0,i-10)];
  const lows=pivotLow(d1); const highs=pivotHigh(d1); const li=lows[lows.length-1] ?? 0; const hi=highs[highs.length-1] ?? d1.length-1;
  const atr=atr14(d1).at(-1) ?? 0; const low=d1[li]?.low ?? d1[0].low; const high=d1[hi]?.high ?? d1.at(-1)!.high;
  const settings={atrMultiplier:0.2,percentBuffer:0.3};
  const fundamentals = fundamentalsScore(f);
  const sentiment = sentimentScore(50, null);
  return Response.json({ticker,weeklyUptrend,swing:{low,high},fib:calcFibZones(low,high,atr,settings),tp:calcTpZones(low,high,atr,settings),fundamentals,sentiment,considerSell:false,policy:"LONG-ONLY, manual decisions only"});
}
