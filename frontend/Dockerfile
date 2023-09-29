FROM node:19.8.1-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD cp -r build result_build_rating

ENV NODE_ENV=production

CMD ["npm", "start"]
