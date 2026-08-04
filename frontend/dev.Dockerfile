FROM node:24
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
CMD [ "pnpm", "run", "dev", "--", "--host" ]
