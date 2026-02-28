import Link from "next/link";
import { Timestamp } from "./Timestamp";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="page-container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              MentorBridge
            </h3>
            <p className="text-secondary">
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
                  className="text-secondary hover:text-primary transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-secondary hover:text-primary transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-secondary hover:text-primary transition"
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
                  className="text-secondary hover:text-primary transition"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition"
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
                  className="text-secondary hover:text-primary transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-secondary">
            &copy; <Timestamp /> MentorBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
