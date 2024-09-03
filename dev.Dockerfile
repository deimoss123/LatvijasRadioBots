FROM node:20-alpine

RUN apk add g++ make py3-pip ffmpeg

RUN npm i -g pnpm

WORKDIR /usr/app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY . .
