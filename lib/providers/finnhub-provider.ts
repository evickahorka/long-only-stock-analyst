import { MarketDataProvider } from "./market-data-provider";
import { OHLC, Timeframe } from "@/lib/types";

const token = process.env.FINNHUB_API_KEY;
async function j(url:string){ const r=await fetch(url,{next:{revalidate:900}}); if(!r.ok) throw new Error("Data unavailable"); return r.json(); }
export class FinnhubProvider implements MarketDataProvider {
  async search(q:string){ if(!token) return []; const d=await j(`https://finnhub.io/api/v1/search?q=${q}&token=${token}`); return (d.result??[]).slice(0,10).map((x:any)=>({ticker:x.symbol,name:x.description})); }
  async ohlc(ticker:string, tf:Timeframe): Promise<OHLC[]> {
    if(!token) return [];
    const now=Math.floor(Date.now()/1000); const from= now - (tf==="D1"?3600*24*365:3600*24*365*6); const res=tf==="D1"?"D":"W";
    const d=await j(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${res}&from=${from}&to=${now}&token=${token}`);
    if(d.s!=="ok") return [];
    return d.t.map((t:number,i:number)=>({time:new Date(t*1000).toISOString().slice(0,10),open:d.o[i],high:d.h[i],low:d.l[i],close:d.c[i],volume:d.v[i]}));
  }
  async fundamentals(ticker:string){ if(!token) return {}; const d=await j(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${token}`); const m=d.metric??{}; return {
    revenueYoY: m.revenueGrowthTTMYoy ?? null, revenue3Y: m.revenueGrowth3Y ?? null, epsYoY: m.epsGrowthTTMYoy ?? null, eps3Y: m.epsGrowth3Y ?? null,
    marginsTrend: m.netMargin ?? null, fcf: m['freeCashFlowTTM'] ? 70 : null, leverage: m.totalDebtToEquityAnnual ? Math.max(0,100-m.totalDebtToEquityAnnual) : null,
    roe: m.roeTTM ?? null, roic: m.roicTTM ?? null, dividend: m.dividendYieldIndicatedAnnual ?? null
  }; }
}
