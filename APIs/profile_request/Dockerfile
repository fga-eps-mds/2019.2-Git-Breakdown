FROM node:alpine

RUN mkdir -p /usr/breakdown/profile_api
WORKDIR /usr/breakdown/profile_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]