// Clients list: search + stage filter (via URL params) and the table/cards.
import type { Metadata } from "next";
import Link from "next/link";
import { Plus, SearchX, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { requireUser } from "@/lib/session";
import { listClients } from "@/features/clients/queries";
import { ClientsFilters } from "@/features/clients/components/clients-filters";
import { ClientsTable } from "@/features/clients/components/clients-table";
import { SavedToast } from "@/features/clients/components/saved-toast";

export const metadata: Metadata = { title: "Mijozlar" };

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
    <>
      <SavedToast />
      <PageHeader
        title="Mijozlar"
        description={
          clients.length > 0
            ? `${clients.length} ta mijoz ko‘rsatilmoqda`
            : undefined
        }
      >
        <Button asChild size="lg" className="h-10 px-4">
          <Link href="/clients/new">
            <Plus aria-hidden="true" />
            Mijoz qo‘shish
          </Link>
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4">
        <ClientsFilters />

        {clients.length === 0 ? (
          hasFilter ? (
            <EmptyState
              icon={SearchX}
              title="Bu filtr bo‘yicha mijoz topilmadi."
              description="Qidiruv so‘zini qisqartiring yoki bosqich filtrini tozalang."
            />
          ) : (
            <EmptyState
              icon={Users}
              title="Hali mijoz yo‘q."
              description="Birinchi mijozni qo‘shing."
              action={
                <Button asChild size="lg" className="h-10 px-4">
                  <Link href="/clients/new">
                    <Plus aria-hidden="true" />
                    Mijoz qo‘shish
                  </Link>
                </Button>
              }
            />
          )
        ) : (
          <ClientsTable clients={clients} />
        )}
      </div>
    </>
  );
}
