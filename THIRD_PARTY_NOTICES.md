# Third-party notices

This project vendors a set of AI agent skills from third-party open-source repositories into `.agents/skills/` and `.claude/skills/` (kept identical by `npm run skills:sync`, refreshed by `npm run skills:update`). Each skill's `LICENSE` file lives inside its own folder. This document records, for every vendored skill, where it came from and under what license.

`skills.config.json` is the machine-readable source of truth (source repo, path, ref, resolved commit SHA, license); this file is the human-readable summary. Re-running `npm run skills:update` re-resolves the commit SHA recorded here.

## cloudflare/skills

Source: https://github.com/cloudflare/skills — License: **Apache License 2.0** (repository root `LICENSE`; the file uses the standard unfilled `[name of copyright owner]` placeholder, so the copyright line below is Cloudflare's own repository ownership, not a filled-in notice from the file itself).
Copyright: Cloudflare, Inc. and contributors.

| Skill | Path in upstream repo | Commit |
|---|---|---|
| `wrangler` | `skills/wrangler` | `b052c32bab7dd493513260228a36c88294f343f1` |
| `workers-best-practices` | `skills/workers-best-practices` | `b052c32bab7dd493513260228a36c88294f343f1` |
| `cloudflare` | `skills/cloudflare` | `b052c32bab7dd493513260228a36c88294f343f1` |
| `cloudflare-email-service` | `skills/cloudflare-email-service` | `b052c32bab7dd493513260228a36c88294f343f1` |
| `turnstile-spin` | `skills/turnstile-spin` | `b052c32bab7dd493513260228a36c88294f343f1` |

None of these five folders shipped their own `LICENSE` file upstream, so `npm run skills:update` copies the repository root `LICENSE` (Apache-2.0) into each vendored folder.

Note: the brief referred to "the Turnstile skill" without an exact folder name — the real folder in this repo is `turnstile-spin` (not `turnstile`); see "Deviations" in `task-7-report.md`.

## shadcn-ui/ui

Source: https://github.com/shadcn-ui/ui, path `skills/shadcn` — License: **MIT** (repository root `LICENSE.md`).
Copyright: (c) 2023 shadcn.
Commit: `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`.

The folder had no own `LICENSE`; the repository root `LICENSE.md` was copied into `shadcn/LICENSE.md`.

## vercel-labs/agent-skills

Source: https://github.com/vercel-labs/agent-skills — License: **MIT**, evidenced by (a) the repository's own `README.md` § "License" stating "MIT", and (b) `skills/react-best-practices/SKILL.md`'s frontmatter field `license: MIT`. The repository ships **no `LICENSE` file at all** (root or per-skill) — GitHub's own license detector also reports no detected license for this repo. Because of that gap, the MIT license text placed in these two vendored folders' `LICENSE` files was hand-authored (standard MIT boilerplate, copyright attributed to Vercel, Inc.) rather than copied verbatim from an upstream file — see the sourcing note at the bottom of each `LICENSE` file, and "Deviations" in `task-7-report.md`.

| Skill | Path in upstream repo | Commit |
|---|---|---|
| `vercel-react-best-practices` | `skills/react-best-practices` | `063bee94c3f4df8453406c830b0a7df0f2860278` |
| `web-design-guidelines` | `skills/web-design-guidelines` | `063bee94c3f4df8453406c830b0a7df0f2860278` |

Note: the upstream folder is `skills/react-best-practices`, but its `SKILL.md` frontmatter declares `name: vercel-react-best-practices` — this project vendors it under the folder name `vercel-react-best-practices` (matching the declared `name`, required for this repo's own skill frontmatter-equals-folder-name check) rather than the upstream folder's own name. See "Deviations" in `task-7-report.md`.

## anthropics/skills

Source: https://github.com/anthropics/skills — License: **Apache License 2.0**, per each skill's own `LICENSE.txt` file (`Copyright 2026 Anthropic, PBC.`).
Commit: `34040c9c568585f6929bedeaad110ad08f079624`.

| Skill | Path in upstream repo | Commit |
|---|---|---|
| `skill-creator` | `skills/skill-creator` | `34040c9c568585f6929bedeaad110ad08f079624` |
| `frontend-design` | `skills/frontend-design` | `34040c9c568585f6929bedeaad110ad08f079624` |

Both folders already ship their own `LICENSE.txt` (Apache-2.0) upstream; nothing was copied in for these two.

## Not vendored

The following were considered per the task brief and deliberately excluded — either out of scope, unlicensed, or proprietary: `nextjs-on-cloudflare`, `durable-objects`, `agents-sdk`, `sandbox-*` (`sandbox-stable`, `sandbox-next`, `sandbox-migrate-to-next`), `cloudflare-one*` (`cloudflare-one`, `cloudflare-one-migrations`), `web-perf` (all from `cloudflare/skills`, out of scope for this project); any Better Auth skill (no license found); Anthropic's `xlsx`, `docx`, `pdf`, `pptx` skills (proprietary license terms, per the brief).

## MCP servers

`cloudflare`, `shadcn`, and `playwright` (configured in `.mcp.json` / `.codex/config.toml`) are external services and tools this project *connects to* at runtime — their code is not copied into this repository, so no license notice for them is required here.
