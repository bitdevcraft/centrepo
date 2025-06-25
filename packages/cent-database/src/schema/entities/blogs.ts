import { jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { baseModelWithOwner } from "../abstract/baseModelWithOwner";

export const blogsTable = pgTable("blogs", {
  ...baseModelWithOwner,
  content: text("content").notNull(),
  meta: jsonb("meta").$type<Record<string, unknown>>().default({}),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
});

export const blogSelectSchema = createSelectSchema(blogsTable);
export const blogInsertSchema = createInsertSchema(blogsTable);

export type Blog = typeof blogsTable.$inferSelect;
export type NewBlog = typeof blogsTable.$inferInsert;
