ALTER TABLE "tasks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "comments" RENAME TO "blog_comments";--> statement-breakpoint
ALTER TABLE "blog_comments" DROP CONSTRAINT "comments_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "meta" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_slug_unique" UNIQUE("slug");--> statement-breakpoint
CREATE POLICY "tasks_select_workspace" ON "tasks" AS PERMISSIVE FOR SELECT TO public USING ("tasks"."workspace_id" = current_setting('app.current_workspace')::uuid);--> statement-breakpoint
CREATE POLICY "tasks_insert_workspace" ON "tasks" AS PERMISSIVE FOR INSERT TO public WITH CHECK ("tasks"."workspace_id" = current_setting('app.current_workspace')::uuid);--> statement-breakpoint
CREATE POLICY "tasks_update_workspace" ON "tasks" AS PERMISSIVE FOR UPDATE TO public USING ("tasks"."workspace_id" = current_setting('app.current_workspace')::uuid) WITH CHECK ("tasks"."workspace_id" = current_setting('app.current_workspace')::uuid);--> statement-breakpoint
CREATE POLICY "tasks_delete_workspace" ON "tasks" AS PERMISSIVE FOR DELETE TO public USING ("tasks"."workspace_id" = current_setting('app.current_workspace')::uuid);