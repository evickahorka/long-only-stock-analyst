import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const watchlist = await prisma.watchlistItem.findMany({ take: 10 });
  const alerts = await prisma.alertEvent.findMany({ orderBy: { createdAt: "desc" }, take: 8 });
  return <div className="grid gap-4 md:grid-cols-2">
    <section className="card"><h2 className="font-semibold mb-2">Watchlist</h2>{watchlist.map(w => <div key={w.id}>{w.ticker}</div>)}</section>
    <section className="card"><h2 className="font-semibold mb-2">Alert feed</h2>{alerts.map(a => <div key={a.id}>{a.type} · {a.ticker}</div>)}</section>
  </div>;
}
