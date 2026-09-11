// Edit-client page: heading + the shared client form, prefilled and bound to
// updateClient for this specific id.
import { notFound } from "next/navigation";
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Mijozni tahrirlash
      </h1>
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
    </div>
  );
}
