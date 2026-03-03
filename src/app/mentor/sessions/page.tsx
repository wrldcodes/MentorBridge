import { MentorSessionsList } from "@/components/MentorSessionsList";
import { getMentorSessionsPageData } from "@/hooks/useMentorSessionsPageData";

export default async function MentorSessionsPage() {
  const sessions = await getMentorSessionsPageData();

  return (
    <div className="p-4 md:p-8">
      <MentorSessionsList sessions={sessions} isMentor />
    </div>
  );
}
