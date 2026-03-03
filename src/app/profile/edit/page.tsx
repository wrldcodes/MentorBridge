import { redirect } from "next/navigation";
import { getProfileEditRedirectPath } from "@/hooks/useProfileEditRedirectPath";

export default async function ProfileEditPage() {
  const redirectPath = await getProfileEditRedirectPath();
  redirect(redirectPath);
}
