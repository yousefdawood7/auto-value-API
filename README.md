# AutoValue API

A modular NestJS REST API for vehicle valuation workflows, built with TypeORM, SQLite, and Zod-based runtime validation.

## Documentation

- Hosted API docs: [docs.auto-value.yousefdawood.me](https://docs.auto-value.yousefdawood.me)
- Local Swagger UI: `http://localhost:3000/docs`
- Local OpenAPI JSON: `http://localhost:3000/docs-json`

## Features

- NestJS 11 application structure with separated `auth`, `user`, `reports`, and `common` modules
- Zod v4 request validation through a custom `@ZodSchema()` decorator and global validation pipe
- TypeORM with SQLite for fast local setup
- Session-based authentication with cookie-backed guards
- Swagger / OpenAPI 3.x documentation compatible with APIDog
- Docker support for development and production workflows

## API Overview

### Authentication

| Method | Endpoint        | Description                                   | Auth Required  |
| ------ | --------------- | --------------------------------------------- | -------------- |
| `POST` | `/auth/signup`  | Register a new user and create a session      | No             |
| `POST` | `/auth/signin`  | Sign in an existing user and create a session | No             |
| `POST` | `/auth/signout` | Clear the active session                      | Session cookie |

### Reports

| Method | Endpoint  | Description                       | Auth Required  |
| ------ | --------- | --------------------------------- | -------------- |
| `POST` | `/report` | Create a vehicle valuation report | Session cookie |

## Project Structure

```text
src/
|-- app.controller.ts
|-- app.module.ts
|-- main.ts
|-- auth/
|   |-- auth.controller.ts
|   |-- auth.module.ts
|   |-- auth.service.ts
|-- common/
|   |-- configs/
|   |-- decorators/
|   |-- dto/
|   |-- exceptions/
|   |-- guards/
|   |-- interceptors/
|   |-- pipes/
|   |-- types/
|   `-- utils/
|-- reports/
|   |-- dto/
|   |-- entities/
|   |-- report.controller.ts
|   |-- report.module.ts
|   |-- report.service.ts
|   `-- schemas/
`-- user/
    |-- dto/
    |-- entities/
    |-- schemas/
    |-- user.controller.ts
    |-- user.module.ts
    `-- user.service.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm run start:dev
```

The API runs on `http://localhost:3000` by default.

## Docker

The repository includes:

- `Dockerfile`
- `docker-compose.yaml`
- `docker-compose.override.yaml`
- `docker-compose.production.yaml`

### Development

```bash
docker compose up
```

### Production-style run

```bash
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up
```

## Scripts

| Command               | Description             |
| --------------------- | ----------------------- |
| `pnpm run build`      | Build the application   |
| `pnpm run start`      | Start the application   |
| `pnpm run start:dev`  | Start in watch mode     |
| `pnpm run start:prod` | Run the compiled build  |
| `pnpm run lint`       | Lint the codebase       |
| `pnpm run test`       | Run unit tests          |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:cov`   | Generate coverage       |

## Validation Approach

This project uses Zod instead of `class-validator`. Each documented request DTO is paired with a Zod schema, and the global validation pipe resolves the schema from route metadata before the request reaches the handler.

Example:

```ts
@ZodSchema(createUserSchema)
@Post('signup')
signUp(@Body() body: CreateUserDto) {
  return this.authService.signup(body);
}
```

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- SQLite
- Zod
- Swagger / OpenAPI
- Docker
