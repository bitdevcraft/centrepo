import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";
import { usersTable } from "./users";
import { organizationsTable } from "../organizations";

export const userSessionsTable = pgTable("user_sessions", {
  ...baseModel,
  activeOrganizationId: text("active_organization_id").references(
    () => organizationsTable.id
  ),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  token: text("token"),
  userAgent: varchar("user_agent", { length: 255 }),
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
