import Image from "next/image";
import Link from "next/link";
import { Timestamp } from "@/app/components/Timestamp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/app/components/ui/carousel";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardProfile,
  CardProfilePic,
  CardName,
  CardRate,
  CardTitle,
  CardDescription,
  CardContent,
  CardRole,
  CardTestimonialHeader,
} from "@/app/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-card/50 p-12 m-6">
        <h2 className="font-krona text-5xl md:text-7xl font-bold mb-6 leading-tight text-center text-white">
          Connect with Your Perfect Mentor
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl text-center">
          Bridge the gap between ambition and expertise. Find mentors, share
          knowledge, and grow together.
        </p>
        <div className="flex gap-4">
          <Link href="/signup?role=mentee">
            <Button size="lg" variant="outline">
              Find a Mentor
            </Button>
          </Link>
          <Link href="/signup?role=mentor">
            <Button size="lg" variant="secondary">
              Become a Mentor
            </Button>
          </Link>
        </div>
        <section className="mt-24">
          <Button size="lg" variant="outline">
            Key Features
          </Button>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <h1 className="text-2xl font-bold mb-6 text-white">
              Why Users Choose MentorBridge
            </h1>
            <div className="max-w-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Learning and growing in a new career path should be flexible and
                effective.
              </h2>
              <p className="text-slate-200 mb-6">
                That's why MentorBridge connects mentees with experienced
                mentors for personalized guidance and support. Whether you're
                looking to develop new skills, navigate career transitions, or
                achieve specific goals, our platform makes it easy to find the
                right mentor for your needs.
              </p>
              <Button className="rounded-full" size="lg" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-32 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="bg-card/70 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Expert Mentorship</CardTitle>
                <CardDescription>Connect with industry leaders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="Mentorship.jpg"
                  alt="Expert Mentorship"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-slate-200">
                  Get personalized guidance from experienced professionals in
                  your field.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-card/70 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Flexible Learning</CardTitle>
                <CardDescription>Learn at your own pace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="flexible-learning.jpg"
                  alt="Flexible Learning"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-slate-200">
                  Schedule sessions that work best for you and your mentor.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-card/70 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Career Growth</CardTitle>
                <CardDescription>Accelerate your career path</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="Professional-growth.jpg"
                  alt="Career Growth"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-slate-200">
                  Navigate transitions and achieve your professional goals.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-card/70 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Certification</CardTitle>
                <CardDescription>Earn recognized credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="Certificate.jpg"
                  alt="Certification"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-slate-200">
                  Get certified and boost your resume with verifiable
                  credentials.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-24"> bitch wassup</section>
        <section className="mt-12 md:mt-24 w-full">
          <div className="mt-8 md:mt-12 mb-8 text-center max-w-2xl mx-auto">
            <Button className="mb-8" size="lg" variant="outline">
              Testimonials
            </Button>
            <h2 className="font-krona text-4xl md:text-6xl font-light mb-6 leading-tight text-white">
              What Our Users Are Saying
            </h2>
            <p>
              Join thousands of mentees and mentors who have transformed their
              careers with MentorBridge.
            </p>
          </div>
          <div className="w-full max-w-6xl mx-auto px-12">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="ogbonachuks.jpg"
                            alt="profile picture of Kolu Ogbonochukwu"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">
                          Kolu Ogbonochukwu
                        </CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentee</CardRole>
                      }
                      rating={<CardRate className="text-white">5.0</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        Great platform! I found an amazing mentor who helped me
                        switch careers. The sessions were flexible and tailored
                        to my needs.
                      </p>
                      <p className="text-slate-200">
                        I started with a free plan but after seeing the value, I
                        upgraded to premium for more features. The certification
                        I earned helped me secure a new job!
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="bryanqueen.png"
                            alt="profile picture of Bryan Queen"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">Bryan Queen</CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentor</CardRole>
                      }
                      rating={<CardRate className="text-white">4.9</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        Being a mentor on MentorBridge has been an incredible
                        experience. I've been able to share my knowledge and
                        help others grow in their careers.
                      </p>
                      <p className="text-slate-200">
                        The platform makes it easy to connect with mentees and
                        manage sessions while earning money.
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="white-pp.jpg"
                            alt="profile picture of Madison Riele"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">
                          Madison Riele
                        </CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentee</CardRole>
                      }
                      rating={<CardRate className="text-white">5.0</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        MentorBridge connected me with a mentor who truly
                        understood my goals. The personalized guidance and
                        support I received were invaluable.
                      </p>
                      <p className="text-slate-200">
                        Transitioning to a new career felt daunting, but with my
                        mentor's help, I gained confidence and clarity. Highly
                        recommend!
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="Ruth-anderson.jpg"
                            alt="profile picture of Ruth Anderson"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">
                          Ruth Anderson
                        </CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentor</CardRole>
                      }
                      rating={<CardRate className="text-white">5.0</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        As a senior developer, I wanted to give back to the tech
                        community. MentorBridge made it simple to connect with
                        talented mentees.
                      </p>
                      <p className="text-slate-200">
                        The structured platform helps me provide better
                        guidance, and I've watched several of my mentees land
                        great jobs. Rewarding experience!
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="isabella-ekeson.jpg"
                            alt="profile picture of Isabella Ekeson"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">
                          Isabella Ekeson
                        </CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentee</CardRole>
                      }
                      rating={<CardRate className="text-white">4.8</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        I was intimidated about starting my tech career, but my
                        mentor on MentorBridge was patient and encouraging. She
                        helped me build a portfolio and land interviews.
                      </p>
                      <p className="text-slate-200">
                        Six months in, and I'm thriving in my first junior
                        developer role. This platform truly changed my life!
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/3">
                  <Card className="bg-card/70 border-slate-700 h-full">
                    <CardTestimonialHeader
                      profilePic={
                        <CardProfilePic>
                          <img
                            src="francis-kinley.jpg"
                            alt="profile picture of Francis Kinley"
                          />
                        </CardProfilePic>
                      }
                      name={
                        <CardName className="text-white">
                          Francis Kinley
                        </CardName>
                      }
                      role={
                        <CardRole className="text-slate-400">Mentee</CardRole>
                      }
                      rating={<CardRate className="text-white">4.9</CardRate>}
                    />

                    <CardContent className="space-y-4">
                      <p className="text-slate-200">
                        MentorBridge provided me with the resources and support
                        I needed to transition into a project management role.
                        My mentor was knowledgeable and helped me navigate
                        challenges.
                      </p>
                      <p className="text-slate-200">
                        I was able to land a position within three months of
                        starting the program. Highly recommend to anyone looking
                        to grow their career!
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
}
