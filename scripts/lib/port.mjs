// Checks whether a local TCP port is free. Side-effecting (opens a real
// socket), so it isn't part of the pure/unit-tested library set — kept tiny
// and isolated here instead.
import net from "node:net";

/** @returns {Promise<boolean>} true if the port is free to listen on. */
export function isPortFree(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err) => {
      resolve(err.code !== "EADDRINUSE");
    });
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}
