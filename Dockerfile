FROM node:14

WORKDIR /usr/src/app
ADD package.json ./
ADD tsconfig.json ./

RUN yarn install
