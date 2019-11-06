FROM node:alpine

RUN mkdir -p /usr/breakdown/infos_api
WORKDIR /usr/breakdown/infos_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]