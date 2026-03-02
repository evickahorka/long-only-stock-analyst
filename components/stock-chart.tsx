"use client";
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export function StockChart({ data, fib }: { data: any[]; fib: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !data.length) return;
    ref.current.innerHTML = "";
    const chart = createChart(ref.current, { height: 320, layout: { background: { color: "#0f172a" }, textColor: "#e2e8f0" } });
    const c = chart.addCandlestickSeries();
    c.setData(data.map((d) => ({ time: d.time, open: d.open, high: d.high, low: d.low, close: d.close })));
    fib.forEach((f) => { const l = chart.addLineSeries({ color: "#22d3ee" }); l.setData(data.map((d) => ({ time: d.time, value: f.price }))); });
    chart.timeScale().fitContent();
  }, [data, fib]);
  return <div ref={ref} />;
}
