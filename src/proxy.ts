import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that require a signed-in student. Anyone hitting these while signed
// out is redirected to the sign-in page automatically.
const isProtectedRoute = createRouteMatcher(["/lessons(.*)"]);

// Admin-only routes — only the teacher (role "admin") may enter. Signed-in
// students are sent back to their Lessons page.
const isAdminRoute = createRouteMatcher(["/lessons/manage(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    if (sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.redirect(new URL("/lessons", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/__clerk/:path*"
  ]
};
