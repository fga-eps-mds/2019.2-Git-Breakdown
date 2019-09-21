FROM node:alpine

RUN mkdir -p /usr/breakdown/api_gateway
WORKDIR /usr/breakdown/api_gateway

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]