<h1 align="center">
  🚗 AutoValue API
</h1>

<p align="center">
  A clean, type-safe REST API built with <a href="https://nestjs.com" target="_blank">NestJS</a>, <a href="https://typeorm.io" target="_blank">TypeORM</a>, and <a href="https://zod.dev" target="_blank">Zod</a> — designed for managing and evaluating vehicle value data.
</p>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-0.3-orange?style=flat-square" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-local%20DB-003B57?style=flat-square&logo=sqlite&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

---

## 📖 Overview

**AutoValue API** is a backend REST API built with **NestJS** and **TypeScript**. It provides a modular, scalable foundation for managing user accounts with strict runtime validation using **Zod schemas** — making it the perfect backbone for any auto valuation platform.

Key highlights:

- ✅ **Zod-powered validation** — runtime-safe request body validation via a custom `@ZodSchema` decorator
- ✅ **TypeORM with SQLite** — zero-config database with auto schema sync for rapid development
- ✅ **Custom global pipes & filters** — centralized error handling and validation logic
- ✅ **Clean modular architecture** — `auth`, `user`, and `common` modules separated by responsibility

---

## 🏗️ Project Structure

```
src/
├── app.module.ts           # Root module — wires up TypeORM, pipes, and filters
├── main.ts                 # Entry point — bootstraps the NestJS app
│
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # POST /auth/signup
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── user/                   # User management module
│   ├── dto/                # Data Transfer Objects
│   ├── entities/           # TypeORM entities (User, Name)
│   ├── schemas/            # Zod validation schemas
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
│
└── common/                 # Shared utilities
    ├── configs/
    ├── decorators/         # @ZodSchema custom decorator
    ├── exceptions/         # Global HTTP exception filter
    ├── interceptors/
    ├── keys/               # Reflect metadata keys
    ├── pipes/              # Global Zod validation pipe
    └── utils/
```

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint       | Description         | Body                                          |
| ------ | -------------- | ------------------- | --------------------------------------------- |
| `POST` | `/auth/signup` | Register a new user | `email`, `firstName`, `lastName?`, `password` |

### Validation Rules

The request body is validated against a **Zod schema** at the decorator level — invalid requests are rejected before reaching the service layer.

| Field       | Rules                                             |
| ----------- | ------------------------------------------------- |
| `email`     | Required, valid email format                      |
| `firstName` | Required, 3–255 characters                        |
| `lastName`  | Optional, 3–255 characters                        |
| `password`  | Required, string or number, minimum 10 characters |

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v8+

### Installation

```bash
pnpm install
```

### Running the Server

```bash
# Development (single run)
pnpm run start

# Development (watch mode — recommended)
pnpm run start:dev

# Production
pnpm run start:prod
```

The server starts on **`http://localhost:3000`** by default. Set the `PORT` environment variable to override.

---

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:cov

# End-to-end tests
pnpm run test:e2e
```

---

## 🛠️ Tech Stack

| Tool                                             | Purpose                    |
| ------------------------------------------------ | -------------------------- |
| [NestJS 11](https://nestjs.com)                  | Backend framework          |
| [TypeScript 5.7](https://www.typescriptlang.org) | Type safety                |
| [TypeORM 0.3](https://typeorm.io)                | ORM & database management  |
| [SQLite](https://www.sqlite.org)                 | Lightweight local database |
| [Zod 4](https://zod.dev)                         | Runtime schema validation  |
| [Prettier](https://prettier.io)                  | Code formatting            |
| [ESLint](https://eslint.org)                     | Code linting               |

---

## ✨ Architecture Highlights

### Custom `@ZodSchema` Decorator

Instead of using NestJS's built-in `class-validator`, this API uses a custom `@ZodSchema()` method decorator that attaches a Zod schema to the DTO class via `reflect-metadata`. The global `ZodValidationPipe` reads this metadata at request time and validates the incoming body — giving you expressive, type-safe schemas without extra boilerplate.

```ts
@ZodSchema(createUserSchema)
@Post('signup')
createUser(@Body() body: CreateUserDto) {
  return this.userService.createUser(body);
}
```

### Global Exception Filter

A custom `HttpExceptionFilter` is registered globally to return consistent, structured error responses across the entire API.

---

## 🔧 Available Scripts

| Command               | Description                   |
| --------------------- | ----------------------------- |
| `pnpm run start`      | Start the server              |
| `pnpm run start:dev`  | Start with file watcher       |
| `pnpm run start:prod` | Run compiled production build |
| `pnpm run build`      | Compile TypeScript to `dist/` |
| `pnpm run format`     | Format code with Prettier     |
| `pnpm run lint`       | Lint and auto-fix with ESLint |
| `pnpm run test`       | Run unit tests                |
| `pnpm run test:e2e`   | Run end-to-end tests          |
| `pnpm run test:cov`   | Generate coverage report      |
