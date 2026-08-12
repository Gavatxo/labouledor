import AdminHeader from "../AdminHeader";
import PhotoManager from "../PhotoManager";
import { getAllPhotos } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function GaleriePage({ searchParams }: { searchParams: Promise<{ perror?: string }> }) {
  const [photos, { perror }] = await Promise.all([getAllPhotos(), searchParams]);

  return (
    <>
      <AdminHeader />
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(28px,4vw,48px) 24px" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", margin: 0 }}>Galerie</h1>
        <p style={{ fontSize: 15, color: "rgba(27,24,21,.6)", margin: "6px 0 0" }}>
          {photos.length} photo{photos.length > 1 ? "s" : ""} · ajoutez des images à n&apos;importe quelle catégorie de « La vie du club ».
        </p>
        <PhotoManager
          photos={photos}
          redirectTo="/admin/galerie"
          defaultCategory="Vie du club"
          title="Ajouter une photo"
          subtitle="Choisissez la catégorie : la photo apparaît aussitôt dans la galerie du site."
          error={perror}
        />
      </main>
    </>
  );
}
