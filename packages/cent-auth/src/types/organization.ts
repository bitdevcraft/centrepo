import { z } from "zod";

export const OrganizationSchema = z.object({
  logo: z.string().url().optional(),
  name: z.string().nonempty(),
  slug: z.string().nonempty(),
});
