import { pgTable } from "drizzle-orm/pg-core";
import { baseModel } from "../abstract/baseModel";

export const blogsTable = pgTable("blogs", {
  ...baseModel,
});
