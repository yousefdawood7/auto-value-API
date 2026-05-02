FROM node:alpine as base

WORKDIR /app

EXPOSE 3000

COPY package*.json .

RUN npm i pnpm@latest

RUN pnpm i

RUN pnpm approve-builds --all

COPY . .

FROM base as dev


CMD ["pnpm", "start:dev"]

FROM base as production

CMD ["pnpm", "start"]

