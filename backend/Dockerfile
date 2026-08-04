FROM node:24-alpine
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY . .
CMD [ "pnpm", "start" ]
