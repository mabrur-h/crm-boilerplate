// Client detail: read-only fields, edit button, delete button.
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUzDate, todayInTashkent } from "@/lib/dates";
import { requireUser } from "@/lib/session";
import { getClient, listClientFiles } from "@/features/clients/queries";
import type { ClientStage } from "@/features/clients/constants";
import { StageBadge } from "@/features/clients/components/stage-badge";
import { DeleteClientButton } from "@/features/clients/components/delete-client-button";
import { SavedToast } from "@/features/clients/components/saved-toast";
import { ClientFiles } from "@/features/clients/components/client-files";
import { AiDraft } from "@/features/clients/components/ai-draft";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default async function ClientDetailPage({
  params,
}: PageProps<"/clients/[id]">) {
  await requireUser();

  const { id } = await params;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  const files = await listClientFiles(id);

  return (
    <div className="flex flex-col gap-4">
      <SavedToast />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {client.name}
          </h1>
          <StageBadge stage={client.stage as ClientStage} />
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/clients/${client.id}/edit`}>Tahrirlash</Link>
          </Button>
          <DeleteClientButton id={client.id} />
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefon" value={client.phone ?? "—"} />
          <Field label="Kompaniya" value={client.company ?? "—"} />
          <Field
            label="Keyingi aloqa"
            value={
              client.nextContactDate
                ? formatUzDate(client.nextContactDate)
                : "—"
            }
          />
          <Field
            label="Qo‘shilgan sana"
            value={formatUzDate(todayInTashkent(client.createdAt))}
          />
          <div className="sm:col-span-2">
            <Field label="Izoh" value={client.note ?? "—"} />
          </div>
        </CardContent>
      </Card>

      <ClientFiles clientId={client.id} files={files} />
      <AiDraft clientId={client.id} />
    </div>
  );
}
