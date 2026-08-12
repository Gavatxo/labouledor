import { pgTable, serial, text, integer, date, timestamp } from "drizzle-orm/pg-core";

/** Un concours du club. Source de vérité = cette table (remplace le tableau statique). */
export const concours = pgTable("concours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  /** Date réelle du concours — day/month/past sont dérivés à l'affichage. */
  eventDate: date("event_date", { mode: "date" }).notNull(),
  type: text("type").notNull().default("Doublette"),
  time: text("time").notNull().default("14h30"),
  place: text("place").notNull().default(""),
  price: text("price").notNull().default("Gratuit"),
  dotation: text("dotation").notNull().default(""),
  /** Texte libre affiché (ex. « 11 places restantes »). */
  places: text("places").notNull().default(""),
  /** Remplissage 0–100 pour la barre de progression. */
  fillPct: integer("fill_pct").notNull().default(0),
  /** 'ouvert' | 'bientot' — « Terminé » est dérivé automatiquement des dates passées. */
  status: text("status").notNull().default("ouvert"),
  description: text("description").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ConcoursRow = typeof concours.$inferSelect;
export type NewConcours = typeof concours.$inferInsert;

/** Une photo de la galerie, éventuellement rattachée à un concours. */
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  /** URL publique (Vercel Blob en prod, /uploads/… en local). */
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  /** Catégorie de galerie (Concours, Vie du club, Événements…). */
  category: text("category").notNull().default("Concours"),
  /** Concours d'origine (null si photo autonome). */
  concoursId: integer("concours_id").references(() => concours.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PhotoRow = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;
