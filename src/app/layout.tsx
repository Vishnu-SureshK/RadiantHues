import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CanvasTexture } from "@/components/CanvasTexture";
import { siteConfig } from "@/content/siteContent";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Radiant Hues | Art lessons & gallery · Naperville",
    template: "%s | Radiant Hues"
  },
  description: siteConfig.description,
  openGraph: {
    title: "Radiant Hues",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Radiant Hues",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Hues",
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CanvasTexture />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
