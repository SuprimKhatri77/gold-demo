"use server";

import { db } from "@/db";
import slugify from "slugify";

export async function generateUniqueSlug(title: string, id: string) {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
  const newsRecord = await db.query.news.findFirst({
    where: (fields, { eq }) => eq(fields.slug, baseSlug),
  });
  if (!newsRecord) {
    return baseSlug;
  }

  return `${baseSlug}-${id}`;
}
