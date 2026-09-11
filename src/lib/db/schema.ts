import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

// Better Auth core tables for the sqlite/D1 adapter (better-auth 1.7.4).
//
// Hand-written, not CLI-generated: the `@better-auth/cli` package's latest
// published version (1.4.21) predates better-auth 1.7.4 and npm marks it
// "no longer supported", so running it against this project would risk
// drifting from the schema better-auth 1.7.4 actually expects. Instead this
// mirrors the authoritative field definitions read directly out of the
// installed package — `node_modules/@better-auth/core/dist/db/get-tables.mjs`
// (`buildAuthTables`) — for the default `user`, `session`, `account`, and
// `verification` models with no additional fields/plugins.
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// The `clients` table for the M2a Clients module (single-team model: every
// logged-in user shares the same client list — see the comment in
// `src/features/clients/queries.ts`). `stage` is a free-form text column
// constrained in application code (zod, `src/features/clients/schema.ts`)
// rather than a SQL CHECK constraint, matching drizzle-kit's sqlite output.
export const clients = sqliteTable(
  "clients",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    phone: text("phone"),
    company: text("company"),
    note: text("note"),
    stage: text("stage").notNull().default("new"),
    // Calendar day only, `YYYY-MM-DD`, no time component.
    nextContactDate: text("nextContactDate"),
    createdBy: text("createdBy").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [
    index("clients_stage_idx").on(table.stage),
    index("clients_next_contact_date_idx").on(table.nextContactDate),
  ],
);

// Files attached to a client (M2b), stored in R2 (`FILES` binding, see
// `src/lib/files.ts`) with only the object's metadata kept here. `key` is
// the R2 object key and is unique so a row always maps to exactly one
// object. Deleting a client cascades its file rows; deleting the uploading
// user only detaches the row (`uploadedBy` -> null), it never deletes files.
export const clientFiles = sqliteTable(
  "client_files",
  {
    id: text("id").primaryKey(),
    clientId: text("clientId")
      .notNull()
      .references(() => clients.id, { onDelete: "cascade" }),
    key: text("key").notNull().unique(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    contentType: text("contentType").notNull(),
    uploadedBy: text("uploadedBy").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [index("client_files_client_id_idx").on(table.clientId)],
);

export const schema = {
  user,
  session,
  account,
  verification,
  clients,
  clientFiles,
};
