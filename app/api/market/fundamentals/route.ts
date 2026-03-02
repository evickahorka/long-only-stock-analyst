import { provider } from "@/lib/market";
import { fundamentalsScore } from "@/lib/scoring";
export async function GET(req:Request){ const ticker=new URL(req.url).searchParams.get("ticker"); if(!ticker) return Response.json({error:"ticker required"},{status:400}); const metrics=await provider.fundamentals(ticker); if(!Object.keys(metrics).length) return Response.json({message:"Data unavailable"}); return Response.json({metrics,...fundamentalsScore(metrics)}); }
