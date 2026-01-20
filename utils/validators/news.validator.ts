import z from "zod";

export const createNewsInputSchema = z.object({
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});
export const editNewsInputSchema = z.object({
  id: z.nanoid().nonempty(),
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const deleteNewsInputSchema = z.object({
  newsId: z.string().nonempty(),
});

export const deleteNewsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const createNewsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      title: z.array(z.string()).optional(),
      description: z.array(z.string()).optional(),
      images: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    })
    .optional(),
});

export const editNewsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      title: z.array(z.string()).optional(),
      description: z.array(z.string()).optional(),
      images: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    })
    .optional(),
});

export type CreateNewsInput = z.infer<typeof createNewsInputSchema>;
export type EditNewsInput = z.infer<typeof editNewsInputSchema>;
export type DeleteNewsInput = z.infer<typeof deleteNewsInputSchema>;
export type DeleteNewsResponse = z.infer<typeof deleteNewsResponseSchema>;
export type CreateNewsResponse = z.infer<typeof createNewsResponseSchema>;
export type EditNewsResponse = z.infer<typeof editNewsResponseSchema>;
