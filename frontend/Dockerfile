FROM node:24-alpine AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit=dev
RUN npm run build

FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
