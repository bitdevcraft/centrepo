import { timestamp, uuid } from "drizzle-orm/pg-core";
import { workspacesTable } from "./workspaces/workspaces";
import { usersTable } from "./users";

export const baseIdModel = {
  id: uuid().defaultRandom().primaryKey(),
};

export const baseModel = {
  ...baseIdModel,
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

export const baseModelWithWorkspace = {
  ...baseModel,
  workspaceId: uuid("workspace_id")
    .references(() => workspacesTable.id)
    .notNull(),
};
