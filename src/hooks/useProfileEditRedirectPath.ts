import { getAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export async function getProfileEditRedirectPath() {
  const user = await getAuthenticatedUser();

  if (user.role?.toLowerCase() === "mentor") {
    return "/mentor/profile/edit";
  }

  return "/mentee/profile/edit";
}
