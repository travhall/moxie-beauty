# CLAUDE.md

Guidance for AI agents (Claude Code and others) working in this repo.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4,
Square Appointments (embedded booking iframe + catalog API), Vercel
Analytics. Package manager: pnpm, pinned via Corepack
(`packageManager` field in `package.json`) — do not switch to npm/yarn.

## Commands

| Purpose | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` (runs `eslint .` — **not** `next lint`, see below) |
| Typecheck | `npx tsc --noEmit` (no `typecheck` script exists) |
| Test | `pnpm test` (runs `vitest run`) |

**Lint gotcha**: `eslint.config.mjs` is a flat config that spreads
`eslint-config-next`'s `core-web-vitals` and `typescript` rule sets
directly, with ignore patterns sourced from `.gitignore` via
`@eslint/compat`. Running `next lint` instead of `pnpm lint` uses a
different, deprecated path and may not match — always use `pnpm lint`.

## Conventions

- **Shared page-width wrapper**: `containerClass` from `lib/layout.ts` —
  use it for any new top-level page section rather than re-declaring
  `max-w-[...] mx-auto px-...`.
- **Business info single source of truth**: `lib/site-config.ts` (name,
  contact details, booking URL, address). Don't hardcode these elsewhere.
- **Testing**: unit tests only, for pure logic-bearing functions — no
  component rendering or DOM testing (`vitest.config.ts` runs a plain
  Node environment, not jsdom). Co-locate as `<name>.test.ts` next to the
  file under test. See `lib/square.test.ts`,
  `app/api/square/webhook/route.test.ts`, or `components/jump-nav.test.ts`
  for the established pattern.
- **Commits**: conventional commits (`fix:`, `feat:`, `refactor:`,
  `chore:`, `docs:`, `perf:`, `test:`), imperative mood, no scope prefix.
- **Env vars**: see `.env.example` for the full list and
  `README.md`'s "Getting Started" section for which are required for
  local dev vs. production-only. The Square webhook route
  (`app/api/square/webhook/route.ts`) fails closed (rejects all requests)
  if `SQUARE_WEBHOOK_SIGNATURE_KEY` is unset — this is intentional, not a
  bug to "fix" by relaxing it.
- **Google Maps**: see `docs/google-maps-setup.md` — optional integration,
  the contact page degrades gracefully to a styled placeholder without it.

## Before starting a large change

This repo has an established improvement-plan workflow: check
`plans/README.md` first. It tracks prior audits, in-flight plans, and a
"Findings considered and rejected" list of things that were deliberately
evaluated and declined — don't re-propose those without new evidence that
the situation changed. If you're about to do a broad codebase audit or
refactor, the `/improve` skill (if available in your environment) is
already the convention this repo uses for that; plans go in
`plans/NNN-slug.md`, numbered sequentially, and are meant to be
executable by a model with zero context beyond the plan file itself.
