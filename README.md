# SecondBrain

Save and share links (YouTube, Twitter/X, articles) as a lightweight personal “second brain”.

**Live app:** https://secondbrain-fe-9cge.onrender.com

## Features
- Sign up / sign in with JWT auth
- Save links with automatic type detection
- View content in cards
- Share a public “brain” link for read‑only access

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose)

## Requirements
- Node.js 18+
- MongoDB (local or hosted)

## Environment Variables
backend/.env
```
mongo_uri=<your-mongodb-connection-string>
JWT_KEY=<your-jwt-secret>
```

frontend/.env
```
VITE_backend_url=http://localhost:3000/api/v1
```

## Setup
From the project root:

Install backend dependencies:
```
cd backend
npm install
```

Install frontend dependencies:
```
cd ../frontend
npm install
```

## Run (Development)
Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd ../frontend
npm run dev
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Build (Production)
Backend:
```
cd backend
npm run build
npm start
```

Frontend:
```
cd ../frontend
npm run build
npm run preview
```

## API (Brief)
Base: /api/v1
- POST /signup
- POST /signin
- POST /content (auth)
- GET /content (auth)
- DELETE /content/:contentId (auth)
- POST /brain/share (auth)
- GET /brain?shareLink=<hash>

## Notes
- Protected routes require `Authorization: Bearer <token>`.
- The frontend reads API base from `VITE_backend_url`.
