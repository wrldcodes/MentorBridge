import { redirect } from "next/navigation";
import { getProfileRedirectPath } from "@/hooks/useProfileRedirectPath";

export default async function ProfilePage() {
  const redirectPath = await getProfileRedirectPath();
  redirect(redirectPath);
}
