import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

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
  metadataBase: new URL("https://labouledor-nibelle.fr"),
  title: {
    default: "La Boule d'Or Nibelloise — Club de pétanque à Nibelle (45)",
    template: "%s · La Boule d'Or Nibelloise",
  },
  description:
    "Club de pétanque de Nibelle, dans le Loiret. Jeune, convivial et ouvert à tous : concours, résultats, vie du club et adhésion.",
  openGraph: {
    title: "La Boule d'Or Nibelloise",
    description: "Club de pétanque de Nibelle (45) — concours, résultats et vie du club.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
