import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditProfileForm from "@/app/components/EditProfileForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function MentorProfileEditPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to profile
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update your name, bio, and skills.
        </p>
      </div>
      <EditProfileForm
        userId={user.id}
        defaultName={user.name ?? ""}
        defaultBio={user.bio ?? ""}
        defaultSkills={user.skills ?? []}
        cancelPath="/mentor/profile"
      />
    </div>
  );
}
