import ProfileView from "@/components/ProfileView";
import { getAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default async function MentorProfilePage() {
  const user = await getAuthenticatedUser();

  return <ProfileView user={user} editHref="/mentor/profile/edit" />;
}
