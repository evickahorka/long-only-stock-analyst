import { prisma } from "@/lib/prisma";
export default async function Portfolio(){ const tx=await prisma.transaction.findMany(); return <div className="card"><h1>Portfolio</h1>{tx.length?tx.map(t=><div key={t.id}>{t.ticker} {t.qty}@{t.price}</div>):"No transactions"}</div>; }
