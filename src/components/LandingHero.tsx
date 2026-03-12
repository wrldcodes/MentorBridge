import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  CardStack,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardProfilePic,
  CardName,
  CardRole,
  CardRate,
  CardTestimonialHeader,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./ui/carousel";
import React from "react";

const LandingHero = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-card/50 p-12 m-6 text-foreground">
      <h2 className="font-krona text-5xl md:text-7xl font-bold mb-6 leading-tight text-center">
        Connect with Your Perfect Mentor
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl text-center px-1">
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
      <section className="mt-20 md:mt-24 w-full">
        <Button className="mx-auto md:mx-0 flex" size="lg" variant="outline">
          Key Features
        </Button>
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 md:mb-6">
            Why Users Choose MentorBridge
          </h1>
          <div className="max-w-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Learning and growing in a new career path should be flexible and
              effective.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 md:mb-6">
              That&apos;s why MentorBridge connects mentees with experienced
              mentors for personalized guidance and support. Whether you&apos;re
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
      <section className="mt-20 md:mt-24 w-full">
        <CardStack className="md:gap-6">
          {/* Feature 1 */}
          <Card className="bg-card/70 border-border">
            <CardHeader>
              <CardTitle>Expert Mentorship</CardTitle>
              <CardDescription>Connect with industry leaders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/Mentorship.jpg"
                alt="Expert Mentorship"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted-foreground">
                Get personalized guidance from experienced professionals in your
                field.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-card/70 border-border">
            <CardHeader>
              <CardTitle>Flexible Learning</CardTitle>
              <CardDescription>Learn at your own pace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/Flexible-Learning.jpg"
                alt="Flexible Learning"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted-foreground">
                Schedule sessions that work best for you and your mentor.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-card/70 border-border">
            <CardHeader>
              <CardTitle>Career Growth</CardTitle>
              <CardDescription>Accelerate your career path</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/Professional-growth.jpg"
                alt="Career Growth"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted-foreground">
                Navigate transitions and achieve your professional goals.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-card/70 border-border">
            <CardHeader>
              <CardTitle>Certification</CardTitle>
              <CardDescription>Earn recognized credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src="/Certificate.jpg"
                alt="Certification"
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted-foreground">
                Get certified and boost your resume with verifiable credentials.
              </p>
            </CardContent>
          </Card>
        </CardStack>
      </section>
      <section className="mt-12   md:mt-24 relative w-full overflow-hidden rounded-2xl">
        <Image
          src="/hero-bgg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 sm:p-6 md:p-12 grid grid-cols-1 md:grid-cols-[45%_55%] gap-6 md:gap-8 items-center">
          <div className="max-w-md text-left">
            <h2 className="text-2xl sm:text-3xl font-krona font-light mb-3 md:mb-4 text-white">
              Join a Thriving Community of Mentors and Mentees
            </h2>
            <p className="text-sm sm:text-base text-slate-200 mb-5 md:mb-6">
              As a mentor earn money while sharing your expertise, and as a
              mentee, gain invaluable insights and guidance to accelerate your
              career growth.
            </p>
            <Link href="/signup">
              <Button
                className="mt-2 md:mt-4 w-full sm:w-auto"
                size="lg"
                variant="outline"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <p className="hidden text-slate-200 text-sm sm:text-base mt-4">
              Thousands of users have already experienced power of our App!
            </p>
            <div className="hidden sm:flex flex-wrap -space-x-3 mt-5 md:mt-6">
              <CardProfilePic>
                <Image
                  src="/isabella-ekeson.jpg"
                  alt="profile picture of Isabella Ekeson"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </CardProfilePic>
              <CardProfilePic>
                <Image
                  src="/Ruth-anderson.jpg"
                  alt="profile picture of Ruth Anderson"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </CardProfilePic>
              <CardProfilePic>
                <Image
                  src="/bryanqueen.png"
                  alt="profile picture of Bryan Queen"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </CardProfilePic>
              <CardProfilePic>
                <Image
                  src="/ogbonachuks.jpg"
                  alt="profile picture of Kolu Ogbonochukwu"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </CardProfilePic>
              <CardProfilePic>
                <Image
                  src="/francis-kinley.jpg"
                  alt="profile picture of Francis Kinley"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </CardProfilePic>
              <CardProfilePic>
                <span className="flex font-medium items-center justify-center w-full h-full bg-white text-black text-xs rounded-full">
                  +1k
                </span>
              </CardProfilePic>
            </div>
          </div>
          <div className="hidden md:flex md:justify-center lg:justify-end md:items-center md:gap-4 lg:-space-x-5">
            <Image
              src="/mentor-earning.jpg"
              alt="Mentor earning"
              width={260}
              height={240}
              className="rounded-2xl object-cover shadow-2xl translate-y-0 flex-shrink-0"
            />
            <Image
              src="/dashboard-earning.jpg"
              alt="Dashboard earning"
              width={300}
              height={260}
              className="hidden lg:block rounded-2xl object-cover shadow-2xl -translate-y-14 flex-shrink-0"
            />
          </div>
        </div>
      </section>
      <section className="mt-12 md:mt-24 w-full">
        <div className="mb-8 text-center max-w-2xl mx-auto px-2 sm:px-6">
          <Button className="mb-8" size="lg" variant="outline">
            Testimonials
          </Button>
          <h2 className="font-krona text-2xl sm:text-4xl md:text-6xl font-light mb-4 md:mb-6 leading-tight">
            What Our Users Are Saying
          </h2>
          <p className="text-muted-foreground">
            Join thousands of mentees and mentors who have transformed their
            careers with MentorBridge.
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-12">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/ogbonachuks.jpg"
                          alt="profile picture of Kolu Ogbonochukwu"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Kolu Ogbonochukwu</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentee
                      </CardRole>
                    }
                    rating={<CardRate>5.0</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Great platform! I found an amazing mentor who helped me
                      switch careers. The sessions were flexible and tailored to
                      my needs.
                    </p>
                    <p className="text-muted-foreground">
                      I started with a free plan but after seeing the value, I
                      upgraded to premium for more features. The certification I
                      earned helped me secure a new job!
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/bryanqueen.png"
                          alt="profile picture of Bryan Queen"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Bryan Queen</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentor
                      </CardRole>
                    }
                    rating={<CardRate>4.9</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Being a mentor on MentorBridge has been an incredible
                      experience. I&apos;ve been able to share my knowledge and
                      help others grow in their careers.
                    </p>
                    <p className="text-muted-foreground">
                      The platform makes it easy to connect with mentees and
                      manage sessions while earning money.
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/white-pp.jpg"
                          alt="profile picture of Madison Riele"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Madison Riele</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentee
                      </CardRole>
                    }
                    rating={<CardRate>5.0</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      MentorBridge connected me with a mentor who truly
                      understood my goals. The personalized guidance and support
                      I received were invaluable.
                    </p>
                    <p className="text-muted-foreground">
                      Transitioning to a new career felt daunting, but with my
                      mentor&apos;s help, I gained confidence and clarity.
                      Highly recommend!
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/Ruth-anderson.jpg"
                          alt="profile picture of Ruth Anderson"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Ruth Anderson</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentor
                      </CardRole>
                    }
                    rating={<CardRate>5.0</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      As a senior developer, I wanted to give back to the tech
                      community. MentorBridge made it simple to connect with
                      talented mentees.
                    </p>
                    <p className="text-muted-foreground">
                      The structured platform helps me provide better guidance,
                      and I&apos;ve watched several of my mentees land great
                      jobs. Rewarding experience!
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/isabella-ekeson.jpg"
                          alt="profile picture of Isabella Ekeson"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Isabella Ekeson</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentee
                      </CardRole>
                    }
                    rating={<CardRate>4.8</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      I was intimidated about starting my tech career, but my
                      mentor on MentorBridge was patient and encouraging. She
                      helped me build a portfolio and land interviews.
                    </p>
                    <p className="text-muted-foreground">
                      Six months in, and I&apos;m thriving in my first junior
                      developer role. This platform truly changed my life!
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="md:basis-1/3">
                <Card className="bg-card/70 border-border h-full">
                  <CardTestimonialHeader
                    profilePic={
                      <CardProfilePic>
                        <Image
                          src="/francis-kinley.jpg"
                          alt="profile picture of Francis Kinley"
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </CardProfilePic>
                    }
                    name={<CardName>Francis Kinley</CardName>}
                    role={
                      <CardRole className="text-muted-foreground">
                        Mentee
                      </CardRole>
                    }
                    rating={<CardRate>4.9</CardRate>}
                  />

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      MentorBridge provided me with the resources and support I
                      needed to transition into a project management role. My
                      mentor was knowledgeable and helped me navigate
                      challenges.
                    </p>
                    <p className="text-muted-foreground">
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
  );
};

export default LandingHero;
