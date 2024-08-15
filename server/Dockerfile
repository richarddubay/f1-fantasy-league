FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG API_DB_URL
ARG JWT_SECRET_KEY
ENV DATABASE_URL=$API_DB_URL
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY

EXPOSE 3001

CMD ["npm", "run", "start"]
