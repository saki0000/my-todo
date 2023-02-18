import { z } from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Required" }),
  password: z.string().min(6),
});

export type Schema = z.infer<typeof schema>;
