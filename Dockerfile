# Build stage
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json .
COPY *.ts .
RUN npm --log-level=info ci
COPY . .
RUN npm run build

# Containerize
FROM node:lts-alpine
ENV NODE_ENV=production
VOLUME /config
WORKDIR /app
COPY package*.json .
RUN npm --log-level=info ci --only=production
COPY --from=build /app/build /app/dist
COPY --from=build /app/.app-version.json /app/
CMD ["node", "dist/daemon.js"]