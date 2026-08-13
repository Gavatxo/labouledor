import type { Metadata } from "next";
import VieView from "./VieView";
import { getGalleryPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "La vie du club",
  description: "L'album de La Boule d'Or Nibelloise : concours, entraînements, repas et soirées à Nibelle.",
  alternates: { canonical: "/vie" },
};

export const dynamic = "force-dynamic";

export default async function ViePage() {
  const photos = await getGalleryPhotos();
  return <VieView photos={photos} />;
}
