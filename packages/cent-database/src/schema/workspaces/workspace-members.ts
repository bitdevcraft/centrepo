import { pgTable, uuid } from "drizzle-orm/pg-core";
import { baseModelWithWorkspace } from "../abstract";
import { usersTable } from "../users";

export const workspaceMembersTable = pgTable("workspace_members", {
  ...baseModelWithWorkspace,
  memberId: uuid("member_id")
    .references(() => usersTable.id)
    .notNull(),
});
