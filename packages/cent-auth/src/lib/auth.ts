import { db } from "@repo/cent-database";
import * as schema from "@repo/cent-database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  // Database
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      account: schema.userAccountsTable,
      invitation: schema.organizationInvitationsTable,
      member: schema.organizationMembersTable,
      organization: schema.organizationsTable,
      session: schema.userSessionsTable,
      user: schema.usersTable,
      verification: schema.userVerificationsTable,
    },
  }),
  // Auth
  emailAndPassword: {
    enabled: true,
  },
});
