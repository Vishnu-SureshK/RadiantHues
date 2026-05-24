import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Radiant Hues about commissions and collaborations."
};

type ContactPageProps = {
  searchParams: Promise<{ status?: string }>;
};

const statusContent: Record<string, string> = {
  sent: "Your inquiry was sent successfully.",
  invalid: "Please complete all fields with a valid email.",
  failed: "Something went wrong while sending your inquiry. Please try again.",
  unconfigured: "Contact form is not configured yet. Add email environment variables."
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const statusMessage = params.status ? statusContent[params.status] : undefined;

  return (
    <section className="section">
      <div className="container contact-wrap">
        <div>
          <h1 className="page-title">Contact</h1>
          <p className="page-intro">
            Interested in art lessons or purchasing an artwork? Share your details and we will get back to you quickly.
          </p>
          <div className="contact-image">
            <MediaPlaceholder label="Featured artwork — add an image for this section" variant="card" />
          </div>
          {statusMessage ? <p className="status-message">{statusMessage}</p> : null}
        </div>

        <form className="contact-form" action="/api/contact" method="POST">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={6} required />

          {/* Honeypot field for basic spam filtering */}
          <input aria-hidden="true" autoComplete="off" name="website" tabIndex={-1} className="hidden-honeypot" />

          <button className="button button-primary" type="submit">
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
