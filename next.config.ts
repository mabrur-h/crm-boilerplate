import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1 MB, too small for the client-file upload server action
    // (`uploadClientFile` in `src/features/clients/file-actions.ts`), which
    // needs to carry files up to `MAX_FILE_SIZE` (10 MB, `src/lib/files.ts`)
    // plus multipart/form-data overhead.
    serverActions: {
      bodySizeLimit: "11mb",
    },
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
