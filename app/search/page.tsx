"use client";
import { useState } from "react";
export default function SearchPage(){ const [q,setQ]=useState("AAPL"); const [rows,setRows]=useState<any[]>([]);
return <div className="card space-y-2"><h1>Search</h1><input className="bg-slate-800 p-2" value={q} onChange={e=>setQ(e.target.value)} /><button className="px-3 py-1 bg-blue-600" onClick={async()=>setRows(await (await fetch(`/api/market/search?q=${q}`)).json())}>Search</button>{rows.map(r=><div key={r.ticker}><a href={`/stock/${r.ticker}`}>{r.ticker} - {r.name}</a></div>)}</div>; }
