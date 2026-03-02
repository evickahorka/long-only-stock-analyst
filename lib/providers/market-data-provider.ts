import { OHLC, Timeframe } from "@/lib/types";

export interface MarketDataProvider {
  search(q: string): Promise<Array<{ ticker: string; name: string }>>;
  ohlc(ticker: string, tf: Timeframe): Promise<OHLC[]>;
  fundamentals(ticker: string): Promise<Record<string, number | null>>;
}
