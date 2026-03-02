import { describe, expect, it } from "vitest";
import { pivotLow } from "@/lib/pivots";

describe("pivot detection", () => {
  it("finds a pivot low", () => {
    const ohlc = Array.from({ length: 15 }, (_, i) => ({ time: `${i}`, open: 10, high: 12, low: i === 7 ? 1 : 5 + Math.abs(7 - i), close: 10 }));
    const pivots = pivotLow(ohlc, 3, 3);
    expect(pivots).toContain(7);
  });
});
