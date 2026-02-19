import { CurrentDate, TimeGreeting } from "@/app/components/Timestamp";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function MentorDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="p-1">
      <CurrentDate />
      <header>
        <h1 className="text-4xl font-semibold mt-4">
          <TimeGreeting name={user?.name} />
        </h1>
      </header>

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-subtle bg-white dark:bg-[#121212] shadow-sm mt-8">
        <div className="flex flex-wrap gap-3 px-2 py-6 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-dark-border-subtle">
          <Card className="flex-1 min-w-full sm:min-w-[calc(50%-0.375rem)] lg:min-w-[calc(25%-0.75rem)]">
            <CardHeader>
              <CardTitle>Sessions Today</CardTitle>
              <CardDescription>
                Your mentoring sessions for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/sessions">Check Schedule</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1 min-w-full sm:min-w-[calc(50%-0.375rem)] lg:min-w-[calc(25%-0.75rem)]">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                New mentee requests waiting for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/requests">View Requests</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1 min-w-full sm:min-w-[calc(50%-0.375rem)] lg:min-w-[calc(25%-0.75rem)]">
            <CardHeader>
              <CardTitle>Active Mentees</CardTitle>
              <CardDescription>
                Mentees currently assigned to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/my-requests">Manage Mentees</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1 min-w-full sm:min-w-[calc(50%-0.375rem)] lg:min-w-[calc(25%-0.75rem)]">
            <CardHeader>
              <CardTitle>Total Sessions</CardTitle>
              <CardDescription>
                All completed mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/sessions">View All</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upcoming Session</CardTitle>
              <CardAction>
                <Button asChild size="sm" variant="outline">
                  <Link href="/sessions">Open Sessions</Link>
                </Button>
              </CardAction>
              <CardDescription>Your next mentoring slot</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No upcoming session scheduled yet.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 px-8 py-6">
          <Card className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Sessions completed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No data yet.</p>
            </CardContent>
          </Card>

          <Card className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You are all caught up.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
