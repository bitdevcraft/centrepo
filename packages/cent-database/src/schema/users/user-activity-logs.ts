import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { baseModel } from "../abstract/baseModel";

export const userActivityLogsTable = pgTable("user_activity_logs", {
  ...baseModel,
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  action: text("action").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
});
