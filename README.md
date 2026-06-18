# InterviewAceAI - Full-Stack Authentication System

A production-ready full-stack application with **Go Fiber** backend and **SvelteKit** frontend featuring JWT authentication, PostgreSQL persistence, and clean architecture.

## ✅ Current Status

- **Frontend Build**: ✅ Passing
- **Backend Code**: ✅ Ready (requires Go 1.22+)
- **Architecture**: ✅ Clean separation of concerns
- **Database**: ⚙️ PostgreSQL required

## Tech Stack

### Backend

- **Language**: Go 1.22+
- **Framework**: Fiber v2 (lightweight HTTP router)
- **Database**: PostgreSQL with GORM ORM
- **Auth**: JWT (golang-jwt/jwt v5)
- **Hashing**: bcrypt

### Frontend

- **Framework**: SvelteKit v1
- **Build**: Vite v4
- **Language**: TypeScript
- **Auth**: localStorage + JWT

## Quick Start

### Prerequisites

- Go 1.22+ ([Download](https://golang.org/dl/))
- PostgreSQL ([Docker](https://hub.docker.com/_/postgres) or local install)
- Node.js + npm

### 1. Start PostgreSQL

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=interviewaceai -p 5432:5432 -d postgres:15
```

### 2. Configure Backend

```bash
# .env file is already created with defaults
# Edit .env if your database settings differ
cat .env
```

### 3. Start Backend

```powershell
cd backend (or project root)
go mod tidy
go run cmd/server/main.go
```

Backend runs on **http://localhost:8080**

### 4. Start Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**  
API proxy forwards `/api/*` to backend

### 5. Test

- Navigate to http://localhost:5173
- Register a new account
- Login with your credentials
- View protected dashboard

## API Routes

| Endpoint           | Method | Auth | Purpose                |
| ------------------ | ------ | ---- | ---------------------- |
| /api/auth/register | POST   | ❌   | Register new user      |
| /api/auth/login    | POST   | ❌   | Login with credentials |
| /api/auth/refresh  | POST   | ❌   | Refresh access token   |
| /api/auth/me       | GET    | ✅   | Get current user       |

## Project Structure

```
InterviewAceAI/
├── cmd/server/main.go              ← Backend entrypoint
├── internal/
│   ├── config/config.go            ← Env loading
│   ├── server/server.go            ← Fiber setup
│   ├── router/router.go            ← Routes
│   ├── middleware/jwt_middleware.go ← Auth guard
│   ├── auth/errors.go              ← Auth errors
│   ├── transport/http/
│   │   └── auth_handler.go         ← HTTP handlers
│   ├── domain/
│   │   ├── model/user.go           ← User entity
│   │   └── repository/
│   │       ├── user_repository.go  ← Interface
│   │       └── errors.go
│   ├── usecase/auth.go             ← Business logic
│   ├── repository/postgres/
│   │   ├── postgres.go             ← DB setup
│   │   └── user_repository.go      ← Impl
│   └── pkg/
│       ├── jwt/jwt.go              ← Token mgmt
│       └── hash/hash.go            ← Bcrypt
├── frontend/
│   └── src/routes/
│       ├── login/+page.svelte
│       ├── register/+page.svelte
│       └── dashboard/+page.svelte
├── go.mod
├── SETUP.md                         ← Detailed setup
├── .env                             ← Config (git ignored)
└── README.md                        ← This file
```

## Environment Variables

```env
DB_DSN=postgres://postgres:password@localhost:5432/interviewaceai
JWT_SECRET=your-secret-key-min-32-characters-long
JWT_ISSUER=interviewaceai
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
PORT=8080
```

## Database

PostgreSQL schema (auto-migrated):

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Production Build

### Backend

```bash
go build -o server cmd/server/main.go
./server
```

### Frontend

```bash
npm run build
# Output: .svelte-kit/output/
```

## Features

✅ JWT Authentication  
✅ Bcrypt Password Hashing  
✅ Clean Architecture  
✅ PostgreSQL + GORM  
✅ Protected Routes  
✅ SPA Frontend  
✅ Token Refresh

## See Also

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [.env.example](./.env.example) - Database connection examples
