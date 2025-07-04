import z from "zod";

import { OrganizationSchema } from "./organization";
import { SignUpUserSchema } from "./user";

export const RegistrationSchema = z.object({
  organization: OrganizationSchema,
  user: SignUpUserSchema,
});

export type RegistrationFormValue = z.infer<typeof RegistrationSchema>;
