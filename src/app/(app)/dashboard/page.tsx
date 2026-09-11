import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Bosh sahifa
      </h1>
      <p className="text-muted-foreground">Xush kelibsiz, {user.name}!</p>
    </div>
  );
}
