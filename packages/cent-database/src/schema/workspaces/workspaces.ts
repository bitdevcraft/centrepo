import { pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "../users";
import { baseModel } from "../abstract/baseModel";

export const workspacesTable = pgTable("workspace", {
  ...baseModel,
  ownerId: uuid("owner_id")
    .references(() => usersTable.id)
    .notNull(),
});

export type Workspace = typeof workspacesTable.$inferSelect;
export type NewWorkspace = typeof workspacesTable.$inferInsert;
