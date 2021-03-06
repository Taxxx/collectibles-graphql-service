FROM node:12.13.1

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 4000

CMD ["pm2-runtime","index.js"]