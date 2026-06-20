import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PersonaPro — AI Career Makeover",
  description:
    "Upload your CV and get an AI-powered career optimization: CV critique and score, rewritten resume, full LinkedIn profile makeover, and personal branding — in 4 languages.",
  keywords: ["CV", "resume", "LinkedIn", "AI", "career", "PersonaPro"],
  openGraph: {
    title: "PersonaPro — AI Career Makeover",
    description: "AI-powered CV critique, LinkedIn overhaul, and personal branding in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
