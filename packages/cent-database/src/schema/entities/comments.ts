import { pgTable } from "drizzle-orm/pg-core";
import { baseModel } from "../abstract/baseModel";

export const commentsTable = pgTable("comments", {
  ...baseModel,
});
