# InterviewAceAI - Project Setup Guide

## ✅ Project Status

- **Frontend**: ✅ Build successful (SvelteKit)
- **Backend**: ⚠️ Requires Go 1.22+ to compile
- **Database**: Requires PostgreSQL connection

## Prerequisites

### 1. Go Installation

Download and install Go 1.22+ from https://golang.org/dl/

- Windows: Download `.msi` installer and run
- Verify: `go version`

### 2. PostgreSQL Database

- Local: Install PostgreSQL or use Docker
- Cloud: Use managed PostgreSQL (AWS RDS, Azure Database, etc.)

### 3. Node.js/npm

- Already configured ✅

## Backend Setup

### Step 1: Install Go Dependencies

```powershell
cd backend
go mod tidy
```

### Step 2: Create `.env` file

```powershell
# In project root, create .env
DB_DSN=postgres://user:password@localhost:5432/interviewaceai
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_ISSUER=interviewaceai
ACCESS_TOKEN_MINUTES=15
REFRESH_TOKEN_DAYS=7
PORT=8080
```

### Step 3: Run Backend

```powershell
cd backend
go run cmd/server/main.go
```

Backend will start on http://localhost:8080

## Frontend Setup

### Step 1: Install Dependencies

```powershell
cd frontend
npm install
```

### Step 2: Run Dev Server

```powershell
npm run dev
```

Frontend will start on http://localhost:5173 and proxy `/api/*` to backend

## API Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (requires auth)

## Database Schema

The backend auto-migrates on startup:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Development Checklist

- [ ] Go 1.22+ installed
- [ ] PostgreSQL running
- [ ] `.env` file created with DB connection
- [ ] Backend: `go mod tidy` completed
- [ ] Backend: `go run cmd/server/main.go` running on port 8080
- [ ] Frontend: `npm install` completed
- [ ] Frontend: `npm run dev` running on port 5173
- [ ] Test login at http://localhost:5173/login

## Production Build

Frontend:

```powershell
cd frontend
npm run build
# Output in .svelte-kit/output/
```

Backend:

```powershell
cd backend
go build -o server cmd/server/main.go
./server
```
