import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Silambarasu ❖ Prathiksha — A Sacred Union";
const description =
  "We cordially invite you to celebrate our union — Reception 24 May & Muhurtham 25 May 2026, Pollachi & Udumalpet.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Silambarasu & Prathiksha — Wedding Invitation",
  authors: [{ name: "Silambarasu & Prathiksha" }],
  keywords: [
    "Silambarasu",
    "Prathiksha",
    "wedding",
    "Tamil wedding",
    "Muhurtham",
    "Reception",
    "Pollachi",
    "Udumalpet",
    "May 2026",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Silambarasu & Prathiksha",
    title,
    description,
    images: [
      {
        url: "/reception.jpeg",
        width: 768,
        height: 1024,
        alt: "Silambarasu & Prathiksha — Wedding invitation",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/reception.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "personal",
};

export const viewport: Viewport = {
  themeColor: "#fdf6e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${inter.variable} ${pinyon.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
