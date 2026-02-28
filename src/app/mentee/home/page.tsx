import { getCurrentUser } from "@/lib/auth";
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
import Link from "next/link";

export default async function MenteeDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="p-1">
      <CurrentDate />
      <header>
        <h1 className="text-4xl font-semibold mt-4">
          <TimeGreeting name={user?.name} />
        </h1>
      </header>

      <div className="panel mt-8">
        <div className="flex flex-wrap gap-3 px-2 py-6 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-dark-border-subtle">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Sessions Today</CardTitle>
              <CardDescription>
                Your mentoring sessions for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/my-sessions">Check Schedule</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Active Mentors</CardTitle>
              <CardDescription>Mentors currently guiding you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/my-sessions">View Mentors</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                Requests awaiting mentor response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">0</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/my-requests">View Requests</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Available Mentors</CardTitle>
              <CardDescription>Browse and connect with mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">24+</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/mentors">Find Mentors</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upcoming Session</CardTitle>
              <CardAction>
                <Button asChild size="sm" variant="outline">
                  <Link href="/my-sessions">Open Sessions</Link>
                </Button>
              </CardAction>
              <CardDescription>Your next mentoring session</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">
                No upcoming session scheduled yet. Browse mentors to get
                started!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 px-8 py-6">
          <Card className="half-card">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Sessions attended this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">No data yet.</p>
            </CardContent>
          </Card>

          <Card className="half-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">You are all caught up.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
