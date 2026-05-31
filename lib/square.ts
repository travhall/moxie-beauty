/**
 * Square API client + service data helpers
 *
 * All Square API calls are server-only (never runs in the browser).
 * BigInt values from the SDK (priceMoney.amount, serviceDuration) are
 * converted to plain numbers before being cached, because unstable_cache
 * serialises via JSON.stringify which cannot handle BigInt.
 */

import { SquareClient, SquareEnvironment } from "square";
import type { CatalogObject } from "square";
import { unstable_cache } from "next/cache";

// ── Client singleton ──────────────────────────────────────────────────────────

function makeClient() {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const env = process.env.SQUARE_ENVIRONMENT;

  if (!token) {
    throw new Error("SQUARE_ACCESS_TOKEN is not set");
  }

  return new SquareClient({
    token,
    environment:
      env === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}

// Lazily initialised once per server process
let _client: ReturnType<typeof makeClient> | null = null;
function getClient() {
  if (!_client) _client = makeClient();
  return _client;
}

// ── Serialisable types (no BigInt) ────────────────────────────────────────────

export interface ServiceVariation {
  id: string;
  name: string;
  /** Price in cents as a plain number, or null if variable / not set */
  priceCents: number | null;
  /** Duration in milliseconds as a plain number, or null if not set */
  durationMs: number | null;
  availableForBooking: boolean;
}

export interface SquareService {
  id: string;
  name: string;
  description: string;
  categoryId: string | null;
  categoryName: string;
  variations: ServiceVariation[];
}

// ── Formatting helpers ────────────────────────────────────────────────────────

/** Format cents to "$X" or "$X.XX" (drops trailing .00). */
export function formatPrice(cents: number | null): string {
  if (cents == null) return "Ask us";
  const dollars = cents / 100;
  return dollars % 1 === 0
    ? `$${dollars.toFixed(0)}`
    : `$${dollars.toFixed(2)}`;
}

/** Format milliseconds to "X min" or "X hr Y min". */
export function formatDuration(ms: number | null): string {
  if (ms == null) return "";
  const totalMin = Math.round(ms / 60_000);
  if (totalMin < 60) return `${totalMin} min`;
  const hr = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  return min === 0 ? `${hr} hr` : `${hr} hr ${min} min`;
}

/** Best price from variations — the lowest non-null priceCents. */
export function lowestPrice(variations: ServiceVariation[]): number | null {
  const prices = variations
    .map((v) => v.priceCents)
    .filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
}

/** Best duration from variations — from the first available-for-booking one, or first. */
export function primaryDuration(variations: ServiceVariation[]): number | null {
  const available = variations.filter((v) => v.availableForBooking);
  const source = available.length ? available : variations;
  return source[0]?.durationMs ?? null;
}

/** The variation ID to use when pre-selecting this service in the booking URL. */
export function primaryVariationId(variations: ServiceVariation[]): string | null {
  const available = variations.filter((v) => v.availableForBooking);
  const source = available.length ? available : variations;
  return source[0]?.id ?? null;
}

// ── Raw fetch (not cached) ────────────────────────────────────────────────────

async function fetchServicesRaw(): Promise<SquareService[]> {
  const client = getClient();

  // Run both requests in parallel
  const [itemsRes, categoriesPage] = await Promise.all([
    client.catalog.searchItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
      limit: 100,
    }),
    client.catalog.list({ types: "CATEGORY" }),
  ]);

  // Build category ID → name map
  const categoryMap = new Map<string, string>();
  for await (const obj of categoriesPage) {
    if (obj.type === "CATEGORY" && obj.id && obj.categoryData?.name) {
      categoryMap.set(obj.id, obj.categoryData.name);
    }
  }

  // searchItems resolves to SearchCatalogItemsResponse directly (no .data wrapper)
  const items: CatalogObject[] = itemsRes.items ?? [];

  return items
    .filter((obj): obj is CatalogObject & { type: "ITEM" } =>
      obj.type === "ITEM" && obj.itemData != null
    )
    .map((obj) => {
      const item = obj.itemData!;
      const categoryId = item.categoryId ?? null;
      const categoryName = categoryId
        ? (categoryMap.get(categoryId) ?? "")
        : "";

      const variations: ServiceVariation[] = (
        (item.variations ?? []) as CatalogObject[]
      )
        .filter((v): v is CatalogObject & { type: "ITEM_VARIATION" } =>
          v.type === "ITEM_VARIATION" && v.itemVariationData != null
        )
        .map((v) => {
          const vd = v.itemVariationData!;
          return {
            id: v.id ?? "",
            name: vd.name ?? "",
            // Convert BigInt → number before caching
            priceCents:
              vd.priceMoney?.amount != null
                ? Number(vd.priceMoney.amount)
                : null,
            durationMs:
              vd.serviceDuration != null ? Number(vd.serviceDuration) : null,
            availableForBooking: vd.availableForBooking ?? false,
          };
        });

      return {
        id: obj.id ?? "",
        name: item.name ?? "Unnamed service",
        description: item.description ?? "",
        categoryId,
        categoryName,
        variations,
      };
    });
}

// ── Cached fetch (1-hour ISR) ─────────────────────────────────────────────────

// Include the environment in the cache key so sandbox and production data
// are never mixed — switching SQUARE_ENVIRONMENT always gets a fresh fetch.
const cacheEnv = process.env.SQUARE_ENVIRONMENT ?? "sandbox";

export const getSquareServices = unstable_cache(
  fetchServicesRaw,
  [`square-services-${cacheEnv}`],
  { revalidate: 3600, tags: ["square-services"] }
);
