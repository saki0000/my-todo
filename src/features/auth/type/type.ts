import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
