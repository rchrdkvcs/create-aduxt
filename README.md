# Aduxt

Un monorepo moderne combinant **AdonisJS 6** (backend) et **Nuxt 4** (frontend) avec une communication type-safe via **Tuyau**.

## 📋 Prérequis

- [Bun](https://bun.sh/) >= 1.0
- [Node.js](https://nodejs.org/) >= 24
- [PostgreSQL](https://www.postgresql.org/) >= 14
- [Docker](https://www.docker.com/) (optionnel, pour le déploiement)

## 🚀 Démarrage rapide

### Créer un nouveau projet

```bash
npm create aduxt@latest
```

Ou avec d'autres gestionnaires de paquets :

```bash
# Avec Bun
bunx create-aduxt@latest

# Avec pnpm
pnpm create aduxt@latest

# Avec Yarn
yarn create aduxt
```

Cela créera un nouveau projet Aduxt dans le répertoire de votre choix avec toute la structure et la configuration nécessaires.

## ⚙️ Configuration

### 1. Configuration de l'environnement

Créer le fichier `.env` pour l'API :

```bash
cp api/.env.example api/.env
```

Éditer `api/.env` et configurer les variables :

```env
# Application
PORT=3333
HOST=localhost
NODE_ENV=development
APP_KEY=<générer avec: node ace generate:key>

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=votre_user
DB_PASSWORD=votre_password
DB_DATABASE=aduxt

# Session
SESSION_DRIVER=cookie
```

### 2. Installer les dépendances

```bash
bun install
```

### 3. Base de données

Créer la base de données PostgreSQL :

```bash
createdb aduxt
```

Exécuter les migrations :

```bash
cd api
node ace migration:run
```

### 4. Générer les types Tuyau

Pour la communication type-safe entre le frontend et le backend :

```bash
cd api
node ace tuyau:generate
```

### 5. Lancer l'application

**Mode développement (les deux apps) :**

```bash
bun run dev
```

Ou séparément :

```bash
# Terminal 1 - API
bun run dev:api

# Terminal 2 - Frontend
bun run dev:web
```

**Accès :**
- Frontend : [http://localhost:3000](http://localhost:3000)
- API : [http://localhost:3333](http://localhost:3333)

## 📁 Structure du projet

```
aduxt/
├── api/                      # Backend AdonisJS
│   ├── app/
│   │   ├── auth/            # Module d'authentification
│   │   └── core/            # Middleware, exceptions
│   ├── config/              # Configuration (database, auth, etc.)
│   ├── database/
│   │   └── migrations/      # Migrations de base de données
│   ├── start/
│   │   ├── routes.ts        # Définition des routes
│   │   └── kernel.ts        # Configuration des middleware
│   └── tests/               # Tests unitaires et fonctionnels
│
├── web/                      # Frontend Nuxt
│   ├── app/
│   │   ├── pages/           # Pages Vue Router
│   │   ├── components/      # Composants Vue
│   │   ├── composables/     # Composables Vue
│   │   ├── plugins/         # Plugins Nuxt (Tuyau)
│   │   └── assets/          # Assets (CSS, images)
│   └── public/              # Fichiers statiques
│
├── script/                   # Scripts de déploiement
├── Dockerfile               # Configuration Docker
├── compose.yml              # Docker Compose
└── package.json             # Configuration du workspace
```

## 🛠️ Commandes utiles

### API (AdonisJS)

```bash
cd api

# Développement
node ace serve --hmr              # Serveur avec hot reload
node ace build                    # Build pour production
node ace --help                   # Liste toutes les commandes

# Base de données
node ace migration:run            # Exécuter les migrations
node ace migration:rollback       # Annuler la dernière migration
node ace migration:fresh          # Réinitialiser la BDD
node ace make:migration <nom>     # Créer une migration
node ace make:model <nom>         # Créer un modèle

# Tests
node ace test                     # Tous les tests
node ace test unit                # Tests unitaires
node ace test functional          # Tests fonctionnels

# Tuyau (Type-safe API)
node ace tuyau:generate           # Générer les types pour le frontend

# Code quality
bun run lint                      # Linter
bun run format                    # Formatter
bun run typecheck                 # Vérification des types
```

### Web (Nuxt)

```bash
cd web

# Développement
bun run dev                       # Serveur de développement
bun run build                     # Build pour production
bun run preview                   # Preview du build de production
bun run generate                  # Génération statique
```

## 🔧 Développement

### Créer une nouvelle route API

1. Définir la route dans `api/start/routes.ts` :

```typescript
import router from '@adonisjs/core/services/router'

router.get('/users', async () => {
  return { users: [] }
})
```

2. Régénérer les types Tuyau :

```bash
cd api
node ace tuyau:generate
```

3. Utiliser dans le frontend :

```vue
<script setup>
const tuyau = useTuyau()

const { data } = await tuyau.users.$get()
</script>
```

### Créer une nouvelle page

Créer un fichier dans `web/app/pages/` :

```vue
<!-- web/app/pages/about.vue -->
<template>
  <div>
    <h1>À propos</h1>
  </div>
</template>
```

La page sera automatiquement accessible sur `/about`.

### Accéder à la base de données

```typescript
import db from '@adonisjs/lucid/services/db'

// Query builder
const users = await db.from('users').select('*')

// Ou avec un modèle
import User from '#models/user'
const users = await User.all()
```

## 🧪 Tests

Les tests utilisent [Japa](https://japa.dev/) :

```bash
cd api

# Tous les tests
node ace test

# Tests spécifiques
node ace test unit
node ace test functional

# Avec coverage
node ace test --coverage
```

## 🐳 Docker

### Développement avec Docker Compose

```bash
docker compose -f compose.dev.yaml up
```

### Production

```bash
# Build
docker build -t aduxt .

# Run
docker compose up
```

## 📚 Documentation des outils

### Backend
- **[AdonisJS 6](https://adonisjs.com/)** - Framework backend Node.js
  - [Documentation](https://docs.adonisjs.com/)
  - [Lucid ORM](https://lucid.adonisjs.com/) - ORM pour la base de données
  - [Auth](https://docs.adonisjs.com/guides/authentication) - Authentification
  - [Validation](https://docs.adonisjs.com/guides/validation) - VineJS pour la validation

### Frontend
- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js
  - [Documentation](https://nuxt.com/docs)
  - [Vue 3](https://vuejs.org/) - Framework JavaScript progressif
  - [Vue Router](https://router.vuejs.org/) - Routing officiel
- **[Nuxt UI](https://ui.nuxt.com/)** - Bibliothèque de composants UI
  - [Documentation](https://ui.nuxt.com/getting-started)
  - [Components](https://ui.nuxt.com/components) - Liste des composants
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
  - [Documentation](https://tailwindcss.com/docs)

### Type-Safety
- **[Tuyau](https://tuyau.boringbits.io/)** - Type-safe RPC client/server
  - [Documentation](https://tuyau.boringbits.io/docs/introduction)
  - [Usage avec AdonisJS](https://tuyau.boringbits.io/docs/adonis-js)
  - [Usage avec Nuxt](https://tuyau.boringbits.io/docs/clients/nuxt)

### Base de données
- **[PostgreSQL](https://www.postgresql.org/)** - Base de données relationnelle
  - [Documentation](https://www.postgresql.org/docs/)

### Package Manager
- **[Bun](https://bun.sh/)** - Runtime JavaScript rapide
  - [Documentation](https://bun.sh/docs)

## 🔑 Points importants

### Tuyau (Type-Safety)

**⚠️ Important :** Après chaque modification des routes API, vous **devez** régénérer les types :

```bash
cd api
node ace tuyau:generate
```

Cela permet au frontend d'avoir une autocomplétion et une vérification des types en temps réel.

### Path Aliases (API)

L'API utilise des alias de chemins :

```typescript
import User from '#models/user'        // au lieu de '../models/user'
import { middleware } from '#start/kernel'
```

### Hot Reload

Le hot reload est activé pour :
- `api/app/controllers/**/*.ts`
- `api/app/middleware/*.ts`

Les modifications dans ces fichiers ne nécessitent pas de redémarrage.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changes (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 License

[UNLICENSED](LICENSE)
