import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return user;
}
