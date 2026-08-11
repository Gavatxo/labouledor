import type { Metadata } from "next";
import ConcoursView from "./ConcoursView";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Les concours",
  description: "Le calendrier des concours de pétanque de La Boule d'Or Nibelloise : dates, formats, dotations et inscriptions.",
};

export const dynamic = "force-dynamic";

export default async function ConcoursPage() {
  const events = await getEvents();
  return <ConcoursView events={events} />;
}
