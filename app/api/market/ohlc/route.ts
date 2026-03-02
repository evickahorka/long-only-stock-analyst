import { provider } from "@/lib/market";
import { Timeframe } from "@/lib/types";
export async function GET(req:Request){ const u=new URL(req.url); const ticker=u.searchParams.get("ticker"); const tf=(u.searchParams.get("tf") as Timeframe) ?? "D1"; if(!ticker) return Response.json({error:"ticker required"},{status:400}); const data=await provider.ohlc(ticker,tf); return Response.json(data.length?data:{message:"Data unavailable"}); }
