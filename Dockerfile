FROM node:alpine as base

WORKDIR /app

COPY package*.json .

RUN npm i pnpm@latest

RUN pnpm i

RUN pnpm approve-builds --all

COPY . .

FROM base as dev

EXPOSE 3000

CMD ["pnpm", "start:dev"]