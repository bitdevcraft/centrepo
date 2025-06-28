import { pgTable, text } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";
import { usersTable } from "../users";
import { organizationsTable } from "./organizations";

export const organizationMembersTable = pgTable("organization_member", {
  ...baseModel,
  organizationId: text("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
