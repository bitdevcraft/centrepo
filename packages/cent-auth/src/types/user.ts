import z from "zod";

export const UserSchema = z.object({
  email: z.string().email().nonempty(),
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type UserFormValues = z.infer<typeof UserSchema>;
