// Dashboard: greeting + client stats + follow-up lists.
import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { formatUzDate, isDueOrOverdue, todayInTashkent } from "@/lib/dates";
import { requireUser } from "@/lib/session";
import { CLIENT_STAGES, type ClientStage } from "@/features/clients/constants";
import { getDashboardData } from "@/features/clients/queries";
import { StageBadge } from "@/features/clients/components/stage-badge";

export const metadata: Metadata = { title: "Bosh sahifa" };

// Presentation only — which glyph sits in the corner of each stat card.
const STAGE_ICONS: Record<ClientStage, LucideIcon> = {
  new: Sparkles,
  in_progress: Clock,
  won: CircleCheck,
  lost: CircleX,
};

export default async function DashboardPage() {
  const user = await requireUser();
  const { total, byStage, dueToday, recent } = await getDashboardData();
  const today = todayInTashkent();

  const statCards = [
    { label: "Jami", value: total, icon: Users, accent: true },
    ...CLIENT_STAGES.map((stage) => ({
      label: stage.label,
      value: byStage[stage.value],
      icon: STAGE_ICONS[stage.value],
      accent: false,
    })),
  ];

  return (
    <>
      <PageHeader
        title="Bosh sahifa"
        description={`Xush kelibsiz, ${user.name}!`}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card) => (
          <Card key={card.label} className="gap-0 py-4 shadow-none">
            <CardHeader className="px-4">
              <CardTitle className="flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
                {card.label}
                <card.icon
                  aria-hidden="true"
                  className={
                    card.accent
                      ? "size-4 text-primary"
                      : "size-4 text-muted-foreground/70"
                  }
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pt-1">
              <span className="tabular-figures text-3xl leading-none font-semibold tracking-tight text-foreground">
                {card.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              Bugun bog‘lanish kerak
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dueToday.length === 0 ? (
              <EmptyState
                icon={CalendarClock}
                title="Bugun bog‘lanish kerak bo‘lgan mijoz yo‘q."
                className="py-8"
              />
            ) : (
              <ul className="-my-1 flex flex-col divide-y divide-border">
                {dueToday.map((client) => {
                  const nextDate = client.nextContactDate;
                  // `isDueOrOverdue` also covers "due exactly today", so
                  // strictly-overdue is that minus today itself.
                  const isOverdue =
                    nextDate !== null &&
                    nextDate !== today &&
                    isDueOrOverdue(nextDate, today);

                  return (
                    <li key={client.id}>
                      <Link
                        href={`/clients/${client.id}`}
                        className="-mx-2 flex min-h-10 items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate font-medium text-foreground">
                            {client.name}
                          </span>
                          <StageBadge stage={client.stage as ClientStage} />
                        </span>
                        {isOverdue ? (
                          <span className="shrink-0 text-sm font-medium text-destructive">
                            Muddati o‘tgan
                          </span>
                        ) : nextDate ? (
                          <span className="shrink-0 text-sm text-muted-foreground">
                            {formatUzDate(nextDate)}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserPlus
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              Oxirgi qo‘shilganlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <EmptyState
                icon={Users}
                title="Hali mijoz yo‘q."
                className="py-8"
              />
            ) : (
              <ul className="-my-1 flex flex-col divide-y divide-border">
                {recent.map((client) => (
                  <li key={client.id}>
                    <Link
                      href={`/clients/${client.id}`}
                      className="-mx-2 flex min-h-10 items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span className="truncate font-medium text-foreground">
                        {client.name}
                      </span>
                      <StageBadge stage={client.stage as ClientStage} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
