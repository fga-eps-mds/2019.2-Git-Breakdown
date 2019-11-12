FROM node:alpine

RUN mkdir -p /usr/breakdown/organitazion_api
WORKDIR /usr/breakdown/organization_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "start"]