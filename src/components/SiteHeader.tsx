import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { navLinks, siteConfig } from "@/content/siteContent";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span>{siteConfig.name}</span>
          <small>Art Lessons and Gallery</small>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <Show when="signed-in">
              <li>
                <Link className="nav-link" href="/lessons">
                  Lessons
                </Link>
              </li>
            </Show>
            <li className="nav-auth">
              <Show when="signed-out">
                {/* Log in takes existing students to the sign-in page. */}
                <Link className="nav-link" href="/sign-in">
                  Log in
                </Link>
                {/* Sign up sends new students to the contact page to enroll. */}
                <Link className="button button-primary" href="/contact">
                  Sign up
                </Link>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
