import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";

export const usersTable = pgTable("users", {
  ...baseModel,
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified"),
  image: text("image"),
  name: text("name"),
});

export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;
