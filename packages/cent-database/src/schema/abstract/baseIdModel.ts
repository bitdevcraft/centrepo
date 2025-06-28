import { randomUUID } from "crypto";
import { text } from "drizzle-orm/pg-core";

export const baseIdModel = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
};
