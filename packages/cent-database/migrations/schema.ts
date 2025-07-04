import { pgTable, text, timestamp, unique, varchar, boolean, foreignKey, jsonb, pgPolicy } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const userVerifications = pgTable("user_verifications", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	identifier: text(),
	value: text(),
});

export const organizationInvitations = pgTable("organization_invitations", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: boolean("email_verified"),
	image: text(),
	name: text(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const userAccounts = pgTable("user_accounts", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	accessToken: text("access_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	accountId: text("account_id").notNull(),
	idToken: text("id_token"),
	password: text(),
	providerId: text("provider_id"),
	refreshToken: text("refresh_token"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_accounts_user_id_users_id_fk"
		}),
]);

export const userActivityLogs = pgTable("user_activity_logs", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	action: text().notNull(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_activity_logs_user_id_users_id_fk"
		}),
]);

export const organizations = pgTable("organizations", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	logo: text(),
	metadata: text(),
	name: text().notNull(),
	slug: text().notNull(),
});

export const userSessions = pgTable("user_sessions", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	activeOrganizationId: text("active_organization_id"),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
	ipAddress: varchar("ip_address", { length: 100 }),
	token: text(),
	userAgent: varchar("user_agent", { length: 255 }),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.activeOrganizationId],
			foreignColumns: [organizations.id],
			name: "user_sessions_active_organization_id_organizations_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_sessions_user_id_users_id_fk"
		}),
]);

export const organizationMember = pgTable("organization_member", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	organizationId: text("organization_id").notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "organization_member_organization_id_organizations_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "organization_member_user_id_users_id_fk"
		}),
]);

export const blogComments = pgTable("blog_comments", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	ownerId: text("owner_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "blog_comments_owner_id_users_id_fk"
		}),
]);

export const blogs = pgTable("blogs", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	ownerId: text("owner_id").notNull(),
	content: text().notNull(),
	meta: jsonb().default({}),
	slug: text().notNull(),
	title: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "blogs_owner_id_users_id_fk"
		}),
	unique("blogs_slug_unique").on(table.slug),
]);

export const tasks = pgTable("tasks", {
	id: text().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	organizationId: text("organization_id").notNull(),
	ownerId: text("owner_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "tasks_organization_id_organizations_id_fk"
		}),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "tasks_owner_id_users_id_fk"
		}),
	pgPolicy("tasks_delete_organization", { as: "permissive", for: "delete", to: ["public"], using: sql`(organization_id = current_setting('app.current_organization'::text))` }),
	pgPolicy("tasks_update_organization", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("tasks_insert_organization", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("tasks_select_organization", { as: "permissive", for: "select", to: ["public"] }),
]);
