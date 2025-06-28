/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { ColumnBaseConfig, ColumnDataType, sql } from "drizzle-orm";
import { ExtraConfigColumn, pgPolicy } from "drizzle-orm/pg-core";

// 1) Build a generic Organization‐policy factory
export function createOrganizationPolicies<
  T extends {
    organizationId: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>;
  },
>(tableName: string, t: T) {
  const ROLE = process.env.POSTGRES_USER_ROLE!;
  const sessionCheck = sql`${t.organizationId} = current_setting('app.current_organization')`;

  return [
    pgPolicy(`${tableName}_select_organization`, {
      for: "select",
      to: ROLE,
      using: sessionCheck,
    }),
    pgPolicy(`${tableName}_insert_organization`, {
      for: "insert",
      to: ROLE,
      withCheck: sessionCheck,
    }),
    pgPolicy(`${tableName}_update_organization`, {
      for: "update",
      to: ROLE,
      using: sessionCheck,
      withCheck: sessionCheck,
    }),
    pgPolicy(`${tableName}_delete_organization`, {
      for: "delete",
      to: ROLE,
      using: sessionCheck,
    }),
  ];
}
