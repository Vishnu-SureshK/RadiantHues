import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access your Radiant Hues lessons."
};

export default function SignInPage() {
  return (
    <section className="section">
      <div className="container auth-page">
        {/* New students enroll via the contact page, so send "Sign up" there. */}
        <SignIn signUpUrl="/contact" />
      </div>
    </section>
  );
}
