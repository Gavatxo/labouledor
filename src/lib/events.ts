import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { concours, type ConcoursRow } from "@/db/schema";

const MONTHS = ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

/** Forme consommée par l'UI publique — identique à l'ancien tableau statique. */
export type DisplayEvent = {
  id: number;
  day: string;
  month: string;
  /** Libellé complet, ex. « samedi 29 août ». */
  dateLabel: string;
  name: string;
  type: string;
  time: string;
  place: string;
  price: string;
  dotation: string;
  left: string;
  pct: string;
  tag: "Ouvert" | "Bientôt" | "Terminé";
  past: boolean;
  desc: string;
};

function isPast(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

export function toDisplay(r: ConcoursRow): DisplayEvent {
  const d = r.eventDate instanceof Date ? r.eventDate : new Date(r.eventDate as unknown as string);
  const past = isPast(d);
  const tag: DisplayEvent["tag"] = past ? "Terminé" : r.status === "bientot" ? "Bientôt" : "Ouvert";
  return {
    id: r.id,
    day: String(d.getDate()).padStart(2, "0"),
    month: MONTHS[d.getMonth()] ?? "",
    dateLabel: d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
    name: r.name,
    type: r.type,
    time: r.time,
    place: r.place,
    price: r.price,
    dotation: r.dotation,
    left: r.places,
    pct: `${r.fillPct}%`,
    tag,
    past,
    desc: r.description,
  };
}

/** Tous les concours : à venir (plus proche d'abord) puis passés (plus récent d'abord). */
export async function getEvents(): Promise<DisplayEvent[]> {
  const rows = await getDb().select().from(concours).orderBy(asc(concours.eventDate));
  const display = rows.map(toDisplay);
  const upcoming = display.filter((e) => !e.past);
  const past = display.filter((e) => e.past).reverse();
  return [...upcoming, ...past];
}

/** Ligne brute (pour préremplir le formulaire d'édition admin). */
export async function getConcoursRow(id: number): Promise<ConcoursRow | null> {
  const [row] = await getDb().select().from(concours).where(eq(concours.id, id));
  return row ?? null;
}

/** Toutes les lignes brutes triées par date décroissante (liste admin). */
export async function getAllRows(): Promise<ConcoursRow[]> {
  return getDb().select().from(concours).orderBy(desc(concours.eventDate));
}
