import { StockChart } from "@/components/stock-chart";

export default async function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const snap = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/stock/snapshot?ticker=${ticker}`, { cache: "no-store" }).then(r => r.json());
  const d1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/market/ohlc?ticker=${ticker}&tf=D1`, { cache: "no-store" }).then(r => r.json());
  if (snap.message) return <div className="card">Data unavailable</div>;
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">{ticker}</h1>
    <div className="card">Weekly trend: {snap.weeklyUptrend ? "UPTREND" : "NOT CONFIRMED"}</div>
    <div className="card"><StockChart data={Array.isArray(d1)?d1:[]} fib={snap.fib} /></div>
    <div className="grid md:grid-cols-2 gap-4">
      <section className="card"><h2>Fib Dip Finder</h2>{snap.fib.map((f:any)=><div key={f.level}>{f.level}: {f.zone[0].toFixed(2)} - {f.zone[1].toFixed(2)}</div>)}</section>
      <section className="card"><h2>TP suggestions</h2>{snap.tp.map((t:any)=><div key={t.level}>{t.level}: {t.zone[0].toFixed(2)} - {t.zone[1].toFixed(2)}</div>)}</section>
      <section className="card"><h2>Fundamentals</h2>Score: {snap.fundamentals.score} ({snap.fundamentals.state})</section>
      <section className="card"><h2>Sentiment</h2>Score: {snap.sentiment.score} ({snap.sentiment.state})</section>
      <section className="card"><h2>Action suggestions</h2><p>Long-only. No automatic orders. Consider DCA near fib zones.</p></section>
    </div>
  </div>;
}
