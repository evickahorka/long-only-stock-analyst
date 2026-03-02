import { calcFibZones, calcTpZones } from "@/lib/fib";
export async function POST(req:Request){ const b=await req.json(); const {low,high,atr,settings}=b; return Response.json({fib:calcFibZones(low,high,atr,settings),tp:calcTpZones(low,high,atr,settings)}); }
