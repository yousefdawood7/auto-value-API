FROM node:alpine AS base

WORKDIR /app

EXPOSE 3000

COPY package*.json .

RUN npm i --global pnpm@latest

RUN pnpm i

RUN pnpm approve-builds --all

COPY . .

RUN touch db.sqlite

FROM base AS dev


CMD ["pnpm", "start:dev"]

FROM base AS production

RUN pnpm build

CMD ["pnpm", "start:prod"]

