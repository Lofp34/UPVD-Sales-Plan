# UPVD Sales Plan

Compagnon d'atelier pour une demi-journee de formation commerciale UPVD. Chaque startupper rejoint une session, remplit son workbook au fil du support, utilise l'IA comme coach de formulation, puis repart avec un playbook final imprimable.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4 + shadcn/ui
- Neon Postgres via Vercel Marketplace
- Drizzle ORM
- OpenAI Responses API avec `gpt-5.4`

## Parcours produit

- `/coach`
  Espace formateur minimal pour ouvrir une session et recuperer le lien participant.
- `/s/[slug]`
  Entree participant avec `nom + startup`.
- `/s/[slug]/atelier`
  Workbook guide par etapes, autosave, rail de coaching et boutons IA explicites.
- `/r/[token]`
  Lien personnel de reprise.

## Variables d'environnement

Copier `.env.example` vers `.env.local` pour le local.

```bash
DATABASE_URL=
OPENAI_API_KEY=
COACH_ACCESS_CODE=
SESSION_COOKIE_SECRET=
```

Notes:

- `DATABASE_URL` peut venir directement de Neon ou etre remappee depuis une variable injectee par Vercel Marketplace.
- `OPENAI_API_KEY` reste strictement cote serveur.
- `COACH_ACCESS_CODE` protege l'entree formateur.
- `SESSION_COOKIE_SECRET` sert a signer le cookie coach.

## Demarrage local

```bash
npm install
npm run dev
```

Application disponible sur [http://localhost:3000](http://localhost:3000).

## Base de donnees

Le schema Drizzle est dans `src/lib/db/schema.ts`.

Commandes utiles:

```bash
npm run db:generate
npm run db:push
npm run db:studio
```

Pour le MVP, `db:push` suffit en general.

## IA

Un seul endpoint applicatif est expose:

- `POST /api/ai/assist`

Actions autorisees:

- `clarify`
- `shorten`
- `variants_3`
- `flag_vagueness`
- `oralize_30s`
- `oralize_60s`

Contraintes serveur:

- reponse en francais
- aucune invention
- ne pas completer les blancs
- signaler ce qui manque
- posture de coach, pas de redacteur a la place du participant

## Deploiement Vercel

1. Importer le repo GitHub dans Vercel.
2. Ajouter une base Postgres Marketplace, idealement Neon.
3. Renseigner les 4 variables d'environnement.
4. Executer `npm run db:push` une premiere fois contre la base cible.
5. Deployer.

Le projet est pret pour un deploiement Vercel standard sans cle OpenAI cote client.

## Verification

Validation effectuee:

- `npm run lint` OK
- `npm run build` OK

Important:

- Dans le dossier local actuel, le caractere `#` present dans le chemin parent perturbe le build Next/Webpack sur macOS.
- Le code lui-meme build correctement dans un chemin neutre et doit deployer normalement sur Vercel.
