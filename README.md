# MentorBridge

A modern mentorship platform that matches mentees with mentors for guided career growth, structured requests, and session scheduling.

## Overview

MentorBridge provides a full mentorship workflow:

- Role-based onboarding (Mentee / Mentor / Admin)
- Mentor discovery and request flow
- Request acceptance/rejection lifecycle
- Mentor availability management
- Session booking and tracking
- Profile management and authentication

This repository is built as a production-ready Next.js App Router application with Prisma, NextAuth, and a tested React component/hook architecture.

## Tech Stack

### Frontend

- Next.js (App Router, TypeScript)
- React 19
- Tailwind CSS
- GSAP (animations)
- Lucide React (icons)

### Backend & Data

- Next.js Route Handlers (API endpoints)
- Prisma ORM
- PostgreSQL
- NextAuth (Credentials + Google OAuth)

### Testing & Quality

- Vitest
- React Testing Library
- ESLint + TypeScript strict checks

## Key Features

- **Auth & Access Control**
  - Credentials and Google sign-in
  - Role-aware redirects and protected routes

- **Mentee Experience**
  - Browse mentors with filters
  - Send mentorship requests
  - Book sessions from available mentor slots
  - Track pending requests and active mentors on dashboard

- **Mentor Experience**
  - Manage incoming mentee requests
  - Set and update availability
  - Manage sessions and mentee interactions

- **Dashboard & UI**
  - Role-specific navigation and pages
  - Responsive landing experience
  - Light and dark theme support


## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env` in the project root with required values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 3) Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 4) Start development server

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Prisma generate + production build
npm run start    # Start production server
npm run lint     # Lint checks
npm run test     # Run Vitest suite
```

## Testing

The project includes unit and component coverage for hooks, UI, and key page flows.

Run all tests:

```bash
npm run test
```

## Deployment

Designed for Vercel deployment with Prisma + PostgreSQL.

Notes:

- `postinstall` and `build` scripts run `prisma generate` to avoid stale client issues in cached CI environments.
- Ensure production environment variables are configured (`DATABASE_URL`, `NEXTAUTH_SECRET`, OAuth keys).


