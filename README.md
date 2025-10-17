# portfolio-v2-backend

Backend for portfolio-v2 — an Express + TypeScript API that powers the portfolio website and exposes endpoints for authentication, user/profile management, projects, blogs, blog categories and statistics.

## Key features

- RESTful API built with Express and TypeScript
- Authentication & authorization (JWT, refresh tokens)
- User seeding and session support
- Projects CRUD and file upload handling
- Blogs and Blog Categories management (CRUD)
- Stats endpoint for collecting simple metrics
- File uploads via Cloudinary integration
- Email sending via SMTP (nodemailer)
- Redis integration (ioredis) for caching/session use
- Input validation using Zod
- Prisma ORM for database access and migrations
- Graceful shutdown and comprehensive error handling

## Tech stack

The stack is taken from `package.json` and the project source:

- Node.js + TypeScript
- Express 5
- Prisma + @prisma/client
- Zod (validation)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- ioredis (Redis client)
- multer (file upload)
- cloudinary (image hosting)
- nodemailer (SMTP emails)
- passport + passport-local (local auth support)
- dotenv (environment variables)
- morgan, chalk (logging)

Development tools

- ts-node-dev for development server
- eslint + TypeScript tooling
- prisma CLI for migrations and client generation

## Repository structure (high level)

- `src/` - TypeScript source
  - `app/` - controllers, routes, middlewares, utils
  - `config/` - database, env, cloudinary, multer
  - `errors/` - error handling helpers and types
  - `scripts/` - helper scripts
- `prisma/` - schema and migrations

## Getting started

Prerequisites

- Node.js (>= 18 recommended)
- pnpm/npm/yarn
- A database supported by Prisma (configured via `DATABASE_URL`)
- Redis instance for caching (optional but env var required)

Install dependencies

```fish
pnpm install
```

Generate Prisma client (this runs automatically on postinstall):

```fish
pnpm prisma generate
```

Run the development server

```fish
pnpm run dev
```

Build for production

```fish
pnpm run build
pnpm start
```

## Environment variables

The app expects several environment variables (defined in `src/config/env.ts`). At minimum, for local development you should set:

- DATABASE_URL - Prisma database connection string
- PORT - port to run the server on (e.g. 4000)
- NODE_ENV - development|production
- USER_EMAIL, USER_PASSWORD, USER_FIRST_NAME, USER_LAST_NAME - seeded user credentials
- BCRYPT_SALT_ROUNDS
- ACCESS_TOKEN_JWT_SECRET
- ACCESS_TOKEN_JWT_EXPIRATION
- REFRESH_TOKEN_JWT_SECRET
- REFRESH_TOKEN_JWT_EXPIRATION
- FORGET_PASSWORD_TOKEN_JWT_SECRET
- FORGET_PASSWORD_TOKEN_JWT_EXPIRATION
- FRONTEND_URL

SMTP (for emails)

- SMTP_USER
- SMTP_PASS
- SMTP_HOST
- SMTP_PORT
- SMTP_FROM

Cloudinary (for file uploads)

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Redis

- REDIS_HOST
- REDIS_PORT
- REDIS_USERNAME
- REDIS_PASSWORD

Notes: The project will throw an error if any of these required env vars are missing (see `src/config/env.ts`). For local development create a `.env` file in the project root.

## Scripts (from package.json)

- pnpm run dev — start dev server with ts-node-dev
- pnpm run build — lint and tsc compile to `dist/`
- pnpm start — run built server from `dist/server.js`
- pnpm run lint — run eslint on `src/`

## API endpoints (overview)

The main router mounts under `/api/v1` and exposes the following modules:

- /api/v1/auth — authentication routes (login, refresh, logout, reset passwords)
- /api/v1/user — user/profile management
- /api/v1/projects — projects CRUD and file uploads
- /api/v1/blog-categories — blog categories CRUD
- /api/v1/blogs — blogs CRUD
- /api/v1/stats — statistics endpoints

There is also a health route at `/` and a simple API index at `/api/v1`.

For detailed request/response shapes and validation rules, see the `src/app/modules/*` folders (each module includes controller, service and validation files using Zod).

## Error handling & logging

- Centralized error handling middleware (`globalErrorHandler`) with custom error types.
- Validation errors are handled and parsed with Zod-specific handlers.
- Morgan used for request logging in development.

## Database

Prisma is used as the ORM. Migrations are stored in the `prisma/migrations/` folder. Use Prisma CLI to run migrations and open Prisma Studio.

```fish
pnpm prisma migrate dev --name init
pnpm prisma studio
```

## Live demo

The API is deployed and reachable at:

https://portfolio-v2-backend-two.vercel.app/

## Contributing

Contributions are welcome — open an issue or a pull request. Please follow the existing code style and run linting before opening PRs.

## License

MIT (or change as appropriate)

## Contact

Owner: Nahid-Mahmud
Project: portfolio-v2-backend
