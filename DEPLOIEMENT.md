# Déploiement & mise en prod — règle du projet

> **Règle d'or : à chaque changement, on commit + push sur `main`, et on s'assure que tout est mergé et déployé en prod. Jamais de travail qui traîne en local non poussé.**

Le but est d'éviter toute ambiguïté de version : ce qui est sur `main` = ce qui est en production.

## Workflow à suivre systématiquement

1. **Commit** tout changement terminé (pas de modif non commitée qui traîne).
2. **Push sur `main`** : `git push origin main`.
3. Le push déclenche automatiquement un **déploiement de production** via l'intégration GitHub ↔ Vercel (projet `labouledor`, domaine `labouledor-nine.vercel.app`).
4. **Vérifier** que le déploiement est bien passé en Ready et aliasé sur le domaine de prod avant de considérer la tâche terminée.

## Points de vigilance

- **Une variable d'environnement ajoutée sur Vercel n'est prise en compte qu'au prochain déploiement.** Après avoir ajouté/modifié une variable (ex. `BLOB_READ_WRITE_TOKEN`), il faut **redéployer** la prod (`vercel redeploy <url-prod>` ou un nouveau push).
- **Le schéma de la base n'est PAS géré par git.** Toute modification de `src/db/schema.ts` doit être appliquée manuellement à la base de prod avec :
  ```bash
  DATABASE_URL="<url-neon-prod>" npx drizzle-kit push
  ```
  (sinon la prod plante avec « relation does not exist »).
- **Ne jamais laisser de commit local non poussé** ni de fichier modifié non commité : c'est la source principale des désynchronisations entre local et prod.

## Vérification rapide de l'état

```bash
git status -sb                       # doit être « clean » et à jour avec origin/main
git log --oneline origin/main..HEAD  # doit être vide (rien en attente de push)
```

## Rappel infra

- **Projet Vercel** : `labouledor` (scope `gavatxos-projects`) — prod : `https://labouledor-nine.vercel.app`
- **Base** : Neon Postgres (variables `DATABASE_URL` & co, chiffrées côté Vercel)
- **Stockage images** : Vercel Blob store `labouledor-photos` (public) → `BLOB_READ_WRITE_TOKEN`
