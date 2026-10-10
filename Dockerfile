# Multi-stage Dockerfile for PathForge (Unified Frontend + Backend)

# Stage 1: Build the Vite frontend application
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
COPY server/package*.json ./server/
RUN npm --prefix server install --omit=dev

# Copy built frontend assets and server source code
COPY --from=builder /app/dist ./dist
COPY server ./server

EXPOSE 8080

CMD ["node", "server/src/index.js"]
