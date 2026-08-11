import type { Metadata } from "next";
import ConcoursView from "./ConcoursView";

export const metadata: Metadata = {
  title: "Les concours",
  description: "Le calendrier des concours de pétanque de La Boule d'Or Nibelloise : dates, formats, dotations et inscriptions.",
};

export default function ConcoursPage() {
  return <ConcoursView />;
}
