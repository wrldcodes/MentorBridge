import ProfileView from "@/components/ProfileView";
import { getAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default async function MenteeProfilePage() {
  const user = await getAuthenticatedUser();

  return <ProfileView user={user} editHref="/mentee/profile/edit" />;
}
