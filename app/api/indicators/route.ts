import { provider } from "@/lib/market";

export async function GET(req: Request) {
  const ticker = new URL(req.url).searchParams.get("ticker");
  const tf = new URL(req.url).searchParams.get("tf") ?? "D1";

  if (!ticker) {
    return Response.json({ error: "ticker required" }, { status: 400 });
  }

  const data = await provider.indicators(ticker, tf);

  if (!data || !Object.keys(data).length) {
    return Response.json({ message: "Data unavailable" });
  }

  return Response.json(data);
}
