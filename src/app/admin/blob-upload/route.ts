import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Délivre les jetons d'upload client Vercel Blob.
 * Le navigateur envoie les fichiers directement à Blob (pas via un Server
 * Action), ce qui contourne la limite de taille de requête de la plateforme
 * et permet d'ajouter plusieurs images d'un coup. Protégé par la session admin.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
        maximumSizeInBytes: 8 * 1024 * 1024, // 8 Mo par image
        addRandomSuffix: true,
      }),
      // L'insertion en base se fait via le Server Action `attachPhotos`, appelé
      // par le client une fois les uploads terminés (onUploadCompleted ne se
      // déclenche pas en local).
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
