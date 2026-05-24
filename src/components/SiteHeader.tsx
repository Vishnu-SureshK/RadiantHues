import Link from "next/link";
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
