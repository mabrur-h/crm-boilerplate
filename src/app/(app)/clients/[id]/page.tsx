// Client detail: read-only fields, edit button, delete button.
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  CalendarPlus,
  Pencil,
  Phone,
  StickyNote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { formatUzDate, isDueOrOverdue, todayInTashkent } from "@/lib/dates";
import { requireUser } from "@/lib/session";
import { getClient, listClientFiles } from "@/features/clients/queries";
import type { ClientStage } from "@/features/clients/constants";
import { StageBadge } from "@/features/clients/components/stage-badge";
import { DeleteClientButton } from "@/features/clients/components/delete-client-button";
import { SavedToast } from "@/features/clients/components/saved-toast";
import { ClientFiles } from "@/features/clients/components/client-files";
import { AiDraft } from "@/features/clients/components/ai-draft";

function Field({
  icon: Icon,
  label,
  value,
  tone,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  tone?: "destructive";
  className?: string;
}) {
  return (
    <div className={`flex gap-3 ${className ?? ""}`}>
      <Icon
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span
          className={
            tone === "destructive"
              ? "font-medium wrap-anywhere text-destructive"
              : "wrap-anywhere text-foreground"
          }
        >
          {value}
        </span>
      </div>
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
  const today = todayInTashkent();
  const nextDate = client.nextContactDate;
  // `isDueOrOverdue` also covers "due exactly today", so strictly-overdue is
  // that minus today itself.
  const isOverdue =
    nextDate !== null && nextDate !== today && isDueOrOverdue(nextDate, today);

  return (
    <>
      <SavedToast />

      <div className="flex flex-col gap-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 h-8 w-fit text-muted-foreground"
        >
          <Link href="/clients">
            <ArrowLeft aria-hidden="true" />
            Mijozlar
          </Link>
        </Button>

        <PageHeader
          title={
            <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {client.name}
              <StageBadge stage={client.stage as ClientStage} />
            </span>
          }
        >
          <Button asChild variant="outline" size="lg" className="h-10 px-4">
            <Link href={`/clients/${client.id}/edit`}>
              <Pencil aria-hidden="true" />
              Tahrirlash
            </Link>
          </Button>
          <DeleteClientButton id={client.id} />
        </PageHeader>
      </div>

      <Card className="shadow-none">
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <Field icon={Phone} label="Telefon" value={client.phone ?? "—"} />
          <Field
            icon={Building2}
            label="Kompaniya"
            value={client.company ?? "—"}
          />
          <Field
            icon={CalendarClock}
            label="Keyingi aloqa"
            tone={isOverdue ? "destructive" : undefined}
            value={
              nextDate
                ? isOverdue
                  ? `${formatUzDate(nextDate)} · Muddati o‘tgan`
                  : formatUzDate(nextDate)
                : "—"
            }
          />
          <Field
            icon={CalendarPlus}
            label="Qo‘shilgan sana"
            value={formatUzDate(todayInTashkent(client.createdAt))}
          />
          <Field
            icon={StickyNote}
            label="Izoh"
            value={
              client.note ? (
                <span className="whitespace-pre-line">{client.note}</span>
              ) : (
                "—"
              )
            }
            className="sm:col-span-2"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <ClientFiles clientId={client.id} files={files} />
        <AiDraft clientId={client.id} />
      </div>
    </>
  );
}
