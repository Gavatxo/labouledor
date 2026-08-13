import type { Metadata } from "next";
import RejoindreView from "./RejoindreView";

export const metadata: Metadata = {
  title: "Rejoindre le club",
  description: "Rejoignez La Boule d'Or Nibelloise : comment ça marche, tarifs d'adhésion et formulaire de contact.",
  alternates: { canonical: "/rejoindre" },
};

export default function RejoindrePage() {
  return <RejoindreView />;
}
