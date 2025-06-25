import { timestamp } from "drizzle-orm/pg-core";
import { baseIdModel } from "./baseIdModel";

export const baseModel = {
  ...baseIdModel,
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};
