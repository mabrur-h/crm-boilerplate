import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        CRM boilerplate
      </h1>
      <p className="text-muted-foreground">Loyiha tayyorlanmoqda</p>
      <Button>Boshlash</Button>
    </div>
  );
}
