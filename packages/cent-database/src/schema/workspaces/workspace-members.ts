import { pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "../users";
import { workspacesTable } from "./workspaces";
import { baseModel } from "../abstract/baseModel";

export const workspaceMembersTable = pgTable("workspace_members", {
  ...baseModel,
  memberId: uuid("member_id")
    .references(() => usersTable.id)
    .notNull(),
  workspaceId: uuid("workspace_id")
    .references(() => workspacesTable.id)
    .notNull(),
});
