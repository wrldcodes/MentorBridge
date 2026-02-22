"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SkillsPicker from "@/app/components/SkillsPicker";
import { updateProfile, type ActionResponse } from "@/app/action/auth";
import { SKILLS } from "@/utils/constants";

interface EditProfileFormProps {
  userId: string;
  defaultName: string;
  defaultBio: string;
  defaultSkills: string[];
  cancelPath?: string;
}

const initialState: ActionResponse = { success: false, message: "" };

export default function EditProfileForm({
  userId,
  defaultName,
  defaultBio,
  defaultSkills,
  cancelPath = "/profile",
}: EditProfileFormProps) {
  const router = useRouter();
  const boundAction = updateProfile.bind(null, userId);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  // Map skill ids back to labels for display
  const selectedLabels = defaultSkills
    .map((id) => SKILLS.find((s) => s.id === id)?.label)
    .filter(Boolean);

  return (
    <form action={formAction} className="space-y-6">
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultName}
          placeholder="Your full name"
          className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {state.errors?.name && (
          <p className="text-xs text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
          <span className="text-muted-foreground font-normal ml-1">
            (optional)
          </span>
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={defaultBio}
          placeholder="Tell mentors or mentees a bit about yourself..."
          className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />
        {state.errors?.bio && (
          <p className="text-xs text-destructive">{state.errors.bio[0]}</p>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Skills
          <span className="text-muted-foreground font-normal ml-1">
            (select all that apply)
          </span>
        </label>
        {selectedLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedLabels.map((label) => (
              <span
                key={label}
                className="text-xs px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
              >
                {label}
              </span>
            ))}
          </div>
        )}
        <div className="rounded-lg border border-gray-200 dark:border-white/10 p-4">
          <SkillsPicker defaultSelected={defaultSkills} />
        </div>
        {state.errors?.skills && (
          <p className="text-xs text-destructive">{state.errors.skills[0]}</p>
        )}
      </div>

      {/* Error message */}
      {!state.success && state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push(cancelPath)}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-white/10 bg-background text-sm font-medium px-5 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
