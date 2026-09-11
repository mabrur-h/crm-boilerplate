// A static mock of the signed-in app, assembled from the same Card / Table /
// Badge primitives the real pages use — so the landing page can never drift
// from the product. Fictional data, no screenshots, no images.
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PREVIEW_STATS = [
  { label: "Jami", value: "24" },
  { label: "Jarayonda", value: "9" },
  { label: "Mijoz", value: "11" },
];

const PREVIEW_CLIENTS = [
  {
    name: "Dilshod Rahimov",
    company: "Oq Yo‘l Logistics",
    stage: "Jarayonda",
    variant: "secondary" as const,
    date: "14-sentabr",
  },
  {
    name: "Nodira Karimova",
    company: "Zamin Agro",
    stage: "Mijoz",
    variant: "default" as const,
    date: "21-sentabr",
  },
  {
    name: "Sardor Yusupov",
    company: "Toshkent Mebel",
    stage: "Yangi",
    variant: "outline" as const,
    date: "16-sentabr",
  },
  {
    name: "Kamola Ergasheva",
    company: "Anvar Print",
    stage: "Jarayonda",
    variant: "secondary" as const,
    date: "29-sentabr",
  },
];

export function ProductPreview() {
  return (
    <>
      <p className="sr-only">
        Quyida ilovaning namunaviy ko‘rinishi — mijozlar ro‘yxati va bosqichlar.
        Ma’lumotlar o‘ylab topilgan.
      </p>
      <Card
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border-border py-0 shadow-none"
      >
        <div className="flex">
          {/* Sidebar rail — hints at the app shell without redrawing it. */}
          <div className="hidden w-12 shrink-0 flex-col items-center gap-4 border-r border-border bg-sidebar py-4 sm:flex">
            <span className="text-[0.7rem] font-semibold text-foreground">
              CRM
            </span>
            <LayoutDashboard className="size-4 text-primary" />
            <Users className="size-4 text-muted-foreground" />
            <Settings className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1 bg-background">
            <div className="flex items-baseline justify-between gap-2 border-b border-border px-4 py-3">
              <span className="text-sm font-medium text-foreground">
                Bosh sahifa
              </span>
              <span className="text-xs text-muted-foreground">
                12-sentabr, 2026
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              {PREVIEW_STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-3">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="tabular-figures text-xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ism</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Kompaniya
                  </TableHead>
                  <TableHead>Bosqich</TableHead>
                  <TableHead className="text-right">Keyingi aloqa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PREVIEW_CLIENTS.map((client) => (
                  <TableRow key={client.name}>
                    <TableCell className="font-medium text-foreground">
                      {client.name}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {client.company}
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.variant}>{client.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap text-muted-foreground">
                      {client.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </>
  );
}
