FROM node:latest-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]