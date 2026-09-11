// Edit-client page: heading + the shared client form, prefilled and bound to
// updateClient for this specific id.
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { requireUser } from "@/lib/session";
import { getClient } from "@/features/clients/queries";
import { updateClient } from "@/features/clients/actions";
import { ClientForm } from "@/features/clients/components/client-form";

export default async function EditClientPage({
  params,
}: PageProps<"/clients/[id]/edit">) {
  await requireUser();

  const { id } = await params;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 h-8 w-fit text-muted-foreground"
        >
          <Link href={`/clients/${client.id}`}>
            <ArrowLeft aria-hidden="true" />
            {client.name}
          </Link>
        </Button>
        <PageHeader title="Mijozni tahrirlash" />
      </div>

      <Card className="max-w-2xl shadow-none">
        <CardContent>
          <ClientForm
            action={updateClient.bind(null, client.id)}
            defaultValues={{
              name: client.name,
              phone: client.phone ?? "",
              company: client.company ?? "",
              stage: client.stage,
              note: client.note ?? "",
              nextContactDate: client.nextContactDate ?? "",
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
