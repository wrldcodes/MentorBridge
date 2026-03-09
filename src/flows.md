# MentorBridge App Flows & Architecture

## Overview

MentorBridge is a mentorship matching platform where **mentees** browse and request mentors, **mentors** manage their availability and accept/reject requests, and **admins** oversee the system.

**Core Roles & Permissions:**

- **Mentee**: Browse mentors, request mentorship, book sessions, leave reviews
- **Mentor**: Set availability, manage requests, conduct sessions, view feedback
- **Admin**: Manage users, view all matches/sessions, oversee platform

---

## Database Models

All models from `schema.prisma`:

| Model               | Purpose                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **User**            | Core auth entity. `role` (MENTOR/MENTEE/ADMIN), `email`, `password`, `skills[]`, `name`, `bio`       |
| **Account/Session** | NextAuth auth records                                                                                |
| **Request**         | Mentee → Mentor mentorship request. Status: `PENDING`, `ACCEPTED`, `REJECTED`                        |
| **Availability**    | Mentor time slots. Linked to `mentorId`, includes `dayOfWeek`, `startTime`, `endTime`                |
| **MentorSession**   | Booked session between mentor & mentee. Status: `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |

**Key Relationships:**

- User (1) ↔ (Many) Request (as sender or receiver)
- User (1) ↔ (Many) Availability
- User (1) ↔ (Many) MentorSession (as mentor or mentee)

---

## Core Flows

### 1. Mentee Browsing & Requesting Mentorship

**Route:** `GET /mentors` (mentee-protected)

**Flow:**

1. Mentee lands on **Mentors** page
2. Server fetches all `User` records with `role = MENTOR` + mentee's pending `Request` records
3. `MentorBrowser` displays filterable mentor cards (client-side search on name/skills/bio)
4. Mentee clicks "Request Mentorship" → `POST /api/requests { mentorId }`
5. Backend creates `Request` record with `status = PENDING`
6. Button updates to "Request Pending"

**Key Components:**

- `MentorBrowser` (client) — search & filter mentors
- `RequestMentorshipButton` (client) — submit request, track loading/error states
- `POST /api/requests` — validate mentor exists, prevent duplicates, create record

---

### 2. Mentor Reviewing & Accepting Requests

**Route:** `GET /mentor/requests` (mentor-protected)

**Flow:**

1. Mentor navigates to **My Requests**
2. Server fetches all pending `Request` records where `mentorId = currentUser.id` + mentee details
3. `MentorRequestsList` displays mentee profiles with Accept/Reject buttons
4. Mentor clicks Accept/Reject → `PATCH /api/requests/:id { status }`
5. Backend updates `Request.status` and notifies mentee
6. Request removed from list or marked as accepted

**Key Components:**

- `MentorRequestsList` (client) — display & filter requests
- `RequestCard` (client) — individual request with action buttons
- `PATCH /api/requests/:id` — validate ownership, update status, notify user

---

### 3. Mentor Setting Availability

**Route:** `GET /mentor/availability` (mentor-protected)

**Flow:**

1. Mentor navigates to **Availability**
2. `MentorAvailabilityManager` displays time grid or form
3. Mentor adds/edits/deletes availability slots (day, start time, end time)
4. Client calls `POST /api/availability` or `PUT /api/availability/:id`
5. Backend creates/updates `Availability` records

**Key Components:**

- `MentorAvailabilityManager` (client) — calendar UI for availability
- `POST /api/availability` — create slot
- `PUT /api/availability/:id` — update slot
- `DELETE /api/availability/:id` — remove slot

---

### 4. Mentee Booking Sessions

**Route:** `GET /mentee/sessions` (mentee-protected)

**Flow:**

1. Mentee views **Book a Session** card
2. Selects a matched mentor → loads available slots from `POST /api/availability?mentorId=`
3. Selects a time slot & optional topic
4. Clicks "Book Session" → `POST /api/sessions { mentorId, startTime, endTime, topic }`
5. Backend creates `MentorSession` record with `status = SCHEDULED`
6. Confirmation sent to both parties

**Key Components:**

- `MenteeSessionsView` (client) — session manager with mentor selector & slot picker
- `POST /api/sessions` — validate mentor/mentee, check slot availability, create session

---

### 5. Admin Dashboard

**Route:** `GET /admin` (admin-protected)

**Admin Can:**

- View all users with filters (role, status)
- View all sessions & matches with analytics
- Edit/delete users
- Manually assign mentor ↔ mentee or create sessions

No new flows needed; all data fetches use existing endpoints with admin-level queries.

---

## API Endpoints

All endpoints require NextAuth session & role validation.

| Method | Endpoint                | Role          | Purpose                                          |
| ------ | ----------------------- | ------------- | ------------------------------------------------ |
| GET    | `/api/mentors`          | Any           | List mentors (search: `?q=`, filter: `?skills=`) |
| POST   | `/api/requests`         | Mentee        | Request mentorship                               |
| GET    | `/api/requests`         | Mentor        | Fetch pending requests                           |
| PATCH  | `/api/requests/:id`     | Mentor        | Accept/reject request                            |
| POST   | `/api/availability`     | Mentor        | Create availability slot                         |
| PUT    | `/api/availability/:id` | Mentor        | Update slot                                      |
| DELETE | `/api/availability/:id` | Mentor        | Remove slot                                      |
| GET    | `/api/availability`     | Any           | Fetch mentor slots (query: `?mentorId=`)         |
| POST   | `/api/sessions`         | Mentee        | Book a session                                   |
| GET    | `/api/sessions`         | Any           | Fetch sessions (role-scoped)                     |
| PATCH  | `/api/sessions/:id`     | Mentor/Mentee | Update session status                            |

---

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── (landing)/
│   │   ├── page.tsx (landing hero)
│   │   └── layout.tsx
│   ├── mentee/
│   │   ├── layout.tsx (mentee dashboard chrome)
│   │   ├── sessions/page.tsx
│   │   └── mentors/page.tsx
│   ├── mentor/
│   │   ├── layout.tsx (mentor dashboard chrome)
│   │   ├── requests/page.tsx
│   │   └── availability/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   └── ...
│   └── api/ (all endpoints)
├── components/
│   ├── MentorBrowser.tsx
│   ├── MentorRequestsList.tsx
│   ├── MentorAvailabilityManager.tsx
│   ├── MenteeSessionsView.tsx
│   ├── RequestMentorshipButton.tsx
│   └── ... (other UI components)
├── hooks/
│   ├── useMentorBrowser.ts
│   ├── useMentorRequestsList.ts
│   ├── useMentorAvailabilityManager.ts
│   ├── useMenteeSessionsView.ts
│   └── ... (custom hooks for each feature)
├── lib/
│   ├── auth.ts (NextAuth config)
│   ├── prisma.ts (PrismaClient singleton)
│   └── utils.ts
└── prisma/
    └── schema.prisma (data models)
```

---

## Development Notes

- **Role-based routing:** Use `getServerSession()` in page servers to redirect non-matching roles to `/` or `/profile`
- **Optimistic updates:** Client components use `useTransition` for snappy UX while mutations are in-flight
- **Search & filtering:** Client-side for instant feedback (mentors), server-side for complex queries (sessions)
- **Responsive design:** Tailwind CSS with mobile-first breakpoints (mobile, md: 768px, lg: 1024px)
- **Testing:** Vitest + React Testing Library for hooks & components; integration tests for API routes
