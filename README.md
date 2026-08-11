# La Boule d'Or Nibelloise — site du club

Site vitrine du club de pétanque **La Boule d'Or Nibelloise** (Nibelle, Loiret).
Construit avec **Next.js (App Router) + TypeScript**, fidèle à la maquette « Site La Boule d'Or ».

## Démarrer

```bash
npm run dev      # serveur de développement → http://localhost:3000
npm run build    # build de production
npm run start    # sert le build de production
npm run lint     # ESLint
```

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

**Tout le contenu éditorial est centralisé dans [`src/data/club.ts`](src/data/club.ts)** :
concours, résultats, membres du bureau, valeurs, infos pratiques, partenaires…
Éditez ce fichier pour mettre le site à jour, sans toucher au reste.

## Remplacer les photos

Les 3 visuels (`equipe`, `podium-1`, `podium-2`) sont des **placeholders** générés
(`public/assets/*.svg`). Pour utiliser vos vraies photos :

1. Déposez-les dans `public/assets/` (ex. `equipe.jpg`, `podium-1.jpg`, `podium-2.jpg`).
2. Mettez à jour les chemins dans l'objet `IMAGES` de `src/data/club.ts`.

Le logo (`public/assets/logo.svg`) est vectoriel et sert aussi de favicon
(`src/app/icon.svg`).

## À venir (V2)

- Résultats des championnats
- Suivi des parties en direct (partie par partie)
- Espace membres / gestion des inscriptions

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Polices Caprasimo + Figtree via `next/font` (aucune requête externe au runtime)
- Design system « Organic » (tokens gold / ink) porté en CSS variables dans `src/app/globals.css`
