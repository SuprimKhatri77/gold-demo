"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { validateAdmin } from "@/helpers/validate-admin";
import {
  EditNewsInput,
  editNewsInputSchema,
  EditNewsResponse,
} from "@/utils/validators/news.validator";
import { eq } from "drizzle-orm";
import z from "zod";

export async function editNews(data: EditNewsInput): Promise<EditNewsResponse> {
  const result = await validateAdmin();
  if (!result.success) return { ...result };

  const validateFields = editNewsInputSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        title: tree?.title?.errors,
        description: tree?.description?.errors,
        images: tree?.images?.errors,
        tags: tree?.tags?.errors,
      },
    };
  }
  const { title, description, id, images, tags } = validateFields.data;
  try {
    await db
      .update(news)
      .set({ title, description, images, tags })
      .where(eq(news.id, id));
    return { success: true, message: "News updated successfully." };
  } catch (error) {
    console.error("error: ", error);
    return { success: false, message: "Failed to edit the news." };
  }
}
