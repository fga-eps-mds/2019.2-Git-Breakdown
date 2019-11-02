FROM node:alpine

RUN mkdir -p /usr/breakdown/ranking_api
WORKDIR /usr/breakdown/ranking_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]