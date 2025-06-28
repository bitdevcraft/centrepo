import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";

export const userVerificationsTable = pgTable("user_verifications", {
  ...baseModel,
  expiresAt: timestamp("expires_at"),
  identifier: text("identifier"),
  value: text("value"),
});
