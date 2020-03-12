FROM node:13.8.0-alpine3.10

ENV PATH /api/node_modules/.bin:$PATH

RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY . .

EXPOSE 4000

CMD ["pm2-runtime", "index.js", "--only", "collectibles-graphql-service"]