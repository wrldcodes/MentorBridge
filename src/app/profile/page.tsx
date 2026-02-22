import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) redirect("/signin");

  if (user.role?.toLowerCase() === "mentor") {
    redirect("/mentor/profile");
  } else {
    redirect("/mentee/profile");
  }
}
