import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { baseModelWithWorkspace } from "../abstract";
import { usersTable } from "./users";

export const userActivityLogsTable = pgTable("user_activity_logs", {
  ...baseModelWithWorkspace,
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  action: text("action").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
});
