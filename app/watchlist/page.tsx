import { prisma } from "@/lib/prisma";
export default async function Watchlist(){ const rows=await prisma.watchlistItem.findMany(); return <div className="card"><h1>Watchlist</h1>{rows.map(r=><div key={r.id}>{r.ticker}</div>)}</div>; }
