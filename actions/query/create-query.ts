"use server";

import { db } from "@/db";
import { queries } from "@/db/schema";
import {
  CreateQueryInput,
  createQueryInputSchema,
  CreateQueryResponse,
} from "@/utils/validators/query.validator";
import { nanoid } from "nanoid";
import z from "zod";

export async function createQuery(
  data: CreateQueryInput,
): Promise<CreateQueryResponse> {
  const validateFields = createQueryInputSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        name: tree?.name?.errors,
        subject: tree?.subject?.errors,
        email: tree?.email?.errors,
        phoneNumber: tree?.phoneNumber?.errors,
        message: tree?.message?.errors,
      },
    };
  }
  const { name, subject, email, phoneNumber, message } = validateFields.data;
  try {
    const id = nanoid(7);
    await db.insert(queries).values({
      id,
      name,
      subject,
      email,
      message,
      phoneNumber: String(phoneNumber),
    });
    return { success: true, message: "Query sent successfully." };
  } catch (error) {
    console.error("error: ", error);
    return { success: false, message: "Failed to send the query." };
  }
}
