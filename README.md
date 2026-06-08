<div align="center">

# 🚗 AutoValue API

A modular, type-safe REST API for vehicle valuation workflows built with [NestJS](https://nestjs.com/) and [TypeScript](https://www.typescriptlang.org/).

![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4.x-3E67B1)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)

</div>

---

## Overview

AutoValue API provides endpoints for user authentication and vehicle valuation report creation. It uses **Zod v4** for runtime request validation, **TypeORM** with **PostgreSQL** for persistence, and **cookie-session** for stateless authentication.

### Documentation

- 📖 Hosted API docs — [docs.auto-value.yousefdawood.me](https://docs.auto-value.yousefdawood.me)
- 🔧 Local Swagger UI — `http://localhost:3000/docs`
- 📄 Local OpenAPI JSON — `http://localhost:3000/docs-json`

---

## API Endpoints

### Authentication

| Method | Endpoint        | Description                          | Auth Required  |
| ------ | --------------- | ------------------------------------ | -------------- |
| `POST` | `/auth/signup`  | Register a new user and start a session | No             |
| `POST` | `/auth/signin`  | Authenticate and start a session      | No             |
| `POST` | `/auth/signout` | Clear the active session              | Session cookie |

### Reports

| Method | Endpoint  | Description                       | Auth Required  |
| ------ | --------- | --------------------------------- | -------------- |
| `POST` | `/report` | Create a vehicle valuation report | Session cookie |

---

## Project Structure

```text
src/
├── app.controller.ts
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.controller.spec.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.service.spec.ts
├── common/
│   ├── configs/
│   ├── decorators/
│   ├── dto/
│   ├── exceptions/
│   ├── guards/
│   ├── interceptors/
│   ├── keys/
│   ├── pipes/
│   ├── scripts/
│   ├── types/
│   └── utils/
├── db/
│   ├── datasource.ts
│   └── migrations/
├── reports/
│   ├── dto/
│   ├── entities/
│   ├── report.controller.ts
│   ├── report.module.ts
│   ├── report.service.ts
│   └── schemas/
└── user/
    ├── dto/
    ├── entities/
    ├── schemas/
    ├── user.controller.ts
    ├── user.module.ts
    └── user.service.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL instance (local or remote with SSL)

### Environment Variables

```bash
cp .env.example .env
```

| Variable       | Description                                    |
| -------------- | ---------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string (SSL is required) |
| `SECRET_KEY`   | Secret used to sign cookie-session cookies     |

### Install & Run

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm run migration:run

# Start in development (watch mode)
pnpm run start:dev
```

The API starts on `http://localhost:3000` by default. Set `PORT` to change it.

---

## Docker

Multi-stage `Dockerfile` with separate `dev` and `production` targets.

```bash
# Development (watch mode, bind-mounted source)
docker compose up

# Production (compiled build)
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up
```

---

## Scripts

| Command                       | Description                              |
| ----------------------------- | ---------------------------------------- |
| `pnpm run build`              | Compile the application                  |
| `pnpm run start`              | Start the application                    |
| `pnpm run start:dev`          | Start in watch mode                      |
| `pnpm run start:debug`        | Start in debug + watch mode              |
| `pnpm run start:prod`         | Run the compiled production build        |
| `pnpm run format`             | Format code with Prettier                |
| `pnpm run lint`               | Lint and auto-fix with ESLint            |
| `pnpm run test`               | Run unit tests                           |
| `pnpm run test:watch`         | Run tests in watch mode                  |
| `pnpm run test:cov`           | Generate test coverage report            |
| `pnpm run test:e2e`           | Run end-to-end tests                     |
| `pnpm run migration:generate` | Generate a migration from schema changes |
| `pnpm run migration:run`      | Run pending migrations                   |

---

## Validation

Zod v4 replaces `class-validator`. Schemas are attached to routes via the `@ZodSchema()` decorator and resolved by a global `ZodValidationPipe`.

```ts
@ZodSchema(createUserSchema)
@Post('signup')
signUp(@Body() body: CreateUserDto) {
  return this.authService.signup(body);
}
```

---

## Tech Stack

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Framework        | NestJS 11                          |
| Language         | TypeScript 5.7                     |
| Database         | PostgreSQL, TypeORM (migrations)   |
| Validation       | Zod v4                             |
| Authentication   | cookie-session (signed cookies)    |
| Documentation    | Swagger / OpenAPI 3.x              |
| Testing          | Jest, Supertest                    |
| Infrastructure   | Docker, Docker Compose             |

---

<div align="center">

Built with ❤️ by [Yousef Dawood](https://yousefdawood.me)

</div>
