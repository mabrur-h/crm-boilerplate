// Dashboard: greeting + client stats + follow-up lists. Functional layout
// only — visual polish is a later task.
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUzDate, todayInTashkent } from "@/lib/dates";
import { requireUser } from "@/lib/session";
import { CLIENT_STAGES, type ClientStage } from "@/features/clients/constants";
import { getDashboardData } from "@/features/clients/queries";
import { StageBadge } from "@/features/clients/components/stage-badge";

export default async function DashboardPage() {
  const user = await requireUser();
  const { total, byStage, dueToday, recent } = await getDashboardData();
  const today = todayInTashkent();

  const statCards = [
    { label: "Jami", value: total },
    ...CLIENT_STAGES.map((stage) => ({
      label: stage.label,
      value: byStage[stage.value],
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Bosh sahifa
        </h1>
        <p className="text-muted-foreground">Xush kelibsiz, {user.name}!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold text-foreground">
              {card.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bugun bog‘lanish kerak</CardTitle>
          </CardHeader>
          <CardContent>
            {dueToday.length === 0 ? (
              <p className="text-muted-foreground">
                Bugun bog‘lanish kerak bo‘lgan mijoz yo‘q.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {dueToday.map((client) => (
                  <li key={client.id}>
                    <Link
                      href={`/clients/${client.id}`}
                      className="flex items-center justify-between gap-2 hover:underline"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-foreground">{client.name}</span>
                        <StageBadge stage={client.stage as ClientStage} />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {client.nextContactDate && client.nextContactDate < today
                          ? "Muddati o‘tgan"
                          : client.nextContactDate
                            ? formatUzDate(client.nextContactDate)
                            : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Oxirgi qo‘shilganlar</CardTitle>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="text-muted-foreground">Hali mijoz yo‘q.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {recent.map((client) => (
                  <li key={client.id}>
                    <Link
                      href={`/clients/${client.id}`}
                      className="flex items-center justify-between gap-2 hover:underline"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-foreground">{client.name}</span>
                        <StageBadge stage={client.stage as ClientStage} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
