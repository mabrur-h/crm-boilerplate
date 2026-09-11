// App-wide 404 page (Uzbek copy, per project convention).
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Sahifa topilmadi
      </h1>
      <Link href="/dashboard" className="text-primary underline-offset-4 hover:underline">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
