<h1 align="center">🚗 AutoValue API</h1>

<p align="center">
  A type-safe, modular REST API for managing and evaluating vehicle value data —<br/>
  built with <strong>NestJS</strong>, <strong>TypeORM</strong>, and <strong>Zod v4</strong>.
</p>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-0.3-orange?style=flat-square" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4.3-3E67B1?style=flat-square" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-local%20DB-003B57?style=flat-square&logo=sqlite&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

---

## What is AutoValue API?

AutoValue API is a backend service that provides a clean foundation for vehicle valuation platforms. It handles user registration with strict runtime validation, a modular architecture that's easy to extend, and consistent error handling out of the box.

Rather than relying on NestJS's built-in `class-validator`, this project takes a different approach — using **Zod v4 schemas** wired directly to route handlers via a custom `@ZodSchema` decorator. The result is expressive, schema-driven validation with zero DTO boilerplate.

---

## Features

- **Zod v4 Runtime Validation** — schema-level validation attached to route handlers via a custom method decorator
- **Custom Global Pipe & Filter** — centralized request validation and structured error responses across the entire API
- **TypeORM + SQLite** — zero-config local database with automatic schema synchronization
- **Docker Support** — ready-to-use multi-stage `Dockerfile` and `docker-compose` setup for both development and production
- **Clean Modular Structure** — `auth`, `user`, and `common` modules, each with a single clear responsibility

---

## Project Structure

```
src/
├── app.module.ts           # Root module — wires TypeORM, pipes, and filters
├── main.ts                 # Entry point — bootstraps the NestJS application
│
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # POST /auth/signup
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── user/                   # User management module
│   ├── dto/                # Data Transfer Objects
│   ├── entities/           # TypeORM entities (User, Name)
│   ├── schemas/            # Zod v4 validation schemas
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
│
└── common/                 # Shared, reusable utilities
    ├── configs/
    ├── decorators/         # @ZodSchema custom method decorator
    ├── exceptions/         # Global HTTP exception filter
    ├── interceptors/
    ├── keys/               # Reflect metadata keys
    ├── pipes/              # Global Zod validation pipe
    └── utils/
```

---

## API Reference

### Authentication

| Method | Endpoint       | Description         | Auth Required |
| ------ | -------------- | ------------------- | ------------- |
| `POST` | `/auth/signup` | Register a new user | No            |

#### Request Body — `POST /auth/signup`

```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "supersecret123"
}
```

#### Validation Rules

| Field       | Type               | Rules                            |
| ----------- | ------------------ | -------------------------------- |
| `email`     | `string`           | Required · valid email format    |
| `firstName` | `string`           | Required · 3–255 characters      |
| `lastName`  | `string`           | Optional · 3–255 characters      |
| `password`  | `string \| number` | Required · minimum 10 characters |

> Validation runs **before** the request reaches the service layer. Invalid requests are rejected immediately with a structured error response.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [pnpm](https://pnpm.io/) v8 or later

### Install Dependencies

```bash
pnpm install
```

### Run the Server

```bash
# Development — single run
pnpm run start

# Development — watch mode (recommended)
pnpm run start:dev

# Production
pnpm run start:prod
```

The server starts at **`http://localhost:3000`** by default.  
Override the port by setting the `PORT` environment variable.

---

## Docker

The project includes a multi-stage `Dockerfile` and three compose files that layer on top of each other:

| File                             | Purpose                                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| `docker-compose.yaml`            | Base config — service name, port mapping, restart policy                   |
| `docker-compose.override.yaml`   | Dev overrides — auto-applied, sets `target: dev` and mounts source volumes |
| `docker-compose.production.yaml` | Production overrides — sets `target: production`                           |

```bash
# Development (docker-compose.override.yaml is applied automatically)
docker compose up

# Production (base + production file merged explicitly)
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up
```

Both targets install dependencies, run `pnpm approve-builds`, and initialize the SQLite database automatically.

---

## Testing

```bash
# Run unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:cov

# End-to-end tests
pnpm run test:e2e
```

---

## How It Works

### `@ZodSchema` Decorator

The core pattern of this API. Instead of annotating DTOs with class-validator decorators, you attach a Zod schema directly to the route handler method:

```ts
@ZodSchema(createUserSchema)
@Post('signup')
createUser(@Body() body: CreateUserDto) {
  return this.userService.createUser(body);
}
```

At request time, the global `ZodValidationPipe` reads the schema from `reflect-metadata` and validates the incoming body. If validation fails, the request is rejected before the handler is ever called.

### Zod v4 Schema Design

Schemas use Zod v4's `error` option syntax and `.pipe()` for chained validations:

```ts
email: z
  .string({ error: 'Email is required' })
  .min(1, { error: 'Email cannot be empty' })
  .pipe(z.email({ error: 'Invalid email format' })),
```

### Global Exception Filter

A custom `HttpExceptionFilter` is registered globally, ensuring every error response follows the same predictable structure — no matter where in the app the exception originates.

---

## Available Scripts

| Command               | Description                        |
| --------------------- | ---------------------------------- |
| `pnpm run start`      | Start the server                   |
| `pnpm run start:dev`  | Start with hot reload (watch mode) |
| `pnpm run start:prod` | Run the compiled production build  |
| `pnpm run build`      | Compile TypeScript to `dist/`      |
| `pnpm run format`     | Format code with Prettier          |
| `pnpm run lint`       | Lint and auto-fix with ESLint      |
| `pnpm run test`       | Run unit tests                     |
| `pnpm run test:e2e`   | Run end-to-end tests               |
| `pnpm run test:cov`   | Generate test coverage report      |

---

## Tech Stack

| Tool                                         | Version | Purpose                    |
| -------------------------------------------- | ------- | -------------------------- |
| [NestJS](https://nestjs.com)                 | 11      | Backend framework          |
| [TypeScript](https://www.typescriptlang.org) | 5.7     | Static type safety         |
| [TypeORM](https://typeorm.io)                | 0.3     | ORM & database management  |
| [SQLite](https://www.sqlite.org)             | —       | Lightweight local database |
| [Zod](https://zod.dev)                       | 4.3     | Runtime schema validation  |
| [Prettier](https://prettier.io)              | 3       | Code formatting            |
| [ESLint](https://eslint.org)                 | 9       | Code linting               |
