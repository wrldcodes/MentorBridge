import Link from "next/link";
import { Timestamp } from "@/app/components/Timestamp";
import { Button } from "@/app/components/ui/button";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border rounded-3xl p-1 m-3 text-black bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className=" text-black font-krona">
            MentorBridge
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-black hover:text-primary transition"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-black hover:text-primary transition"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-black hover:text-primary transition"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button className="text-white" variant="outline">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-black bg-gray-200">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                MentorBridge
              </h3>
              <p className="text-sm text-muted-foreground">
                Connect with mentors and grow your skills.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; <Timestamp /> MentorBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
