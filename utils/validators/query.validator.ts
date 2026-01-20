import z from "zod";

export const createQueryInputSchema = z.object({
  name: z.string().trim().nonempty(),
  subject: z.string().trim().nonempty(),
  message: z.string().trim().nonempty(),
  email: z.email().trim().nonempty(),
  phoneNumber: z.number().optional(),
});

export const createQueryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      subject: z.array(z.string()).optional(),
      message: z.array(z.string()).optional(),
      email: z.array(z.string()).optional(),
      phoneNumber: z.array(z.string()).optional(),
    })
    .optional(),
});

export type CreateQueryInput = z.infer<typeof createQueryInputSchema>;
export type CreateQueryResponse = z.infer<typeof createQueryResponseSchema>;
