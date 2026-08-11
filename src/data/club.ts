/* ══════════════════════════════════════════════════════════════════════
   Données du club — SOURCE UNIQUE À ÉDITER.
   Pour mettre à jour le site (concours, résultats, membres, infos), il
   suffit de modifier ce fichier.

   PHOTOS : les 3 visuels ci-dessous sont des placeholders. Déposez vos
   vraies photos dans /public/assets/ (ex. equipe.jpg) puis remplacez le
   chemin correspondant dans IMAGES.
   ══════════════════════════════════════════════════════════════════════ */

export const CLUB = {
  name: "La Boule d'Or",
  fullName: "La Boule d'Or Nibelloise",
  place: "Nibelle · Loiret",
  foundedYear: "2026",
  email: "contact@labouledor-nibelle.fr",
  phone: "06 00 00 00 00",
  address: "Boulodrome de Nibelle — Rue du Stade, 45340 Nibelle",
} as const;

export const IMAGES = {
  equipe: "/assets/equipe.svg",
  podium1: "/assets/podium-1.svg",
  podium2: "/assets/podium-2.svg",
} as const;

export type NavItem = { href: string; label: string };

export const NAV: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/concours", label: "Concours" },
  { href: "/resultats", label: "Résultats" },
  { href: "/club", label: "Le club" },
  { href: "/vie", label: "La vie du club" },
  { href: "/nous-trouver", label: "Nous trouver" },
];

export const NAV_MOBILE: NavItem[] = [...NAV, { href: "/rejoindre", label: "Rejoindre" }];

export type ClubEvent = {
  id: number;
  day: string;
  month: string;
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

export const EVENTS: ClubEvent[] = [
  {
    id: 1, day: "29", month: "Août", name: "Concours du Camping", type: "Doublette",
    time: "14h30", place: "Camping de Nibelle", price: "Gratuit", dotation: "Coupes + lots",
    left: "11 places restantes", pct: "66%", tag: "Ouvert", past: false,
    desc: "Le rendez-vous de la fin d'été : doublettes formées sur place, buvette, barbecue et remise des prix au coucher du soleil.",
  },
  {
    id: 2, day: "19", month: "Sept", name: "Concours de rentrée", type: "Triplette",
    time: "14h00", place: "Boulodrome de Nibelle", price: "8 € / équipe", dotation: "300 € + lots",
    left: "24 places restantes", pct: "40%", tag: "Ouvert", past: false,
    desc: "Triplettes formées, ouvert aux licenciés et non-licenciés. Concours complémentaire pour les éliminés.",
  },
  {
    id: 3, day: "10", month: "Oct", name: "La Nocturne", type: "Doublette",
    time: "18h30", place: "Boulodrome de Nibelle", price: "6 € / équipe", dotation: "Paniers garnis",
    left: "32 places restantes", pct: "18%", tag: "Bientôt", past: false,
    desc: "Concours en nocturne sous les projecteurs, soupe à l'oignon à minuit. Le plus convivial de la saison.",
  },
  {
    id: 4, day: "04", month: "Juil", name: "Concours d'été", type: "Doublette",
    time: "14h30", place: "Boulodrome de Nibelle", price: "6 € / équipe", dotation: "240 € + lots",
    left: "28 équipes engagées", pct: "100%", tag: "Terminé", past: true,
    desc: "28 équipes, une finale à la nuit tombée et une buvette dévalisée. Merci à tous.",
  },
  {
    id: 5, day: "14", month: "Juin", name: "Challenge du village", type: "Triplette",
    time: "14h00", place: "Place de l'Église", price: "Gratuit", dotation: "Trophée du village",
    left: "18 équipes engagées", pct: "100%", tag: "Terminé", past: true,
    desc: "Le concours des habitants : une équipe par rue, un trophée qui reste au café pendant un an.",
  },
];

/** Concours mis en avant (bandeau accueil + modale d'inscription). */
export const HIGHLIGHT = EVENTS[0];

export const CONCOURS_FILTERS = ["À venir", "Passés", "Doublette", "Triplette", "Tous"] as const;
export type ConcoursFilter = (typeof CONCOURS_FILTERS)[number];

export type ResultRow = { rank: string; team: string; score: string; winner?: boolean };
export type ClubResult = { name: string; date: string; type: string; photo: string; rows: ResultRow[] };

export const RESULTS: ClubResult[] = [
  {
    name: "Concours d'été", date: "4 juillet 2026", type: "Doublette · 28 équipes", photo: IMAGES.podium1,
    rows: [
      { rank: "1er", team: "Équipe A — vainqueurs", score: "13 – 9", winner: true },
      { rank: "2e", team: "Équipe B — finalistes", score: "9" },
      { rank: "3e", team: "Équipe C", score: "13 – 7" },
    ],
  },
  {
    name: "Challenge du village", date: "14 juin 2026", type: "Triplette · 18 équipes", photo: IMAGES.podium2,
    rows: [
      { rank: "1er", team: "Rue du Stade", score: "13 – 11", winner: true },
      { rank: "2e", team: "Place de l'Église", score: "11" },
      { rank: "3e", team: "Le Camping", score: "13 – 6" },
    ],
  },
];

export type Feature = { title: string; text: string; icon: string };
/** icon = clé SVG rendue par <FeatureIcon> */
export const FEATURES: Feature[] = [
  { icon: "trophy", title: "La compétition", text: "Des concours réguliers, un vrai niveau, mais jamais la prise de tête." },
  { icon: "handshake", title: "La convivialité", text: "On vient pour jouer, on reste pour la buvette et les discussions." },
  { icon: "calendar", title: "Les événements", text: "Nocturnes, repas, challenge du village : le club anime Nibelle." },
  { icon: "leaf", title: "Le village", text: "Faire vivre Nibelle, sa place, son terrain et ses commerces." },
  { icon: "users", title: "La communauté", text: "Tous les âges, tous les niveaux, licenciés ou pas." },
];

export const VALUES = [
  { n: "01", title: "Ouvert à tous", text: "Aucun niveau, aucun âge, aucune condition. On prête même les boules." },
  { n: "02", title: "Sans prise de tête", text: "On joue sérieusement sans se prendre au sérieux." },
  { n: "03", title: "Local avant tout", text: "Nos partenaires, nos bénévoles et nos joueurs viennent d'ici." },
  { n: "04", title: "Ça bouge", text: "Un club qui organise, qui invite, qui fait vivre le village." },
];

export type Member = { initials: string; name: string; role: string };
export const BUREAU: Member[] = [
  { initials: "?", name: "À compléter", role: "Président" },
  { initials: "?", name: "À compléter", role: "Trésorier" },
  { initials: "?", name: "À compléter", role: "Secrétaire" },
  { initials: "?", name: "À compléter", role: "Responsable concours" },
];

export const PARTNERS = [
  { label: "Votre logo" }, { label: "Votre logo" }, { label: "Votre logo" },
  { label: "Votre logo" }, { label: "Devenir partenaire" },
];

export const GALLERY_CATS = ["Tout", "Concours", "Vie du club", "Événements", "Entraînements", "Village", "Membres"] as const;
export type GalleryCat = (typeof GALLERY_CATS)[number];

export type Photo = { src: string; alt: string; cat: GalleryCat; h: string };
export const GALLERY: Photo[] = [
  { src: IMAGES.equipe, alt: "Soirée du club à Nibelle", cat: "Vie du club", h: "420px" },
  { src: IMAGES.podium1, alt: "Podium du concours d'été", cat: "Concours", h: "420px" },
  { src: IMAGES.podium2, alt: "Remise des prix", cat: "Concours", h: "320px" },
  { src: IMAGES.equipe, alt: "Les membres du club", cat: "Membres", h: "320px" },
  { src: "", alt: "", cat: "Village", h: "320px" },
  { src: "", alt: "", cat: "Entraînements", h: "320px" },
];

export const INFOS = [
  { label: "Adresse", value: "Boulodrome de Nibelle — Rue du Stade, 45340 Nibelle" },
  { label: "Accès & parking", value: "Parking gratuit devant le terrain, 40 places. Accessible à pied depuis la place du village." },
  { label: "Horaires", value: "Entraînement libre le mardi à partir de 18h · Concours les samedis annoncés" },
  { label: "Contact", value: "contact@labouledor-nibelle.fr · 06 00 00 00 00" },
];

export const STEPS = [
  { n: "1", title: "Viens essayer", text: "Passe un mardi soir au terrain, sans rien prévoir. On te prête tout." },
  { n: "2", title: "Remplis le formulaire", text: "Nom, contact, et on te rappelle dans la semaine." },
  { n: "3", title: "Prends ta licence", text: "On s'occupe des démarches FFPJP avec toi." },
  { n: "4", title: "Joue les concours", text: "Tu représentes La Boule d'Or partout dans le Loiret." },
];

export const LEVELS = ["Débutant", "Je joue en famille", "Licencié"] as const;

export const FOOTER_COLS = [
  {
    title: "Le club",
    links: [
      { label: "Notre histoire", href: "/club" },
      { label: "Le bureau", href: "/club" },
      { label: "La vie du club", href: "/vie" },
      { label: "Rejoindre", href: "/rejoindre" },
    ],
  },
  {
    title: "Jouer",
    links: [
      { label: "Les concours", href: "/concours" },
      { label: "Les résultats", href: "/resultats" },
      { label: "Nous trouver", href: "/nous-trouver" },
    ],
  },
];

/* Coordonnées OpenStreetMap du terrain (Nibelle). */
export const MAP = {
  embed:
    "https://www.openstreetmap.org/export/embed.html?bbox=2.318%2C48.000%2C2.358%2C48.019&layer=mapnik&marker=48.0089%2C2.3374",
  link: "https://www.openstreetmap.org/?mlat=48.0089&mlon=2.3374#map=15/48.0089/2.3374",
};
