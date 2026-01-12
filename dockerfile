# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build
COPY --from=build /app/.svelte-kit ./.svelte-kit

ENV NODE_ENV=production
ENV PORT=5173   

EXPOSE 5173

CMD ["node","build"]