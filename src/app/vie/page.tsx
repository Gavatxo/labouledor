import type { Metadata } from "next";
import VieView from "./VieView";

export const metadata: Metadata = {
  title: "La vie du club",
  description: "L'album de La Boule d'Or Nibelloise : concours, entraînements, repas et soirées à Nibelle.",
};

export default function ViePage() {
  return <VieView />;
}
