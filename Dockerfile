ARG DEV_GUILD_ID
ARG TOKEN
ARG FORCE_COLOR

FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 443/tcp
EXPOSE 50000-65535/udp 

CMD [ "node", "dist/index.js" ]