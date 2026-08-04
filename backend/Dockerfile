FROM node:24-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit=dev
CMD [ "npm", "start" ]
