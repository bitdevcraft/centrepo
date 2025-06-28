import { pgTable } from "drizzle-orm/pg-core";

import { baseModel } from "../abstract/baseModel";

export const organizationInvitationsTable = pgTable(
  "organization_invitations",
  {
    ...baseModel,
  }
);
