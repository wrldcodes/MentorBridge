import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileView from "@/app/components/ProfileView";

export default async function MentorProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  return <ProfileView user={user} editHref="/mentor/profile/edit" />;
}
