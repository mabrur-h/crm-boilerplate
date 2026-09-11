// Create-client page: heading + the shared client form bound to createClient.
import { requireUser } from "@/lib/session";
import { createClient } from "@/features/clients/actions";
import { ClientForm } from "@/features/clients/components/client-form";

export default async function NewClientPage() {
  await requireUser();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Yangi mijoz
      </h1>
      <ClientForm action={createClient} />
    </div>
  );
}
