import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatDuration,
  lowestPrice,
  primaryDuration,
  primaryVariationId,
  groupServices,
  type ServiceVariation,
  type SquareService,
} from "./square";

function makeVariation(overrides: Partial<ServiceVariation> = {}): ServiceVariation {
  return {
    id: "var-1",
    name: "Variation",
    priceCents: null,
    durationMs: null,
    availableForBooking: false,
    ...overrides,
  };
}

function makeService(overrides: Partial<SquareService> = {}): SquareService {
  return {
    id: "svc-1",
    name: "Service",
    description: "",
    categoryId: null,
    categoryName: "",
    variations: [],
    ...overrides,
  };
}

describe("formatPrice", () => {
  it("returns 'Ask us' for null", () => {
    expect(formatPrice(null)).toBe("Ask us");
  });

  it("drops trailing .00 for whole dollars", () => {
    expect(formatPrice(2500)).toBe("$25");
  });

  it("keeps cents for non-whole dollars", () => {
    expect(formatPrice(2550)).toBe("$25.50");
  });

  it("formats 0 as $0", () => {
    expect(formatPrice(0)).toBe("$0");
  });
});

describe("formatDuration", () => {
  it("returns '' for null", () => {
    expect(formatDuration(null)).toBe("");
  });

  it("formats 30 minutes", () => {
    expect(formatDuration(1_800_000)).toBe("30 min");
  });

  it("formats exactly 1 hour", () => {
    expect(formatDuration(3_600_000)).toBe("1 hr");
  });

  it("formats 1 hr 30 min", () => {
    expect(formatDuration(5_400_000)).toBe("1 hr 30 min");
  });
});

describe("lowestPrice", () => {
  it("returns null for an empty array", () => {
    expect(lowestPrice([])).toBeNull();
  });

  it("returns null when all prices are null", () => {
    expect(lowestPrice([makeVariation(), makeVariation()])).toBeNull();
  });

  it("returns the lowest non-null price among mixed null/non-null", () => {
    const variations = [
      makeVariation({ priceCents: null }),
      makeVariation({ priceCents: 5000 }),
      makeVariation({ priceCents: 2500 }),
    ];
    expect(lowestPrice(variations)).toBe(2500);
  });
});

describe("primaryVariationId / primaryDuration", () => {
  it("return null for both on an empty array", () => {
    expect(primaryVariationId([])).toBeNull();
    expect(primaryDuration([])).toBeNull();
  });

  it("prefer the first availableForBooking variation", () => {
    const variations = [
      makeVariation({ id: "a", durationMs: 1000, availableForBooking: false }),
      makeVariation({ id: "b", durationMs: 2000, availableForBooking: true }),
      makeVariation({ id: "c", durationMs: 3000, availableForBooking: true }),
    ];
    expect(primaryVariationId(variations)).toBe("b");
    expect(primaryDuration(variations)).toBe(2000);
  });

  it("fall back to the first variation when none are availableForBooking", () => {
    const variations = [
      makeVariation({ id: "a", durationMs: 1000, availableForBooking: false }),
      makeVariation({ id: "b", durationMs: 2000, availableForBooking: false }),
    ];
    expect(primaryVariationId(variations)).toBe("a");
    expect(primaryDuration(variations)).toBe(1000);
  });
});

describe("groupServices", () => {
  it("buckets a brow category into brow", () => {
    const svc = makeService({ categoryName: "Eyebrow Shaping" });
    expect(groupServices([svc])).toEqual({ brow: [svc], lash: [], extras: [] });
  });

  it("buckets a lash category into lash", () => {
    const svc = makeService({ categoryName: "Lash Fill" });
    expect(groupServices([svc])).toEqual({ brow: [], lash: [svc], extras: [] });
  });

  it("buckets a non-matching category into extras", () => {
    const svc = makeService({ categoryName: "Facials" });
    expect(groupServices([svc])).toEqual({ brow: [], lash: [], extras: [svc] });
  });

  it("falls back to the service name when categoryName is empty", () => {
    const svc = makeService({ categoryName: "", name: "Microblade touch-up" });
    expect(groupServices([svc])).toEqual({ brow: [svc], lash: [], extras: [] });
  });
});
