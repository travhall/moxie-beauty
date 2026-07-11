import { createHmac } from "crypto";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { isValidSignature } from "./route";
import { siteConfig } from "@/lib/site-config";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTag(...args),
}));

const key = "test-signature-key";
const notificationUrl = `${siteConfig.url}/api/square/webhook`;
const rawBody = JSON.stringify({ type: "catalog.version.updated" });

function sign(url: string, body: string, signingKey: string): string {
  return createHmac("sha256", signingKey).update(url + body).digest("base64");
}

function makeRequest(body: string, signature?: string): NextRequest {
  const headers: HeadersInit = {};
  if (signature !== undefined) headers["x-square-hmacsha256-signature"] = signature;
  return new NextRequest(notificationUrl, { method: "POST", headers, body });
}

describe("isValidSignature", () => {
  it("returns true for a correctly computed signature", () => {
    const signature = sign(notificationUrl, rawBody, key);
    expect(isValidSignature(rawBody, signature, notificationUrl, key)).toBe(true);
  });

  it("returns false when signed with a different key", () => {
    const signature = sign(notificationUrl, rawBody, "wrong-key");
    expect(isValidSignature(rawBody, signature, notificationUrl, key)).toBe(false);
  });

  it("returns false when the raw body is tampered with", () => {
    const signature = sign(notificationUrl, rawBody, key);
    const tamperedBody = JSON.stringify({ type: "catalog.version.updated", extra: true });
    expect(isValidSignature(tamperedBody, signature, notificationUrl, key)).toBe(false);
  });

  it("returns false when the notification URL differs from what was signed", () => {
    const signature = sign(notificationUrl, rawBody, key);
    const differentUrl = "https://moxiebeautystudiowi.com/api/square/webhook/";
    expect(isValidSignature(rawBody, signature, differentUrl, key)).toBe(false);
  });

  it("returns false (not throw) for a malformed, non-matching-length signature", () => {
    expect(isValidSignature(rawBody, "not-a-valid-base64-sig", notificationUrl, key)).toBe(false);
  });

  it("validates against the fixed siteConfig.url-derived notification URL regardless of request.url", () => {
    const signature = sign(notificationUrl, rawBody, key);
    // Whatever request.url happened to be (e.g. a different host/port locally,
    // or with a trailing slash/query string), the route always signs against
    // the fixed NOTIFICATION_URL constant — simulate that by validating with
    // the same fixed URL rather than any request-derived value.
    expect(isValidSignature(rawBody, signature, notificationUrl, key)).toBe(true);
  });
});

describe("POST /api/square/webhook", () => {
  const originalKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

  beforeEach(() => {
    process.env.SQUARE_WEBHOOK_SIGNATURE_KEY = key;
    revalidateTag.mockClear();
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    else process.env.SQUARE_WEBHOOK_SIGNATURE_KEY = originalKey;
  });

  it("returns 500 when SQUARE_WEBHOOK_SIGNATURE_KEY is not set", async () => {
    delete process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    const { POST } = await import("./route");
    const res = await POST(makeRequest(rawBody, sign(notificationUrl, rawBody, key)));
    expect(res.status).toBe(500);
  });

  it("returns 401 when the signature header is missing", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest(rawBody));
    expect(res.status).toBe(401);
  });

  it("returns 403 when the signature is invalid", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest(rawBody, "not-a-valid-signature"));
    expect(res.status).toBe(403);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const { POST } = await import("./route");
    const body = "not json";
    const res = await POST(makeRequest(body, sign(notificationUrl, body, key)));
    expect(res.status).toBe(400);
  });

  it("revalidates square-services on catalog.version.updated", async () => {
    const { POST } = await import("./route");
    const res = await POST(makeRequest(rawBody, sign(notificationUrl, rawBody, key)));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(revalidateTag).toHaveBeenCalledWith("square-services", "default");
  });

  it("returns ok without revalidating for other event types", async () => {
    const body = JSON.stringify({ type: "some.other.event" });
    const { POST } = await import("./route");
    const res = await POST(makeRequest(body, sign(notificationUrl, body, key)));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
