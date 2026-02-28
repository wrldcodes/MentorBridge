import Image from "next/image";
import Link from "next/link";
import { SKILLS } from "@/utils/constants";

interface ProfileUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  bio: string | null;
  skills: string[];
}

interface ProfileViewProps {
  user: ProfileUser;
  editHref: string;
}

export default function ProfileView({ user, editHref }: ProfileViewProps) {
  const skillLabels = user.skills
    .map((id) => SKILLS.find((s) => s.id === id)?.label ?? id)
    .filter(Boolean);

  return (
    <div className="mx-auto p-1 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>

      {/* Avatar & identity */}
      <div className="card-panel flex items-center gap-6">
        <div className="relative h-20 w-20 shrink-0">
          <Image
            src={user.image ?? "/default-profile-image.png"}
            alt={user.name ?? "Profile"}
            fill
            className="avatar-img"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold truncate">{user.name ?? ""}</h2>
          <p className="text-secondary capitalize">{user.role.toLowerCase()}</p>
          {user.bio && (
            <p className="text-secondary mt-1 line-clamp-2">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Personal information */}
      <div className="card-panel space-y-4">
        <div className="row-between">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <Link
            href={editHref}
            className="btn-base gap-1.5 text-label px-3 py-1.5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <p className="field-label mb-1">Name</p>
            <p className="text-label">{user.name ?? ""}</p>
          </div>
          <div>
            <p className="field-label mb-1">Email</p>
            <p className="text-label">{user.email}</p>
          </div>
          <div>
            <p className="field-label mb-1">Role</p>
            <p className="text-label capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>

        {skillLabels.length > 0 && (
          <div>
            <p className="field-label mb-2">Skills</p>
            <div className="chip-row">
              {skillLabels.map((label) => (
                <span
                  key={label}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
