import { pgTable } from "drizzle-orm/pg-core";
import { baseModel } from "../abstract";

export const usersTable = pgTable("users", {
  ...baseModel,
});
