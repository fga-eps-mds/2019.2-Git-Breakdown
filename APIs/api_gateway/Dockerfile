FROM node:alpine

RUN mkdir -p /usr/breakdown/gateway_api
WORKDIR /usr/breakdown/gateway_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]