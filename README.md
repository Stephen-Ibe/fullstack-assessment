# Web Developer Assignment — Backend API

This repository contains a TypeScript/Node.js backend API powered by Express and SQLite. It exposes user and post endpoints, including support for user addresses, creating posts, and deleting posts. Jest + Supertest tests are included.

## Prerequisites

- Node.js 18+ and npm
- macOS/Linux/Windows

## Repository Structure

- `backend/` — API source, config, and SQLite database
  - `src/` — TypeScript source
  - `config/` — configuration files managed by `config`
  - `data.db` — SQLite database (pre-seeded)
  - `dist/` — compiled JavaScript (created by build)

Note: No frontend is included in this repo. You can connect any frontend to the API using the base URL and endpoints described below.

## Configuration

Configuration uses the `config` package. Files:

- `backend/config/default.json` (default runtime)
- `backend/config/test.json` (used when `NODE_ENV=test` during tests)

Defaults:

- Port: `3001`
- DB Path: `./data.db` (relative to `backend/`)

## Setup & Run (Backend)

1. Install dependencies

```
cd backend
npm install
```

2. Development server (ts-node)

```
npm run dev
```

Server starts on the configured port (default `3001`).

3. Production build + start

```
npm run build
npm start
```

Build emits JS to `dist/` and starts the compiled server.

## Database

- Uses SQLite at `backend/data.db` (pre-seeded). No migrations are required for this assignment.
- To reset the DB, you can replace `data.db` with a fresh copy if provided, or create a new SQLite file and seed the required tables (`users`, `addresses`, `posts`).

## API Endpoints

Base URL: `http://localhost:3001`

- `GET /users?pageNumber=<number>&pageSize=<number>`

  - Returns a paginated list of users including `addresses: Address[]`.
  - Defaults: `pageNumber=0`, `pageSize=4`.
  - 400 on invalid pagination; 500 on server error.

- `GET /users/count`

  - Returns `{ count: number }` with total user count.

- `GET /posts?userId=<string>`

  - Returns posts for a specific `userId`.
  - 400 if `userId` missing; 500 on server error.

- `POST /posts`

  - JSON body: `{ "title": string, "body": string, "userId": string | number }`
  - Creates a post and returns the created post with `201`.
  - 400 on invalid input; 500 on server error.

- `DELETE /posts/:id`
  - Deletes a post by ID.
  - 200 on success; 404 if not found; 500 on error.

### Curl Examples

```
# List users (with addresses)
curl 'http://localhost:3001/users?pageNumber=0&pageSize=4'

# Count users
curl 'http://localhost:3001/users/count'

# List posts for a user
curl 'http://localhost:3001/posts?userId=<USER_ID>'

# Create a post
curl -X POST 'http://localhost:3001/posts' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hello","body":"World","userId":"<USER_ID>"}'

# Delete a post
curl -X DELETE 'http://localhost:3001/posts/<POST_ID>'
```

## Testing Instructions

Tests are written with Jest + Supertest and run against the included SQLite database using `NODE_ENV=test` configuration.

Run all tests:

```
cd backend
npm test
```

## Implementation Notes

- CORS and JSON body parsing are enabled.
- IDs are TEXT (UUIDs for posts) to align with the SQLite schema.
- The server exports the Express `app` for testing and only listens when executed directly.
