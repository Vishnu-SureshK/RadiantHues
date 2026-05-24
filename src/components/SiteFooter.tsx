import Link from "next/link";
import { navLinks, siteConfig } from "@/content/siteContent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          {siteConfig.name} &copy; {year}. Kerala-inspired art, teaching, and creative community.
        </p>
        <ul className="footer-links">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
