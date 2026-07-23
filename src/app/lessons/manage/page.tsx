import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Manage lessons",
  description: "Admin area for managing Radiant Hues lesson materials."
};

export default async function ManageLessonsPage() {
  // Defense in depth: middleware already blocks non-admins, but re-check here
  // so this page can never render for a student.
  if (!(await isAdmin())) {
    redirect("/lessons");
  }

  return (
    <section className="section">
      <div className="container prose">
        <h1 className="page-title accent-gold">Manage lessons</h1>
        <p>
          This admin area is only visible to you, the teacher. Here you&rsquo;ll
          add and organize the materials your students see on their Lessons
          page.
        </p>

        <div className="class-grid">
          <div className="class-card">
            <h3>Lesson materials</h3>
            <p className="class-body">
              Upload PDFs, images, and notes for each class. Students will see
              these on their Lessons page.
            </p>
            <span className="class-status">Coming soon</span>
          </div>

          <div className="class-card">
            <h3>Students</h3>
            <p className="class-body">
              See who has signed up and manage access to your lessons.
            </p>
            <span className="class-status">Coming soon</span>
          </div>

          <div className="class-card">
            <h3>Classes</h3>
            <p className="class-body">
              Group materials by class or level so the right students see the
              right lessons.
            </p>
            <span className="class-status">Coming soon</span>
          </div>
        </div>

        <p style={{ marginTop: "2rem" }}>
          <Link href="/lessons">&larr; Back to Lessons</Link>
        </p>
      </div>
    </section>
  );
}
