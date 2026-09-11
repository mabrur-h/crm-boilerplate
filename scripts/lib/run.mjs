// Thin, cross-platform process spawning wrapper shared by every DX script.
// Not unit-tested itself (it's a side-effecting shell around
// `child_process`) — the parsing of what these commands print lives in
// `wrangler-cli.mjs` and *is* tested.
import { spawnSync } from "node:child_process";

const isWindows = process.platform === "win32";

/**
 * @param {string} command
 * @param {string[]} args
 * @param {import("node:child_process").SpawnSyncOptions} [options]
 */
export function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: isWindows,
    ...options,
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    error: result.error,
  };
}

export function runNpx(args, options) {
  return run("npx", args, options);
}

export function runNpm(args, options) {
  return run("npm", args, options);
}
