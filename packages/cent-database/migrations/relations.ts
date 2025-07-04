import { relations } from "drizzle-orm/relations";
import { users, userAccounts, userActivityLogs, organizations, userSessions, organizationMember, blogComments, blogs, tasks } from "./schema";

export const userAccountsRelations = relations(userAccounts, ({one}) => ({
	user: one(users, {
		fields: [userAccounts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userAccounts: many(userAccounts),
	userActivityLogs: many(userActivityLogs),
	userSessions: many(userSessions),
	organizationMembers: many(organizationMember),
	blogComments: many(blogComments),
	blogs: many(blogs),
	tasks: many(tasks),
}));

export const userActivityLogsRelations = relations(userActivityLogs, ({one}) => ({
	user: one(users, {
		fields: [userActivityLogs.userId],
		references: [users.id]
	}),
}));

export const userSessionsRelations = relations(userSessions, ({one}) => ({
	organization: one(organizations, {
		fields: [userSessions.activeOrganizationId],
		references: [organizations.id]
	}),
	user: one(users, {
		fields: [userSessions.userId],
		references: [users.id]
	}),
}));

export const organizationsRelations = relations(organizations, ({many}) => ({
	userSessions: many(userSessions),
	organizationMembers: many(organizationMember),
	tasks: many(tasks),
}));

export const organizationMemberRelations = relations(organizationMember, ({one}) => ({
	organization: one(organizations, {
		fields: [organizationMember.organizationId],
		references: [organizations.id]
	}),
	user: one(users, {
		fields: [organizationMember.userId],
		references: [users.id]
	}),
}));

export const blogCommentsRelations = relations(blogComments, ({one}) => ({
	user: one(users, {
		fields: [blogComments.ownerId],
		references: [users.id]
	}),
}));

export const blogsRelations = relations(blogs, ({one}) => ({
	user: one(users, {
		fields: [blogs.ownerId],
		references: [users.id]
	}),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
	organization: one(organizations, {
		fields: [tasks.organizationId],
		references: [organizations.id]
	}),
	user: one(users, {
		fields: [tasks.ownerId],
		references: [users.id]
	}),
}));