import { auth } from "@clerk/nextjs/server";
import type { Role } from "@/types/globals";

/**
 * Returns the signed-in user's role. Anyone without an explicit "admin" role
 * is treated as a student — so new signups are students automatically.
 * Returns null if nobody is signed in.
 */
export async function getCurrentRole(): Promise<Role | null> {
  const { userId, sessionClaims } = await auth();
  if (!userId) return null;
  return sessionClaims?.metadata?.role === "admin" ? "admin" : "student";
}

/** True only for the teacher (admin) account. */
export async function isAdmin(): Promise<boolean> {
  return (await getCurrentRole()) === "admin";
}
