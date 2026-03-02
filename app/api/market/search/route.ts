import { provider } from "@/lib/market";
export async function GET(req: Request){ const q=new URL(req.url).searchParams.get("q") ?? ""; return Response.json(await provider.search(q)); }
