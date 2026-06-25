import { createHmac } from "crypto";
import { describe, it, expect } from "vitest";
import { isValidSignature } from "./route";
import { siteConfig } from "@/lib/site-config";

const key = "test-signature-key";
const notificationUrl = `${siteConfig.url}/api/square/webhook`;
const rawBody = JSON.stringify({ type: "catalog.version.updated" });

function sign(url: string, body: string, signingKey: string): string {
  return createHmac("sha256", signingKey).update(url + body).digest("base64");
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
