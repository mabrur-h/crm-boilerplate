// Read-only data access for the clients module.
//
// Single-team model: this app has no "organization" or "team" concept yet —
// every signed-in user sees and edits the same shared list of clients. There
// is no per-user filtering anywhere in this file on purpose. A future
// multi-team module would add a `teamId` column and filter by it here.
import { and, asc, desc, eq, like, lte, or } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { todayInTashkent } from "@/lib/dates";
import { ACTIVE_STAGES, CLIENT_STAGES, type ClientStage } from "@/features/clients/constants";

export type Client = typeof clients.$inferSelect;

const STAGE_VALUES = CLIENT_STAGES.map((stage) => stage.value);

function isClientStage(value: string): value is ClientStage {
  return (STAGE_VALUES as string[]).includes(value);
}

export type ListClientsFilter = {
  q?: string;
  stage?: string;
};

/**
 * Lists clients, newest first, optionally filtered by a search term
 * (case-insensitive match against name/phone/company) and/or stage.
 */
export async function listClients({
  q,
  stage,
}: ListClientsFilter = {}): Promise<Client[]> {
  const db = getDb();

  const conditions = [];

  const trimmedQuery = q?.trim();
  if (trimmedQuery) {
    const pattern = `%${trimmedQuery.toLowerCase()}%`;
    conditions.push(
      or(
        like(clients.name, pattern),
        like(clients.phone, pattern),
        like(clients.company, pattern),
      ),
    );
  }

  if (stage && isClientStage(stage)) {
    conditions.push(eq(clients.stage, stage));
  }

  return db
    .select()
    .from(clients)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(clients.createdAt));
}

export async function getClient(id: string): Promise<Client | undefined> {
  const db = getDb();
  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, id))
    .limit(1);
  return client;
}

export type DashboardData = {
  total: number;
  byStage: Record<ClientStage, number>;
  dueToday: Client[];
  recent: Client[];
};

export async function getDashboardData(): Promise<DashboardData> {
  const db = getDb();
  const all = await db.select().from(clients);

  const byStage = Object.fromEntries(
    STAGE_VALUES.map((value) => [value, 0]),
  ) as Record<ClientStage, number>;
  for (const client of all) {
    if (isClientStage(client.stage)) {
      byStage[client.stage] += 1;
    }
  }

  const today = todayInTashkent();
  const dueToday = await db
    .select()
    .from(clients)
    .where(
      and(
        or(...ACTIVE_STAGES.map((value) => eq(clients.stage, value))),
        lte(clients.nextContactDate, today),
      ),
    )
    .orderBy(asc(clients.nextContactDate))
    .limit(10);
  // `lte` on a null column never matches, so `dueToday` naturally excludes
  // clients with no `nextContactDate` — no extra "is not null" check needed.

  const recent = await db
    .select()
    .from(clients)
    .orderBy(desc(clients.createdAt))
    .limit(5);

  return { total: all.length, byStage, dueToday, recent };
}
