"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { validateAdmin } from "@/helpers/validate-admin";
import { generateUniqueSlug } from "@/utils/generate-unique-slug";
import {
  CreateNewsInput,
  createNewsInputSchema,
  CreateNewsResponse,
} from "@/utils/validators/news.validator";
import { nanoid } from "nanoid";
import z from "zod";

export async function createNews(
  data: CreateNewsInput,
): Promise<CreateNewsResponse> {
  const result = await validateAdmin();
  if (!result.success) {
    return { ...result };
  }
  const { userId } = result;

  const validateFields = createNewsInputSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        title: tree?.title?.errors,
        description: tree?.title?.errors,
        images: tree?.images?.errors,
        tags: tree?.tags?.errors,
      },
    };
  }
  const { title, description, images, tags } = validateFields.data;
  try {
    const id = nanoid(7);
    const slug = await generateUniqueSlug(title, id);
    await db.insert(news).values({
      title,
      description,
      images,
      tags,
      slug,
      authorId: userId,
      id,
    });
    return { success: true, message: "News created successfully." };
  } catch (error) {
    console.error("error: ", error);
    return { success: false, message: "Failed to create news." };
  }
}
