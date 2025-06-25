import { pgTable } from "drizzle-orm/pg-core";
import { baseModelWithWorkspaceAndOwner } from "../abstract/baseModelWithWorkSpaceAndOwner";
import { createWorkspacePolicies } from "@/policies/workspace";

export const tasksTable = pgTable(
  "tasks",
  {
    ...baseModelWithWorkspaceAndOwner,
  },
  (t) => [...createWorkspacePolicies("tasks", t)]
);
