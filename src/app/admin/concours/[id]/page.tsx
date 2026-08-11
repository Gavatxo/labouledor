import Link from "next/link";
import { notFound } from "next/navigation";
import AdminHeader from "../../AdminHeader";
import ConcoursForm from "../../ConcoursForm";
import { getConcoursRow } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function EditConcoursPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getConcoursRow(Number(id));
  if (!row) notFound();

  return (
    <>
      <AdminHeader />
      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(28px,4vw,48px) 24px" }}>
        <Link href="/admin" style={{ fontSize: 13, color: "rgba(27,24,21,.6)" }}>← Retour</Link>
        <h1 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "12px 0 24px" }}>Modifier le concours</h1>
        <ConcoursForm row={row} />
      </main>
    </>
  );
}
