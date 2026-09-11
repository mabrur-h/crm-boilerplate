// App-wide 404 page (Uzbek copy, per project convention).
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <FileQuestion className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Sahifa topilmadi
        </h1>
        <p className="max-w-sm text-sm text-balance text-muted-foreground">
          Manzil noto‘g‘ri bo‘lishi yoki sahifa o‘chirilgan bo‘lishi mumkin.
        </p>
      </div>
      <Button asChild size="lg" className="h-10 px-4">
        <Link href="/dashboard">Bosh sahifaga qaytish</Link>
      </Button>
    </div>
  );
}
