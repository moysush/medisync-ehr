# STAGE 1: builder (node:24-alpine)
FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
COPY data ./data
RUN pnpm build
RUN mkdir -p /app/prod && cp package.json pnpm-lock.yaml /app/prod/ \
 && cd /app/prod && pnpm install --prod --frozen-lockfile
RUN npm i -g --force pnpm@11.20.0

# STAGE 2: runtime (alpine + apk nodejs)
FROM alpine:3.23
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=builder /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm
RUN ln -s /usr/local/lib/node_modules/pnpm/bin/pnpm.mjs /usr/local/bin/pnpm \
 && ln -s /usr/local/lib/node_modules/pnpm/bin/pnpx.mjs /usr/local/bin/pnpx
COPY --from=builder /app/build ./build
COPY --from=builder /app/prod/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["pnpm", "start"]
