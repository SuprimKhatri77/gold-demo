import { auth } from "@/utils/auth";
import { headers } from "next/headers";

type ValidateAdminType =
  | { success: false; message: string }
  | { success: true; message: string; userId: string };
export async function validateAdmin(): Promise<ValidateAdminType> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }
  if (session.user.role !== "admin") {
    return {
      success: false,
      message: "User is not authorized for this action.",
    };
  }
  return { success: true, message: "Authorized.", userId: session.user.id };
}
