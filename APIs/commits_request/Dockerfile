FROM node:alpine

RUN mkdir -p /usr/breakdown/commits_api
WORKDIR /usr/breakdown/commits_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]