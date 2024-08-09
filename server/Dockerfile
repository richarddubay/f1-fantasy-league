FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG API_DB_URL
ARG SESSION_KEY
ENV DATABASE_URL=$API_DB_URL
ENV SESSION_KEY=$SESSION_KEY

EXPOSE 3000

CMD ["npm", "run", "run-server"]
