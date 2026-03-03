import { MenteeSessionsView } from "@/components/MenteeSessionsView";
import { getMenteeMySessionsPageData } from "@/hooks/useMenteeMySessionsPageData";

export default async function MenteeMySessionsPage() {
  const { sessions, matchedMentors } = await getMenteeMySessionsPageData();

  return (
    <div className="p-4 md:p-8">
      <MenteeSessionsView sessions={sessions} matchedMentors={matchedMentors} />
    </div>
  );
}
