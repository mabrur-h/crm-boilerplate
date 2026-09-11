// Clients list: search + stage filter (via URL params) and the table/cards.
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { listClients } from "@/features/clients/queries";
import { ClientsFilters } from "@/features/clients/components/clients-filters";
import { ClientsTable } from "@/features/clients/components/clients-table";
import { SavedToast } from "@/features/clients/components/saved-toast";

export default async function ClientsPage({
  searchParams,
}: PageProps<"/clients">) {
  await requireUser();

  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const stage = typeof params.stage === "string" ? params.stage : undefined;

  const clients = await listClients({ q, stage });
  const hasFilter = Boolean(q || stage);

  return (
    <div className="flex flex-col gap-4">
      <SavedToast />
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Mijozlar
        </h1>
        <Button asChild>
          <Link href="/clients/new">Mijoz qo‘shish</Link>
        </Button>
      </div>

      <ClientsFilters />

      {clients.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            {hasFilter
              ? "Bu filtr bo‘yicha mijoz topilmadi."
              : "Hali mijoz yo‘q. Birinchi mijozni qo‘shing."}
          </p>
          {!hasFilter && (
            <Button asChild>
              <Link href="/clients/new">Mijoz qo‘shish</Link>
            </Button>
          )}
        </div>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  );
}
