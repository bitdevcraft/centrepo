import { uuid } from "drizzle-orm/pg-core";
import { baseModel } from "./baseModel";
import { workspacesTable } from "../workspaces";

export const baseModelWithWorkspace = {
  ...baseModel,
  workspaceId: uuid("workspace_id")
    .references(() => workspacesTable.id)
    .notNull(),
};
