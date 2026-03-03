import { MentorRequestsList } from "@/components/MentorRequestsList";
import { getMentorRequestsPageData } from "@/hooks/useMentorRequestsPageData";

export default async function MentorRequestsPage() {
  const requests = await getMentorRequestsPageData();

  return (
    <div className="p-4 md:p-8">
      <MentorRequestsList initialRequests={requests} />
    </div>
  );
}
