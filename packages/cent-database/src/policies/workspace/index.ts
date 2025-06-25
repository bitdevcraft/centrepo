import { ColumnBaseConfig, ColumnDataType, sql } from "drizzle-orm";
import { ExtraConfigColumn, pgPolicy } from "drizzle-orm/pg-core";

// 1) Build a generic Workspace‐policy factory
export function createWorkspacePolicies<
  T extends {
    workspaceId: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>;
  },
>(tableName: string, t: T) {
  const ROLE = process.env.POSTGRES_USER_ROLE!;
  const sessionCheck = sql`${t.workspaceId} = current_setting('app.current_workspace')::uuid`;

  return [
    pgPolicy(`${tableName}_select_workspace`, {
      for: "select",
      to: ROLE,
      using: sessionCheck,
    }),
    pgPolicy(`${tableName}_insert_workspace`, {
      for: "insert",
      to: ROLE,
      withCheck: sessionCheck,
    }),
    pgPolicy(`${tableName}_update_workspace`, {
      for: "update",
      to: ROLE,
      using: sessionCheck,
      withCheck: sessionCheck,
    }),
    pgPolicy(`${tableName}_delete_workspace`, {
      for: "delete",
      to: ROLE,
      using: sessionCheck,
    }),
  ];
}
