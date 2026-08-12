# La Boule d'Or Nibelloise — site du club

Site vitrine du club de pétanque **La Boule d'Or Nibelloise** (Nibelle, Loiret).
Construit avec **Next.js (App Router) + TypeScript**, fidèle à la maquette « Site La Boule d'Or ».

## Démarrer

```bash
cp .env.example .env   # puis renseigner DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET
npm install
npm run db:push        # crée la table `concours` dans la base
npm run db:seed        # insère les concours de départ (idempotent)
npm run dev            # → http://localhost:3000  (back-office : /admin)
```

Autres scripts : `npm run build` (prod), `npm run start`, `npm run lint`.

### Base de données en local (Docker)

```bash
docker run -d --name bdo-pg \
  -e POSTGRES_USER=bdo -e POSTGRES_PASSWORD=bdo -e POSTGRES_DB=labouledor \
  -p 5432:5432 postgres:16-alpine
# DATABASE_URL="postgresql://bdo:bdo@localhost:5432/labouledor"
```
Arrêter / relancer : `docker stop bdo-pg` / `docker start bdo-pg`.

## Back-office (`/admin`)

Espace protégé par **mot de passe** (`ADMIN_PASSWORD`) pour gérer les concours :
créer, modifier, supprimer — les changements apparaissent **immédiatement** sur
l'accueil et la page `/concours`.

- Connexion : `/admin` → redirige vers `/admin/login`.
- Les concours sont stockés en base (table `concours`), plus dans le code.
- Depuis la page d'édition d'un concours, on peut **ajouter des photos** (avec
  une catégorie) : elles s'affichent dynamiquement dans la galerie **`/vie`**.
- Schéma défini dans [`src/db/schema.ts`](src/db/schema.ts) ; accès en lecture
  dans [`src/lib/events.ts`](src/lib/events.ts) / [`src/lib/photos.ts`](src/lib/photos.ts) ;
  actions CRUD dans [`src/app/admin/actions.ts`](src/app/admin/actions.ts).

### Images

- En **local**, les photos uploadées sont écrites dans `public/uploads/` (git-ignoré).
- En **prod**, définir `BLOB_READ_WRITE_TOKEN` (onglet **Storage → Blob** sur Vercel) :
  les images vont alors sur **Vercel Blob**. Le code bascule automatiquement.
- Les photos « fixes » (logo, hero) restent dans `public/assets/` ; voir `IMAGES`
  dans [`src/data/club.ts`](src/data/club.ts).

## Déploiement (Vercel + Neon Postgres)

1. Importer le repo GitHub dans **Vercel**.
2. Dans l'onglet **Storage**, ajouter **Neon Postgres** (Marketplace) → `DATABASE_URL`
   est injecté automatiquement.
3. Ajouter les variables d'environnement **`ADMIN_PASSWORD`** et **`SESSION_SECRET`**
   (générer le secret : `openssl rand -base64 32`).
4. Initialiser la base une fois (en local, `DATABASE_URL` pointant sur Neon) :
   `npm run db:push && npm run db:seed`.
5. Déployer. Le back-office est sur `https://<votre-domaine>/admin`.

## Pages (V1)

| Route            | Contenu                                                        |
| ---------------- | ------------------------------------------------------------- |
| `/`              | Accueil : hero, prochains concours, atouts, galerie, CTA      |
| `/concours`      | Calendrier des concours avec filtres (à venir / passés / …)   |
| `/resultats`     | Palmarès (podiums et scores)                                  |
| `/club`          | Histoire, valeurs et bureau du club                           |
| `/vie`           | Galerie photos avec filtres par catégorie                     |
| `/nous-trouver`  | Carte (OpenStreetMap) + infos pratiques                       |
| `/rejoindre`     | Étapes d'adhésion, tarif et formulaire de contact             |

Une modale d'inscription au concours (partagée) est accessible depuis les
boutons « S'inscrire » du site.

## Modifier le contenu

- **Concours** → via le **back-office `/admin`** (stockés en base). Plus besoin de toucher au code.
- **Le reste** (résultats, bureau, valeurs, infos pratiques, partenaires…) est centralisé
  dans [`src/data/club.ts`](src/data/club.ts) — éditez ce fichier pour mettre à jour le site.

## Remplacer les photos

Les 3 visuels (`equipe`, `podium-1`, `podium-2`) sont des **placeholders** générés
(`public/assets/*.svg`). Pour utiliser vos vraies photos :

1. Déposez-les dans `public/assets/` (ex. `equipe.jpg`, `podium-1.jpg`, `podium-2.jpg`).
2. Mettez à jour les chemins dans l'objet `IMAGES` de `src/data/club.ts`.

Le logo (`public/assets/logo.svg`) est vectoriel et sert aussi de favicon
(`src/app/icon.svg`).

## À venir (V2)

- Résultats des championnats (même base, mêmes patterns)
- Suivi des parties en direct (partie par partie)
- Gestion des inscriptions en ligne + comptes individuels (Clerk) pour le bureau

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- **Postgres + Drizzle ORM** (concours) ; back-office via Server Actions
- Auth back-office : mot de passe partagé + cookie de session signé (HMAC), middleware
- Polices Caprasimo + Figtree via `next/font` (aucune requête externe au runtime)
- Design system « Organic » (tokens gold / ink) porté en CSS variables dans `src/app/globals.css`
