FROM node:24 AS build-stage
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
