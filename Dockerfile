# Build stage
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json .
COPY *.ts .
RUN npm --log-level=info ci
COPY . .
RUN npm run build && rm -rf build/**/*.map

# Containerize
FROM node:22-slim
ENV NODE_ENV=production
VOLUME /config
WORKDIR /app
COPY package*.json .
RUN npm --log-level=info ci --only=production
COPY --from=build /app/build/ /app/build/
COPY --from=build /app/.app-version.json /app/
CMD ["node", "build/daemon.js"]