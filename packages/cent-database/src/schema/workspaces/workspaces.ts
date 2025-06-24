import { pgTable, uuid } from "drizzle-orm/pg-core";
import { baseModel } from "../abstract";
import { usersTable } from "../users";

export const workspacesTable = pgTable("workspace", {
  ...baseModel,
  ownerId: uuid("owner_id")
    .references(() => usersTable.id)
    .notNull(),
});

export type Workspace = typeof workspacesTable.$inferSelect;
export type NewWorkspace = typeof workspacesTable.$inferInsert;
