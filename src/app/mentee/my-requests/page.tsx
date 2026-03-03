import { MenteeRequestsList } from "@/components/MenteeRequestsList";
import { getMenteeMyRequestsPageData } from "@/hooks/useMenteeMyRequestsPageData";

export default async function MenteeMyRequestsPage() {
  const requests = await getMenteeMyRequestsPageData();

  return (
    <div className="p-4 md:p-8">
      <MenteeRequestsList initialRequests={requests} />
    </div>
  );
}
