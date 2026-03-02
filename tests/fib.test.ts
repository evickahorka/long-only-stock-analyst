import { describe, expect, it } from "vitest";
import { calcFibZones } from "@/lib/fib";

describe("fib calc", () => {
  it("returns default retracement levels", () => {
    const z = calcFibZones(100, 200, 5, { atrMultiplier: 0.2, percentBuffer: 0.3 });
    expect(z.map((x) => x.level)).toEqual([0.382, 0.5, 0.618]);
    expect(z[0].zone[0]).toBeLessThan(z[0].price);
  });
});
