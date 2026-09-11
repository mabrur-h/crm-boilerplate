@AGENTS.md

# Claude-specific notes

- Project skills live in `.agents/skills/` and are mirrored into `.claude/skills/` by `npm run skills:sync` — invoke one with `/<name>` (e.g. `/boshlash`) or just describe what you want to do in Uzbek and Claude will pick the matching skill.
- MCP servers are declared in `.mcp.json` (`cloudflare`, `shadcn`, `playwright`) and need approval the first time this project is opened. The `cloudflare` server also needs a one-time login: run `/mcp` and authenticate.
- For any change that touches more than one file or one step (new module, schema change, deploy), switch to plan mode first and show the user the plan before editing.

The `@AGENTS.md` import above pulls in the Next.js auto-generated block (kept intact — `next dev` rewrites it) and all project rules; do not duplicate that content here.
