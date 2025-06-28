import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";
import { usersTable } from "./users";

export const userActivityLogsTable = pgTable("user_activity_logs", {
  ...baseModel,
  action: text("action").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
