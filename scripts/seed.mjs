// Seed initial des concours (idempotent : n'insère que si la table est vide).
// Usage : npm run db:seed   (charge .env via --env-file)
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL manquant (voir .env).");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });

const SEED = [
  { name: "Concours du Camping", event_date: "2026-08-29", type: "Doublette", time: "14h30", place: "Camping de Nibelle", price: "Gratuit", dotation: "Coupes + lots", places: "11 places restantes", fill_pct: 66, status: "ouvert", description: "Le rendez-vous de la fin d'été : doublettes formées sur place, buvette, barbecue et remise des prix au coucher du soleil." },
  { name: "Concours de rentrée", event_date: "2026-09-19", type: "Triplette", time: "14h00", place: "Boulodrome de Nibelle", price: "8 € / équipe", dotation: "300 € + lots", places: "24 places restantes", fill_pct: 40, status: "ouvert", description: "Triplettes formées, ouvert aux licenciés et non-licenciés. Concours complémentaire pour les éliminés." },
  { name: "La Nocturne", event_date: "2026-10-10", type: "Doublette", time: "18h30", place: "Boulodrome de Nibelle", price: "6 € / équipe", dotation: "Paniers garnis", places: "32 places restantes", fill_pct: 18, status: "bientot", description: "Concours en nocturne sous les projecteurs, soupe à l'oignon à minuit. Le plus convivial de la saison." },
  { name: "Concours d'été", event_date: "2026-07-04", type: "Doublette", time: "14h30", place: "Boulodrome de Nibelle", price: "6 € / équipe", dotation: "240 € + lots", places: "28 équipes engagées", fill_pct: 100, status: "ouvert", description: "28 équipes, une finale à la nuit tombée et une buvette dévalisée. Merci à tous." },
  { name: "Challenge du village", event_date: "2026-06-14", type: "Triplette", time: "14h00", place: "Place de l'Église", price: "Gratuit", dotation: "Trophée du village", places: "18 équipes engagées", fill_pct: 100, status: "ouvert", description: "Le concours des habitants : une équipe par rue, un trophée qui reste au café pendant un an." },
];

try {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM concours`;
  if (count > 0) {
    console.log(`La table contient déjà ${count} concours — seed ignoré.`);
  } else {
    for (const c of SEED) {
      await sql`INSERT INTO concours (name, event_date, type, time, place, price, dotation, places, fill_pct, status, description)
        VALUES (${c.name}, ${c.event_date}, ${c.type}, ${c.time}, ${c.place}, ${c.price}, ${c.dotation}, ${c.places}, ${c.fill_pct}, ${c.status}, ${c.description})`;
    }
    console.log(`✓ ${SEED.length} concours insérés.`);
  }
} catch (e) {
  console.error("Erreur de seed :", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
