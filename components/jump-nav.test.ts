import { describe, expect, it } from "vitest";
import { pickActiveId } from "./jump-nav";

describe("pickActiveId", () => {
  it("returns the previous id when nothing is intersecting", () => {
    const entries = [
      { id: "a", isIntersecting: false, intersectionRatio: 0 },
      { id: "b", isIntersecting: false, intersectionRatio: 0 },
    ];
    expect(pickActiveId(entries, "a")).toBe("a");
  });

  it("returns null when nothing is intersecting and there was no previous id", () => {
    const entries = [{ id: "a", isIntersecting: false, intersectionRatio: 0 }];
    expect(pickActiveId(entries, null)).toBeNull();
  });

  it("returns the single intersecting entry's id", () => {
    const entries = [
      { id: "a", isIntersecting: false, intersectionRatio: 0 },
      { id: "b", isIntersecting: true, intersectionRatio: 0.6 },
    ];
    expect(pickActiveId(entries, null)).toBe("b");
  });

  it("returns the most-visible entry when multiple are intersecting", () => {
    const entries = [
      { id: "a", isIntersecting: true, intersectionRatio: 0.3 },
      { id: "b", isIntersecting: true, intersectionRatio: 0.9 },
      { id: "c", isIntersecting: true, intersectionRatio: 0.5 },
    ];
    expect(pickActiveId(entries, null)).toBe("b");
  });

  it("keeps the first entry on an exact ratio tie", () => {
    const entries = [
      { id: "a", isIntersecting: true, intersectionRatio: 0.5 },
      { id: "b", isIntersecting: true, intersectionRatio: 0.5 },
    ];
    expect(pickActiveId(entries, null)).toBe("a");
  });
});
