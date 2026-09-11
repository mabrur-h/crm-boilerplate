// Landing page. Public, static, no session read.
import Link from "next/link";
import { Bot, FolderLock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductPreview } from "@/app/(marketing)/product-preview";

const FEATURES = [
  {
    icon: Users,
    title: "Mijozlar va bosqichlar",
    description:
      "Qidiruv, filtr va keyingi aloqa sanasi — bugun kim bilan gaplashish kerakligi bir qarashda ko‘rinadi.",
  },
  {
    icon: FolderLock,
    title: "Fayllar xavfsiz saqlanadi",
    description:
      "Shartnoma va hisob-fakturalar Cloudflare R2’da saqlanadi. Har bir fayl faqat o‘z mijoziga biriktiriladi.",
  },
  {
    icon: Bot,
    title: "AI yordamchi",
    description:
      "Mijozga xabar qoralamasini yozadi. Siz tekshirasiz, tahrirlaysiz va keyin yuborasiz.",
  },
];

const STACK = [
  "Next.js 16",
  "shadcn/ui",
  "Cloudflare Workers",
  "D1",
  "R2",
  "Workers AI",
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="h-6 px-2.5">
              Ochiq manba shablon
            </Badge>
            <h1 className="text-display font-semibold text-foreground">
              Mijozlaringizni bir joyda boshqaring
            </h1>
            <p className="max-w-prose text-base text-pretty text-muted-foreground sm:text-lg">
              Kichik jamoalar uchun sodda CRM. Next.js, shadcn/ui va
              Cloudflare’da qurilgan — AI yordamida o‘zingizga moslang.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-11 px-5 text-[0.95rem]">
                <Link href="/signup">Boshlash</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 px-5 text-[0.95rem]"
              >
                <Link href="/login">Kirish</Link>
              </Button>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      {/* Features */}
      <section
        id="imkoniyatlar"
        className="scroll-mt-20 border-t border-border bg-card/40"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Asosiy imkoniyatlar
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="border-border shadow-none">
                <CardContent className="flex flex-col gap-2.5">
                  <feature.icon
                    aria-hidden="true"
                    className="size-5 text-primary"
                  />
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stack strip */}
      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:gap-8 sm:px-6">
          <h2 className="shrink-0 text-sm font-semibold tracking-wide text-foreground uppercase">
            Qanday qurilgan
          </h2>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li key={item}>
                <Badge variant="outline" className="h-7 px-3 text-[0.8rem]">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
