import z from "zod";

export const UserSchema = z.object({
  confirmPassword: z.string(),
  email: z.string().email().nonempty(),
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type UserFormValues = Omit<
  z.infer<typeof UserSchema>,
  "confirmPassword"
>;

export const SignUpUserSchema = UserSchema.superRefine(
  ({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  },
);

export type SignUpUserValues = z.infer<typeof SignUpUserSchema>;
