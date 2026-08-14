import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { SITE_URL, CLUB } from "@/data/club";

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Boule d'Or Nibelloise — Club de pétanque à Nibelle (45)",
    template: "%s · La Boule d'Or Nibelloise",
  },
  description:
    "Club de pétanque de Nibelle, dans le Loiret. Jeune, convivial et ouvert à tous : concours, vie du club et adhésion.",
  applicationName: "La Boule d'Or Nibelloise",
  keywords: [
    "pétanque Nibelle",
    "club de pétanque Loiret",
    "La Boule d'Or Nibelloise",
    "concours de pétanque 45",
    "boulodrome Nibelle",
    "pétanque 45340",
  ],
  authors: [{ name: "La Boule d'Or Nibelloise" }],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/assets/favicon.png", type: "image/png" }],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    title: "La Boule d'Or Nibelloise — Club de pétanque à Nibelle (45)",
    description: "Club de pétanque de Nibelle (45), dans le Loiret — concours, vie du club et adhésion.",
    url: SITE_URL,
    siteName: "La Boule d'Or Nibelloise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Boule d'Or Nibelloise — Club de pétanque à Nibelle (45)",
    description: "Club de pétanque de Nibelle (45), dans le Loiret — concours, vie du club et adhésion.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: CLUB.fullName,
  sport: "Pétanque",
  url: SITE_URL,
  email: CLUB.email,
  foundingDate: CLUB.foundedYear,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue du Stade",
    addressLocality: "Nibelle",
    postalCode: "45340",
    addressRegion: "Loiret",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 48.0089, longitude: 2.3374 },
  areaServed: "Nibelle et le Loiret",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
