import { pgTable } from "drizzle-orm/pg-core";
import { baseModelWithOwner } from "../abstract/baseModelWithOwner";

export const blogCommentsTable = pgTable("blog_comments", {
  ...baseModelWithOwner,
});
