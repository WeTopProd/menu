FROM node:16.14.2-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
CMD cp -r build result_build
ENV NODE_ENV=production

CMD ["npm", "start"]
