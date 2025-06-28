import { text } from "drizzle-orm/pg-core";

import { organizationsTable } from "../organizations";
import { baseModel } from "./baseModel";

export const baseModelWithWorkspace = {
  ...baseModel,
  organizationId: text("organization_id")
    .references(() => organizationsTable.id)
    .notNull(),
};
