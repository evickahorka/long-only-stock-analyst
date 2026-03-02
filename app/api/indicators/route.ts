import { provider } from "@/lib/market";
import { fundamentalsScore } from "@/lib/scoring";

export async function GET(req: Request) {
  const ticker = new URL(req.url).searchParams.get("ticker");

  if (!ticker) {
    return Response.json({ error: "ticker required" }, { status: 400 });
  }

  const raw = await provider.fundamentals(ticker);

  if (!raw || !Object.keys(raw).length) {
    return Response.json({ message: "Data unavailable" });
  }

  // Normalize undefined -> null (Vercel build fails on undefined for number|null types)
  const metrics = {
    revenueYoY: raw.revenueYoY ?? null,
    revenue3Y: raw.revenue3Y ?? null,
    epsYoY: raw.epsYoY ?? null,
    eps3Y: raw.eps3Y ?? null,
    grossMargin: raw.grossMargin ?? null,
    netMargin: raw.netMargin ?? null,
    fcfMargin: raw.fcfMargin ?? null,
    debtToEquity: raw.debtToEquity ?? null,
  };

  return Response.json({ ...metrics, ...fundamentalsScore(metrics) });
}
