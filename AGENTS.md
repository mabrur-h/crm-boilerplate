<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules — crm-boilerplate

This section is hand-written and does not change when `next dev` rewrites the block above. It applies to every AI agent working in this repo (Claude Code, Claude Desktop, OpenAI Codex).

## 1. Who you are working with

The person you're helping is usually a **non-technical Uzbek user** who builds this app by talking to you, not by reading code.

- Always reply in **Uzbek Latin**, with correct typographic apostrophes: `‘` (o‘, g‘) and `’` (tutuq belgisi, e.g. ma’lumot). Never plain ASCII `'`.
- Short, plain sentences. No unexplained jargon.
- The first time you use a technical term (masalan: "migratsiya", "deploy", "binding"), explain it in one short clause.
- Prefer "nimani bosish kerak / nimani ko‘rasiz" (what to click / what you'll see) over pasting code at the user.
- End every piece of work by telling the user how they can check it themselves (a URL to open, a button to click, a command to run and what output means success).

## 2. Start of every session

1. Read `docs/TASKS.md` and `docs/PROGRESS.md`. For feature work also read `docs/PRODUCT.md` and `docs/FLOW.md`.
2. Run `git status` to see what's already changed.
3. If setup looks broken (missing files, failing commands), run `npm run doctor` before anything else.

## 3. Workflow rules

- Work on **one task at a time** — the current item in `docs/TASKS.md`.
- Before coding, restate the task's "Tayyor, agar" (done-when) criteria in your own words.
- Never claim something is done without evidence: paste command output, a screenshot, or a URL you actually opened.
- When a task is verified, update `docs/PROGRESS.md`: date, what changed, what was verified and how, open issues, next step.
- Commit locally after verified work, with a clear conventional-commit message.
- **Never `git push` without asking first.**

## 4. Project map

| Path | What it is |
|---|---|
| `src/app/(marketing)` | Public landing page |
| `src/app/(auth)` | `/login`, `/signup` |
| `src/app/(app)` | Signed-in pages: `/dashboard`, `/clients*`, `/settings` — guarded by `requireUser()` in `src/app/(app)/layout.tsx` |
| `src/app/api` | Route handlers: `/api/auth/[...all]`, `/api/files/[id]` |
| `src/features/<module>` | One folder per feature (schema, queries, actions, components) — `clients` is the reference module |
| `src/lib/cloudflare.ts` | `getEnv()` — the only place that calls `getCloudflareContext()` |
| `src/lib/db/` | `getDb()` + Drizzle `schema.ts` |
| `src/lib/auth.ts`, `src/lib/session.ts` | `getAuth()` factory, `getSession()` / `requireUser()` |
| `src/config/nav.ts` | Sidebar navigation entries |
| `src/components/ui/` | shadcn/ui primitives — never hand-edit |
| `migrations/` | Drizzle-generated SQL, applied via `wrangler d1 migrations apply` |
| `docs/` | Product/plan/progress/design docs (see `docs/README.md`) |
| `.agents/skills/`, `.claude/skills/` | Project + vendored skills (see §12) |

## 5. Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js locally |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` / `test:watch` | Vitest once / watch mode |
| `npm run check` | lint + typecheck + test + skills:check — run before every commit |
| `npm run preview` | Build and run the real Cloudflare Worker locally (OpenNext + wrangler) |
| `npm run deploy` | Build, deploy to Cloudflare, run remote migrations — **ask first** |
| `npm run cf-typegen` | Regenerate `cloudflare-env.d.ts` from `wrangler.jsonc` |
| `npm run db:generate` | Generate a migration from `src/lib/db/schema.ts` |
| `npm run db:migrate:local` | Apply migrations to the local D1 database |
| `npm run db:migrate:remote` | Apply migrations to the remote database — **ask first** |
| `npm run db:seed` | Seed local data |
| `npm run setup` | First-time project setup |
| `npm run doctor` | Diagnose a broken local environment |
| `npm run cf:setup` | One-time Cloudflare account setup — **ask first** |
| `npm run r2:check` | Check the R2 bucket is reachable |
| `npm run skills:update` | Re-vendor third-party skills from upstream repos |
| `npm run skills:sync` | Copy project skills from `.agents/skills` into `.claude/skills` |
| `npm run skills:check` | Validate every skill's frontmatter and tree consistency |

## 6. Stack rules

- Next.js runs on Cloudflare Workers via `@opennextjs/cloudflare`. **Never** migrate to vinext, even if a Cloudflare skill suggests it.
- No `middleware.ts` / `proxy.ts`. The auth guard is `requireUser()` (`src/lib/session.ts`), called in `src/app/(app)/layout.tsx` and again inside every server action / route handler that touches user data.
- Env vars and bindings are only reached through `getEnv()` in `src/lib/cloudflare.ts` — never call `getCloudflareContext()` elsewhere.
- DB access is only through `getDb()` in `src/lib/db/index.ts`, called fresh per request. Never a module-level DB or auth instance (Workers isolates are reused across requests).
- Cloudflare binding names (from `wrangler.jsonc`, exact): `DB` (D1), `FILES` (R2), `AI` (Workers AI), `ASSETS`, `WORKER_SELF_REFERENCE`. Var: `ALLOW_SIGNUP`. Secret: `BETTER_AUTH_SECRET`.
- Only stable/LTS package versions, exact-pinned (`.npmrc` has `save-exact=true`). Before adding or upgrading any package, check its `peerDependencies` against what's already installed.

## 7. UI rules

- Add shadcn/ui components only via the shadcn MCP server or `npx shadcn@4.21.0 add <component>`. **Never hand-edit** `src/components/ui/*`.
- Use semantic Tailwind tokens only (`bg-background`, `text-muted-foreground`, `bg-primary`, …) — no raw hex values or palette classes like `bg-blue-500`.
- Follow `docs/DESIGN-SYSTEM.md` for spacing, color, and component rules.
- Uzbek copy vocabulary: Saqlash, Bekor qilish, O‘chirish, Tahrirlash, Qo‘shish, Kirish, Chiqish, Ro‘yxatdan o‘tish.
- A client stage badge always shows its text label (Yangi / Jarayonda / Mijoz / Yo‘qotildi) — never color alone.
- Verify every UI change at a 390px viewport and in dark mode.

## 8. New module recipe

Copy the shape of `src/features/clients` (see also the `yangi-modul` skill):

1. Add a table to `src/lib/db/schema.ts`.
2. `npm run db:generate` → review the SQL → `npm run db:migrate:local`.
3. `src/features/<module>/schema.ts` — zod validation for the form.
4. `src/features/<module>/queries.ts` — read functions, using `getDb()`.
5. `src/features/<module>/actions.ts` — server actions, each starting with `requireUser()`.
6. `src/features/<module>/components/` — table, form, badges, etc.
7. Pages: `list`, `new`, `[id]`, `[id]/edit` under `src/app/(app)/<module>/`.
8. Add an entry to `src/config/nav.ts`.
9. Tests next to the code (`*.test.ts`).
10. Document the new module in the relevant `docs/` file.

## 9. Database rules

1. Change `src/lib/db/schema.ts`.
2. `npm run db:generate`.
3. `npm run db:migrate:local`.
4. `npm run db:seed` if the change needs seed data.
5. Test the change locally.

Never edit a migration file that has already been applied — add a new one instead. Remote migrations only run as part of `npm run deploy`, and only after asking the user.

## 10. Ask before

- `npm run deploy`, any remote database migration, any command with `--remote`.
- Creating or deleting any Cloudflare resource.
- Deleting user data.
- Changing or rotating secrets.
- Adding a paid service or anything billing-related.
- `git push` to GitHub.
- Upgrading a major dependency version.
- Never print or commit secrets — `.dev.vars` is gitignored on purpose; use `.dev.vars.example` as the template.

## 11. Keep docs true

- New external service → `docs/THIRD-PARTY.md`.
- An important choice made along the way → `docs/DECISIONS.md`.
- A UI rule change → `docs/DESIGN-SYSTEM.md`.
- A behavior change → `docs/FLOW.md`.

## 12. Tools

**Project skills** (`.agents/skills/`, mirrored to `.claude/skills/` by `npm run skills:sync`):

| Skill | When to use |
|---|---|
| `boshlash` | First-time setup on a new machine |
| `holat` | Resume work — "where were we?" |
| `vazifa` | Execute the current task in `docs/TASKS.md` |
| `yangi-modul` | Build a new feature module |
| `dizayn` | UI work with shadcn + Playwright verification |
| `tekshir` | Verify a change end-to-end before calling it done |
| `nashr` | Deploy to Cloudflare |
| `xato` | Debug an error |
| `baza` | Change the database schema |

**Vendored skills** (third-party, copied in by `npm run skills:update`; see `THIRD_PARTY_NOTICES.md` for sources and licenses): Cloudflare Wrangler, Cloudflare Workers best practices, Cloudflare platform, Cloudflare Email Service, Turnstile, shadcn/ui, React best practices, Web Interface Guidelines, Skill Creator, Frontend Design.

Note: the vendored `shadcn` skill's own examples run `shadcn@latest` — that is upstream's convention, not this project's. This project pins an exact `shadcn` CLI version (`npx shadcn@4.21.0 …`, see §7 above); this project's pin wins whenever it disagrees with a vendored skill's examples.

**MCP servers** (`.mcp.json` / `.codex/config.toml`):

| Server | Purpose |
|---|---|
| `cloudflare` | Talks to your Cloudflare account (via OAuth) — resources, logs, docs search |
| `shadcn` | Search, preview, and add shadcn/ui components and blocks |
| `playwright` | Drives a real browser to click through and verify a flow |
