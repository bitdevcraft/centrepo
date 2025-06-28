import z from "zod";

import { OrganizationSchema } from "./organization";
import { UserSchema } from "./user";

export const RegistrationSchema = z.object({
  organization: OrganizationSchema,
  user: UserSchema,
});

export type RegistrationFormValue = z.infer<typeof RegistrationSchema>;
