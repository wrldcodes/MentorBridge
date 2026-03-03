import { MentorBrowser } from "@/components/MentorBrowser";
import { getMentorsPageData } from "@/hooks/useMentorsPageData";

export default async function MentorsPage() {
  const { mentors, pendingMentorIds } = await getMentorsPageData();

  return (
    <div className="p-4 md:p-6">
      <MentorBrowser mentors={mentors} pendingMentorIds={pendingMentorIds} />
    </div>
  );
}
