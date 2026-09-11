// Streams a client file's bytes back from R2. Not behind
// `src/app/(app)/layout.tsx` (that guard only covers pages, not
// `/api/*`), so this checks the session itself and returns a JSON 401
// instead of the usual `redirect("/login")` — a `<Link>`/`<img>` download
// target can't follow that redirect into a login page.
import { getObject } from "@/lib/files";
import { getSession } from "@/lib/session";
import { getClientFile } from "@/features/clients/queries";

const INLINE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

function contentDisposition(name: string, contentType: string): string {
  const disposition = INLINE_CONTENT_TYPES.has(contentType)
    ? "inline"
    : "attachment";
  // ASCII-only fallback for older clients, plus the RFC 5987 `filename*`
  // form so non-ASCII (e.g. Uzbek/Cyrillic) names still round-trip.
  const asciiFallback = name.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "'");
  const encoded = encodeURIComponent(name);
  return `${disposition}; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/files/[id]">,
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Avval tizimga kiring" }, { status: 401 });
  }

  const { id } = await params;
  const file = await getClientFile(id);
  if (!file) {
    return new Response(null, { status: 404 });
  }

  const object = await getObject(file.key);
  if (!object) {
    return new Response(null, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", file.contentType);
  headers.set("Content-Length", String(file.size));
  headers.set("Content-Disposition", contentDisposition(file.name, file.contentType));
  headers.set("Cache-Control", "private, no-store");

  return new Response(object.body, { headers });
}
