import { pgTable } from "drizzle-orm/pg-core";

import { createOrganizationPolicies } from "@/policies/workspace";

import { baseModelWithWorkspaceAndOwner } from "../abstract/baseModelWithWorkSpaceAndOwner";

export const tasksTable = pgTable(
  "tasks",
  {
    ...baseModelWithWorkspaceAndOwner,
  },
  (t) => [...createOrganizationPolicies("tasks", t)],
);
