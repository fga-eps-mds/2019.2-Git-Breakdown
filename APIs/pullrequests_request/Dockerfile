FROM node:alpine

RUN mkdir -p /usr/breakdown/pullrequest_api
WORKDIR /usr/breakdown/pullrequest_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]