import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// `latin-ext` carries the accented Latin letters; the Uzbek apostrophes
// (o‘ / g‘ / ma’lumot) are U+2018 and U+2019, both in the base `latin` cut.
const appSans = Plus_Jakarta_Sans({
  variable: "--font-app-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CRM boilerplate",
    template: "%s · CRM",
  },
  description: "Next.js, shadcn/ui va Cloudflare asosidagi CRM shabloni",
};

export const viewport: Viewport = {
  themeColor: [
    // Mirrors `--background` in globals.css for each theme.
    { media: "(prefers-color-scheme: light)", color: "#f5f9f9" },
    { media: "(prefers-color-scheme: dark)", color: "#091113" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      // next-themes writes the `class` on <html> before paint; React would
      // otherwise warn about the server/client mismatch.
      suppressHydrationWarning
      className={`${appSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
