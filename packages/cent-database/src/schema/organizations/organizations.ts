import { pgTable, text } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";

export const organizationsTable = pgTable("organizations", {
  ...baseModel,
  logo: text("logo"),
  metadata: text("metadata"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});
