import { getAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export async function getProfileRedirectPath() {
  const user = await getAuthenticatedUser();

  if (user.role?.toLowerCase() === "mentor") {
    return "/mentor/profile";
  }

  return "/mentee/profile";
}
