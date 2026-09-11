// Renders the client list: a table on `md` and up, stacked cards below it.
// Pure presentation, no client-side state — safe to render on the server.
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      <Card className="hidden overflow-hidden py-0 shadow-none md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Ism</TableHead>
              <TableHead>Kompaniya</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Bosqich</TableHead>
              <TableHead className="text-right">Keyingi aloqa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                className="relative cursor-pointer has-[a:focus-visible]:bg-muted"
              >
                <TableCell className="font-medium text-foreground">
                  <Link
                    href={`/clients/${client.id}`}
                    className="absolute inset-0 rounded-none focus-visible:outline-none"
                    aria-label={client.name}
                  />
                  <span className="relative">{client.name}</span>
                </TableCell>
                <TableCell className="relative text-muted-foreground">
                  {client.company ?? "—"}
                </TableCell>
                <TableCell className="relative whitespace-nowrap text-muted-foreground">
                  {client.phone ?? "—"}
                </TableCell>
                <TableCell className="relative">
                  <StageBadge stage={client.stage as ClientStage} />
                </TableCell>
                <TableCell className="relative text-right whitespace-nowrap text-muted-foreground">
                  {client.nextContactDate
                    ? formatUzDate(client.nextContactDate)
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <ul className="flex flex-col gap-2 md:hidden">
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={`/clients/${client.id}`}
              className="block rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Card className="gap-2.5 p-4 shadow-none transition-colors hover:border-ring/40">
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 font-medium wrap-anywhere text-foreground">
                    {client.name}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <StageBadge stage={client.stage as ClientStage} />
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </div>
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
          </li>
        ))}
      </ul>
    </>
  );
}
