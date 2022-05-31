FROM node:14.17.6-alpine

WORKDIR /usr/canlendar-api
COPY package*.json ./

RUN npm install

RUN npm install --production

COPY . .

RUN npm run build

CMD ["node", "dist/main"]