import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Radiant Hues account to access lessons."
};

export default function SignUpPage() {
  return (
    <section className="section">
      <div className="container auth-page">
        <SignUp />
      </div>
    </section>
  );
}
