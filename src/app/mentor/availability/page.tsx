import { MentorAvailabilityManager } from "@/components/MentorAvailabilityManager";
import { getMentorAvailabilityPageData } from "@/hooks/useMentorAvailabilityPageData";

export default async function MentorAvailabilityPage() {
  const availability = await getMentorAvailabilityPageData();

  return (
    <div className="p-4 md:p-8">
      <MentorAvailabilityManager initialSlots={availability} />
    </div>
  );
}
