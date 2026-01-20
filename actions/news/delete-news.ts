"use server";

import { db } from "@/db";
import { news } from "@/db/schema";
import { validateAdmin } from "@/helpers/validate-admin";
import {
  DeleteNewsInput,
  deleteNewsInputSchema,
  DeleteNewsResponse,
} from "@/utils/validators/news.validator";
import { eq } from "drizzle-orm";

export async function deleteNews(
  data: DeleteNewsInput,
): Promise<DeleteNewsResponse> {
  const result = await validateAdmin();
  if (!result.success) return { ...result };

  const validateField = deleteNewsInputSchema.safeParse(data);
  if (!validateField.success) {
    return { success: false, message: "Invalid news id format." };
  }
  const { newsId } = validateField.data;
  try {
    await db.delete(news).where(eq(news.id, newsId));
    return { success: true, message: "News deleted successfully." };
  } catch (error) {
    console.error("error: ", error);
    return { success: false, message: "Failed to delete the blog." };
  }
}
