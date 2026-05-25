/**
 * sync-catalog-to-sandbox.ts
 *
 * Mirrors all APPOINTMENTS_SERVICE items and their categories from your
 * Square Production catalog into Sandbox. Safe to re-run — matches existing
 * Sandbox objects by name and updates them in-place rather than duplicating.
 *
 * Usage:
 *   npx tsx scripts/sync-catalog-to-sandbox.ts
 *
 * Credentials are read from the project's .env files:
 *   .env             → sandbox SQUARE_ACCESS_TOKEN
 *   .env.production  → production SQUARE_ACCESS_TOKEN
 *
 * No changes are made to Production — it is read-only here.
 */

import { SquareClient, SquareEnvironment } from "square";
import type { CatalogObject } from "square";

// Convenience alias — the Square CatalogObject is a discriminated union that
// TypeScript can't narrow through .filter()/.map() chains in this script.
// Using a loose type here is fine: this is a one-shot utility, not app code.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;
import { readFileSync } from "fs";
import { resolve } from "path";

// ── Env loader ────────────────────────────────────────────────────────────────
// Minimal .env parser — avoids pulling in dotenv as a dependency.

function loadEnvFile(path: string): Record<string, string> {
  const vars: Record<string, string> = {};
  try {
    const content = readFileSync(resolve(process.cwd(), path), "utf8");
    for (const raw of content.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      // Strip optional surrounding quotes from values
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      vars[key] = val;
    }
  } catch {
    // file missing — silently skip
  }
  return vars;
}

const sandboxEnv = loadEnvFile(".env");
const productionEnv = loadEnvFile(".env.production");

const PROD_TOKEN = productionEnv.SQUARE_ACCESS_TOKEN;
const SANDBOX_TOKEN = sandboxEnv.SQUARE_ACCESS_TOKEN;

if (!PROD_TOKEN) {
  console.error("❌  SQUARE_ACCESS_TOKEN not found in .env.production");
  process.exit(1);
}
if (!SANDBOX_TOKEN) {
  console.error("❌  SQUARE_ACCESS_TOKEN not found in .env");
  process.exit(1);
}

// ── Clients ───────────────────────────────────────────────────────────────────

const prodClient = new SquareClient({
  token: PROD_TOKEN,
  environment: SquareEnvironment.Production,
});

const sandboxClient = new SquareClient({
  token: SANDBOX_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Collect all pages from a catalog.list() paginator into a flat array. */
async function collectAll(
  page: AsyncIterable<CatalogObject>
): Promise<CatalogObject[]> {
  const results: CatalogObject[] = [];
  for await (const obj of page) results.push(obj);
  return results;
}

function log(msg: string) {
  console.log(msg);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  log("\n🔄  Square catalog sync: Production → Sandbox\n");

  // ── 1. Read Production ──────────────────────────────────────────────────────
  log("📦  Fetching Production catalog…");

  const [prodItems, prodCategories] = await Promise.all([
    prodClient.catalog
      .searchItems({ productTypes: ["APPOINTMENTS_SERVICE"], limit: 100 })
      .then((r) => r.items ?? []),
    collectAll(await prodClient.catalog.list({ types: "CATEGORY" })),
  ]);

  log(`    ${prodItems.length} service(s), ${prodCategories.length} categor${prodCategories.length === 1 ? "y" : "ies"} found`);

  if (prodItems.length === 0) {
    log("\n⚠️   No APPOINTMENTS_SERVICE items found in Production. Exiting.");
    return;
  }

  // ── 2. Read existing Sandbox objects (for idempotent updates) ───────────────
  log("\n🔍  Scanning Sandbox for existing objects…");

  const [existingSandboxItems, existingSandboxCats] = await Promise.all([
    collectAll(await sandboxClient.catalog.list({ types: "ITEM" })),
    collectAll(await sandboxClient.catalog.list({ types: "CATEGORY" })),
  ]);

  // name → existing Sandbox object ID
  const sandboxItemByName = new Map<string, string>(
    (existingSandboxItems as AnyObj[])
      .filter((o) => o.type === "ITEM" && o.itemData?.name && o.id)
      .map((o) => [o.itemData.name as string, o.id as string])
  );
  const sandboxCatByName = new Map<string, string>(
    (existingSandboxCats as AnyObj[])
      .filter((o) => o.type === "CATEGORY" && o.categoryData?.name && o.id)
      .map((o) => [o.categoryData.name as string, o.id as string])
  );

  log(`    ${sandboxItemByName.size} existing item(s), ${sandboxCatByName.size} existing categor${sandboxCatByName.size === 1 ? "y" : "ies"}`);

  // ── 3. Build batch upsert payload ───────────────────────────────────────────
  log("\n🛠   Building batch upsert…");

  const objects: CatalogObject[] = [];

  // Category objects — only those referenced by at least one service item
  const usedCatIds = new Set(
    (prodItems as AnyObj[])
      .filter((o) => o.type === "ITEM")
      .map((o) => o.itemData?.categoryId)
      .filter(Boolean) as string[]
  );

  // prod category ID → sandbox ID (real or temp)
  const catIdMap = new Map<string, string>();
  let tempCatIdx = 0;

  for (const cat of prodCategories as AnyObj[]) {
    if (!cat.id || !cat.categoryData?.name) continue;
    if (!usedCatIds.has(cat.id as string)) continue; // skip unused categories

    const name = cat.categoryData.name as string;
    const existingId = sandboxCatByName.get(name);
    const sandboxId = existingId ?? `#cat_${tempCatIdx++}`;
    catIdMap.set(cat.id as string, sandboxId);

    objects.push({
      type: "CATEGORY",
      id: sandboxId,
      categoryData: { name },
    } as CatalogObject);
  }

  // Service item objects
  let tempItemIdx = 0;
  let createCount = 0;
  let updateCount = 0;

  for (const obj of prodItems as AnyObj[]) {
    if (obj.type !== "ITEM" || !obj.itemData) continue;

    const item = obj.itemData;
    const name = (item.name ?? "Unnamed") as string;
    const existingId = sandboxItemByName.get(name);
    const sandboxId = existingId ?? `#item_${tempItemIdx++}`;

    if (existingId) updateCount++;
    else createCount++;

    // Remap categoryId from prod → sandbox
    const prodCatId = (item.categoryId ?? null) as string | null;
    const sandboxCatId = prodCatId ? (catIdMap.get(prodCatId) ?? null) : null;

    // Rebuild variations (strip prod IDs; Square assigns new sandbox IDs)
    const variations = ((item.variations ?? []) as AnyObj[])
      .filter((v) => v.type === "ITEM_VARIATION" && v.itemVariationData)
      .map((v, vi) => ({
        type: "ITEM_VARIATION" as const,
        id: `${sandboxId}_var_${vi}`,
        itemVariationData: {
          name: v.itemVariationData.name,
          pricingType: v.itemVariationData.pricingType,
          priceMoney: v.itemVariationData.priceMoney,
          serviceDuration: v.itemVariationData.serviceDuration,
          availableForBooking: v.itemVariationData.availableForBooking,
        },
      }));

    objects.push({
      type: "ITEM",
      id: sandboxId,
      itemData: {
        name,
        description: (item.description ?? undefined) as string | undefined,
        categoryId: sandboxCatId ?? undefined,
        productType: "APPOINTMENTS_SERVICE",
        variations,
      },
    } as CatalogObject);
  }

  log(`    ${createCount} to create, ${updateCount} to update`);

  // ── 4. Split into batches of 1000 (Square's limit per batch) ───────────────
  const BATCH_SIZE = 1000;
  const batches: CatalogObject[][] = [];
  for (let i = 0; i < objects.length; i += BATCH_SIZE) {
    batches.push(objects.slice(i, i + BATCH_SIZE));
  }

  // ── 5. Upsert to Sandbox ────────────────────────────────────────────────────
  log(`\n🚀  Upserting ${objects.length} object(s) in ${batches.length} batch(es)…`);

  for (let i = 0; i < batches.length; i++) {
    const idempotencyKey = `sync-${Date.now()}-batch-${i}`;
    const result = await sandboxClient.catalog.batchUpsert({
      idempotencyKey,
      batches: [{ objects: batches[i] }],
    });

    const errors = result.errors ?? [];
    if (errors.length) {
      console.error(`\n❌  Batch ${i + 1} had errors:`);
      for (const e of errors) {
        console.error(`    [${e.category}] ${e.code}: ${e.detail}`);
      }
    } else {
      const created = result.idMappings?.length ?? 0;
      log(`    Batch ${i + 1}: ✓  (${created} ID mapping${created === 1 ? "" : "s"})`);
    }
  }

  log("\n✅  Sync complete! Sandbox now mirrors Production.\n");
}

main().catch((err) => {
  console.error("\n❌  Unexpected error:", err);
  process.exit(1);
});
