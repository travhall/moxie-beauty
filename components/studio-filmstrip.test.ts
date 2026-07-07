import { describe, expect, it } from "vitest";
import { computeScrollEdges } from "./studio-filmstrip";

describe("computeScrollEdges", () => {
  it("reports atStart when scrollLeft is at 0", () => {
    expect(computeScrollEdges(0, 1000, 300)).toEqual({ atStart: true, atEnd: false });
  });

  it("reports atStart within the edge threshold", () => {
    expect(computeScrollEdges(3, 1000, 300)).toEqual({ atStart: true, atEnd: false });
  });

  it("reports atEnd when scrolled to the far right", () => {
    expect(computeScrollEdges(700, 1000, 300)).toEqual({ atStart: false, atEnd: true });
  });

  it("reports neither atStart nor atEnd in the middle", () => {
    expect(computeScrollEdges(350, 1000, 300)).toEqual({ atStart: false, atEnd: false });
  });

  it("reports both atStart and atEnd when content doesn't overflow", () => {
    expect(computeScrollEdges(0, 300, 300)).toEqual({ atStart: true, atEnd: true });
  });
});
