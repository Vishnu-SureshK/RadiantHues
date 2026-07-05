import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentRole } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Lessons",
  description: "Your Radiant Hues lesson materials."
};

export default async function LessonsPage() {
  // This route is gated by middleware (see src/proxy.ts), so by the time we
  // render, the student is signed in and `user` is available.
  const user = await currentUser();
  const role = await getCurrentRole();
  const firstName = user?.firstName;
  const isTeacher = role === "admin";

  return (
    <section className="section">
      <div className="container prose">
        <h1 className="page-title accent-gold">
          {firstName ? `Welcome, ${firstName}` : "Welcome"}
        </h1>

        {isTeacher ? (
          <>
            <p>
              You&rsquo;re signed in as the <strong>teacher (admin)</strong>.
              This is where you&rsquo;ll manage the lesson materials your
              students see.
            </p>
            <p>
              <Link className="button button-primary" href="/lessons/manage">
                Open admin tools
              </Link>
            </p>
          </>
        ) : (
          <>
            <p>
              This is your private lessons area. Only signed-in students can see
              this page—here you&rsquo;ll find the materials for your classes.
            </p>
            <p>
              Lesson content is coming soon. Once your teacher adds materials,
              they&rsquo;ll appear here for you to download and follow along.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
