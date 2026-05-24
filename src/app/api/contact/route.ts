import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (website) {
    return NextResponse.redirect(new URL("/contact?status=ok", request.url), 303);
  }

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.redirect(new URL("/contact?status=invalid", request.url), 303);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendApiKey || !to) {
    return NextResponse.redirect(new URL("/contact?status=unconfigured", request.url), 303);
  }

  const payload = {
    from,
    to,
    subject: `Radiant Hues Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`
  };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/contact?status=failed", request.url), 303);
    }

    return NextResponse.redirect(new URL("/contact?status=sent", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/contact?status=failed", request.url), 303);
  }
}
