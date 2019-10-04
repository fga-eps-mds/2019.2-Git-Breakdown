FROM node:alpine

RUN mkdir -p /usr/breakdown/branch_api
WORKDIR /usr/breakdown/branch_api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]