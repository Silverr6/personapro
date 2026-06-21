import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FBF7EC",
};

export const metadata: Metadata = {
  title: "PersonaPro — Your career glow-up, powered by AI",
  description:
    "Drop your CV, get the glow-up: an honest score, a rewritten resume, a full LinkedIn makeover, and a personal brand — in seconds, in 4 languages.",
  keywords: ["CV", "resume", "LinkedIn", "AI", "career", "students", "PersonaPro"],
  openGraph: {
    title: "PersonaPro — Your career glow-up, powered by AI",
    description: "Drop your CV, get an honest score, a rewritten resume, and a full LinkedIn makeover in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
