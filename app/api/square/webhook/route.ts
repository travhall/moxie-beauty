/**
 * Square Webhook Handler
 *
 * Listens for Square catalog events and revalidates the services cache
 * so the site reflects catalog changes without waiting for the 1-hour ISR TTL.
 *
 * Setup (one-time, per environment):
 *   1. Square Developer Portal → your app → Webhooks → Add endpoint
 *   2. URL: https://moxiebeautystudiowi.com/api/square/webhook
 *   3. Events: catalog.version.updated
 *   4. Copy the generated Signature Key
 *   5. Add to Vercel: SQUARE_WEBHOOK_SIGNATURE_KEY=<key>
 */

import { createHmac, timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// ── Signature validation ──────────────────────────────────────────────────────
// Square signs each request with HMAC-SHA256(key, notificationUrl + body).

function isValidSignature(
  rawBody: string,
  signature: string,
  notificationUrl: string,
  key: string
): boolean {
  try {
    const hmac = createHmac("sha256", key);
    hmac.update(notificationUrl + rawBody);
    const expected = hmac.digest("base64");
    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const webhookKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

  // If no key is configured, log a warning but return 200 so Square stops retrying.
  // Configure SQUARE_WEBHOOK_SIGNATURE_KEY in Vercel to enable full validation.
  if (!webhookKey) {
    console.warn(
      "[square/webhook] SQUARE_WEBHOOK_SIGNATURE_KEY is not set — " +
      "skipping signature validation. Set this env var to enable secure webhooks."
    );
    return NextResponse.json({ ok: true, warning: "signature validation disabled" });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";

  if (!signature) {
    return NextResponse.json({ error: "Missing signature header" }, { status: 401 });
  }

  if (!isValidSignature(rawBody, signature, request.url, webhookKey)) {
    console.warn("[square/webhook] Invalid signature — request rejected");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // Parse event
  let event: { type?: string };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Revalidate services cache when the catalog changes
  if (event.type === "catalog.version.updated") {
    revalidateTag("square-services", "default");
    console.log("[square/webhook] catalog.version.updated — revalidated square-services");
  }

  return NextResponse.json({ ok: true });
}
