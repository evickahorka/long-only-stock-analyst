export type Timeframe = "D1" | "W1";
export type OHLC = { time: string; open: number; high: number; low: number; close: number; volume?: number };
export type SentimentState = "POS" | "NEU" | "NEG" | "unknown";
