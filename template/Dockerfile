# -------- Étape 1 : Base commune --------
FROM node:24-alpine AS base
WORKDIR /app

# Installer Bun pour le build uniquement
RUN npm install -g bun@latest

# -------- Étape 2 : Installation des dépendances --------
FROM base AS deps
COPY package.json bun.lockb* ./
COPY api/package.json ./api/
COPY web/package.json ./web/
RUN bun install --frozen-lockfile

# -------- Étape 3 : Build API --------
FROM base AS build-api
WORKDIR /app
COPY --from=deps /app ./
COPY .. .
RUN cd api && node ace build --ignore-ts-errors

# -------- Étape 4 : Build Web --------
FROM base AS build-web
WORKDIR /app
COPY --from=deps /app ./
COPY .. .
RUN cd web && bun run build

# -------- Étape 5 : Image finale --------
FROM node:24-alpine AS runner
WORKDIR /app

# Copier uniquement ce qui est nécessaire pour l'exécution
COPY --from=build-api /app/api/build ./api/build
COPY --from=build-web /app/web/.output ./web/.output

# Copier les dépendances de prod de l'étape deps
COPY --from=deps /app/node_modules ./node_modules

# Copier le script de démarrage
COPY script/start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 3000 3333
CMD ["./start.sh"]
