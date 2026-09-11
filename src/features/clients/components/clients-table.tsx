// Renders the client list: a table on `md` and up, stacked cards below it.
// Pure presentation, no client-side state — safe to render on the server.
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatUzDate } from "@/lib/dates";
import { StageBadge } from "@/features/clients/components/stage-badge";
import type { Client } from "@/features/clients/queries";
import type { ClientStage } from "@/features/clients/constants";

export function ClientsTable({ clients }: { clients: Client[] }) {
  return (
    <>
      <Card className="hidden overflow-hidden py-0 md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Kompaniya</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Bosqich</TableHead>
              <TableHead>Keyingi aloqa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="relative cursor-pointer">
                <TableCell className="font-medium">
                  <Link
                    href={`/clients/${client.id}`}
                    className="absolute inset-0"
                    aria-label={client.name}
                  />
                  <span className="relative">{client.name}</span>
                </TableCell>
                <TableCell className="relative">
                  {client.company ?? "—"}
                </TableCell>
                <TableCell className="relative">
                  {client.phone ?? "—"}
                </TableCell>
                <TableCell className="relative">
                  <StageBadge stage={client.stage as ClientStage} />
                </TableCell>
                <TableCell className="relative">
                  {client.nextContactDate
                    ? formatUzDate(client.nextContactDate)
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex flex-col gap-2 md:hidden">
        {clients.map((client) => (
          <Link key={client.id} href={`/clients/${client.id}`}>
            <Card className="gap-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">
                  {client.name}
                </span>
                <StageBadge stage={client.stage as ClientStage} />
              </div>
              <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                <span>{client.company ?? "—"}</span>
                <span>{client.phone ?? "—"}</span>
                <span>
                  Keyingi aloqa:{" "}
                  {client.nextContactDate
                    ? formatUzDate(client.nextContactDate)
                    : "—"}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
