FROM node:alpine

RUN mkdir -p /usr/breakdown/commit_api
WORKDIR /usr/breakdown/commit_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "dev"]