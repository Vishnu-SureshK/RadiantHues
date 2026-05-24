import Link from "next/link";
import { navLinks, siteConfig } from "@/content/siteContent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-brand-name">{siteConfig.name}</p>
          <p className="footer-tagline">Kerala-inspired art, teaching, and creative community.</p>
        </div>
        <div className="footer-nav">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <p className="footer-contact">Naperville, Illinois</p>
          <Link href="/contact" className="footer-cta">Get in Touch</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
