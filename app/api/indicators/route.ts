import { provider } from "@/lib/market";
import { atr14, ema, sma } from "@/lib/indicators";
import { Timeframe } from "@/lib/types";
export async function GET(req:Request){ const u=new URL(req.url); const ticker=u.searchParams.get("ticker"); const tf=(u.searchParams.get("tf") as Timeframe) ?? "D1"; if(!ticker)return Response.json({error:"ticker required"},{status:400}); const o=await provider.ohlc(ticker,tf); if(!o.length) return Response.json({message:"Data unavailable"}); const closes=o.map(x=>x.close); return Response.json({sma50:sma(closes,50),sma200:sma(closes,200),ema20:ema(closes,20),atr14:atr14(o)}); }
