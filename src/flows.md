## Entity Relationship Diagrams (ERD)

```
User (Base Entity)
├── id (PK)
├── email (Unique)
├── password
├── role (admin | mentor | mentee)
├── createdAt
└── updatedAt

Admin (extends User)
├── userId (FK to User)
└── permissions

Mentor (extends User)
├── userId (FK to User)
├── name
├── bio
├── skills []
├── industry
├── yearsOfExperience
├── profileImage
├── isActive
└── createdAt

Mentee (extends User)
├── userId (FK to User)
├── name
├── bio
├── skills [] (looking to learn)
├── industry (interested in)
├── profileImage
└── createdAt

Availability
├── id (PK)
├── mentorId (FK to Mentor)
├── dayOfWeek
├── startTime
├── endTime
├── isBooked
└── createdAt

Mentorship (Match)
├── id (PK)
├── mentorId (FK to Mentor)
├── menteeId (FK to Mentee)
├── status (pending | accepted | rejected | completed)
├── createdAt
├── acceptedAt
└── endedAt

Session
├── id (PK)
├── mentorshipId (FK to Mentorship)
├── mentorId (FK to Mentor)
├── menteeId (FK to Mentee)
├── scheduledDate
├── startTime
├── endTime
├── status (scheduled | completed | canceled)
├── notes
├── createdAt
└── completedAt

Review (Mentee Feedback)
├── id (PK)
├── sessionId (FK to Session)
├── menteeId (FK to Mentee)
├── mentorId (FK to Mentor)
├── rating (1-5)
├── comment
└── createdAt

Comment (Mentor Feedback)
├── id (PK)
├── sessionId (FK to Session)
├── mentorId (FK to Mentor)
├── menteeId (FK to Mentee)
├── comment
└── createdAt
```

Relationships:

- User (1) --> (1) Admin/Mentor/Mentee
- Mentor (1) --> (Many) Availability
- Mentor (1) --> (Many) Mentorship
- Mentee (1) --> (Many) Mentorship
- Mentorship (1) --> (Many) Session
- Session (1) --> (1) Review
- Session (1) --> (1) Comment

# Role and Access diagram

UI-->create acct/login
login based on role--> if (admin) manage users and oversee all matches and sessions.
if(mentors) --> set availability, accept match requests, and meet with mentees.
if (mentees) --> browse mentors, send match requests, and schedule sessions
Admin --> Add/edit users, view all sessions, and assign mentors to mentees
manually
Mentor --> Create profile, set availability, accept/reject mentee requests
Mentee --> Create profile, view mentors, request mentorship, book sessions
each user can only see and access pages based on their role.

# Sequence Diagrams

## 1. User Registration & Profile Setup Flow

```
User --> UI: Click Register
UI --> Backend: Submit registration form (email, password, role)
Backend --> Database: Validate email uniqueness
Backend --> Database: Create User record
Backend --> Backend: Assign role (Admin/Mentor/Mentee)
Backend --> UI: Registration successful
UI --> User: Redirect to profile completion
User --> UI: Fill out profile form (name, bio, skills, etc.)
UI --> Backend: Submit profile data
Backend --> Database: Create Mentor/Mentee record
Backend --> UI: Profile created successfully
UI --> User: Redirect to dashboard (role-based)
```

## 2. Mentee Browsing & Match Request Flow

```
Mentee --> UI: Access Mentors page
UI --> Backend: Fetch available mentors (with filters)
Backend --> Database: Query mentors by skills/industry
Backend --> Database: Fetch mentor profiles & availability
Backend --> UI: Return mentors list
UI --> Mentee: Display mentors with search/filter options
Mentee --> UI: Select mentor & click "Request Mentorship"
UI --> Backend: Submit mentorship request
Backend --> Database: Create Mentorship record (status: pending)
Backend --> Backend: Send notification to Mentor
Backend --> UI: Request submitted successfully
UI --> Mentee: Display "Request Pending" status
```

## 3. Mentor Receiving & Accepting/Rejecting Requests Flow

```
Backend --> Mentor: Send notification (new mentee request)
Mentor --> UI: Navigate to "My Requests"
UI --> Backend: Fetch pending mentorship requests
Backend --> Database: Query mentorship records (status: pending)
Backend --> UI: Display requests with mentee profiles
Mentor --> UI: Review mentee profile & click Accept/Reject

--- If Accept ---
UI --> Backend: Submit acceptance
Backend --> Database: Update Mentorship status to "accepted"
Backend --> Database: Create Match record
Backend --> Backend: Notify Mentee of acceptance
Backend --> UI: Match created successfully

--- If Reject ---
UI --> Backend: Submit rejection
Backend --> Database: Update Mentorship status to "rejected"
Backend --> Backend: Notify Mentee of rejection
Backend --> UI: Request rejected
```

## 4. Mentor Setting Availability & Session Booking Flow

```
Mentor --> UI: Access "Set Availability"
UI --> Backend: Fetch mentor's current availability
Backend --> Database: Query Availability records
Backend --> UI: Display availability schedule
Mentor --> UI: Create/Update availability slots (day, time)
UI --> Backend: Submit availability data
Backend --> Database: Create/Update Availability records
Backend --> UI: Availability updated successfully

--- Mentee Side ---
Mentee --> UI: Access "Book Session"
UI --> Backend: Fetch available slots for matched mentor
Backend --> Database: Query Availability (isBooked: false)
Backend --> UI: Display available time slots
Mentee --> UI: Select slot & confirm booking
UI --> Backend: Submit session booking request
Backend --> Database: Create Session record
Backend --> Database: Update Availability (isBooked: true)
Backend --> Backend: Send confirmation to both Mentor & Mentee
Backend --> UI: Session booked successfully
UI --> Backend: Schedule email reminder (optional)
```

## 5. Session Completion & Feedback Flow

```
--- After Session Completion ---
Backend --> Mentee: Send notification to provide feedback
Mentee --> UI: Navigate to "My Sessions"
UI --> Backend: Fetch completed sessions
Backend --> Database: Query Sessions (status: completed)
Backend --> UI: Display sessions ready for review
Mentee --> UI: Click on session & write review (rating 1-5 + comment)
UI --> Backend: Submit review data
Backend --> Database: Create Review record
Backend --> Database: Update Session (feedback received)
Backend --> Backend: Notify Mentor of feedback
Backend --> UI: Review submitted successfully

--- Mentor Optional Feedback ---
Mentor --> UI: Navigate to "My Sessions"
UI --> Backend: Fetch completed sessions with mentee feedback
Backend --> Database: Query Sessions (status: completed)
Backend --> UI: Display sessions
Mentor --> UI: Optionally add comment on session
UI --> Backend: Submit mentor comment
Backend --> Database: Create Comment record
Backend --> UI: Comment saved successfully
```

## 6. Admin Panel & User Management Flow

```
Admin --> UI: Login with admin credentials
UI --> Backend: Authenticate admin role
Backend --> Database: Verify admin role
Backend --> UI: Grant access to Admin Dashboard

Admin --> UI: Click "View All Users"
UI --> Backend: Fetch all users (filters: role, status)
Backend --> Database: Query all User records with Mentor/Mentee details
Backend --> UI: Display users table

Admin --> UI: Click "View Matches"
UI --> Backend: Fetch all mentorship matches
Backend --> Database: Query all Mentorship records with details
Backend --> UI: Display matches with status & stats

Admin --> UI: Click "View Sessions"
UI --> Backend: Fetch all sessions with analytics
Backend --> Database: Query Session data with completion stats
Backend --> UI: Display sessions dashboard

Admin --> UI: Manually assign mentor to mentee
UI --> Backend: Submit manual assignment
Backend --> Database: Create Mentorship record (pre-accepted)
Backend --> Database: Create initial Session if applicable
Backend --> Backend: Notify both users
Backend --> UI: Assignment successful

--- User Management ---
Admin --> UI: Click Edit/Delete on user
UI --> Backend: Submit user modification
Backend --> Database: Update/Delete User record
Backend --> Backend: Handle cascading deletes if necessary
Backend --> UI: User updated successfully
```

## 7. Authentication & Session Management Flow

```
User --> UI: Submit login credentials
UI --> Backend: Send credentials to auth endpoint
Backend --> Backend: Validate credentials against database
Backend --> Backend: Generate JWT/Session token
Backend --> UI: Return auth token
UI --> Browser: Store token (httpOnly cookie or localStorage)
UI --> Backend: Use token for all subsequent requests
Backend --> Backend: Verify token on each request
Backend --> Database: Query user role & permissions
Backend --> UI: Authorize based on role
UI --> User: Display role-appropriate dashboard

--- Logout ---
User --> UI: Click logout
UI --> Backend: Invalidate session/token
UI --> Browser: Clear stored token
UI --> User: Redirect to login page
```

# State diagram

## Mentee State Flow

```
[SignUp] --> [CreateProfile] --> [BrowseMentors] --> [SelectMentor] --> [SendRequest]
[SendRequest] --> {RequestPending}
{RequestPending} --> [RequestAccepted] or [RequestRejected]
[RequestRejected] --> [BrowseMentors]
[RequestAccepted] --> [MatchCreated] --> [ViewAvailability]
[ViewAvailability] --> [BookSession] --> [SessionScheduled]
[SessionScheduled] --> [SessionActive] --> [SessionCompleted]
[SessionCompleted] --> [ProvideReview] --> [ReviewSubmitted]
[ReviewSubmitted] --> [ViewAvailability]
```

## Mentor State Flow

```
[SignUp] --> [CreateProfile] --> [SetAvailability] --> [Ready]
[Ready] --> {ReceiveRequest}
{ReceiveRequest} --> [AcceptRequest] or [RejectRequest]
[RejectRequest] --> [Ready]
[AcceptRequest] --> [MatchCreated] --> [SessionScheduled]
[SessionScheduled] --> [SessionActive] --> [SessionCompleted]
[SessionCompleted] --> [ProvideComment] --> [CommentSubmitted]
[CommentSubmitted] --> [Ready]
[SetAvailability] --> [UpdateAvailability] --> [Ready]
```

## Admin State Flow

```
[SignUp] --> [AdminPanel] --> [ViewUsers]
[ViewUsers] --> [ViewMatches]
[ViewMatches] --> [ViewSessions]
[ViewSessions] --> {AdminAction}
{AdminAction} --> [ManuallyAssignMentor] or [ManageUsers] or [MonitorSessions]
[ManuallyAssignMentor] --> [MatchCreated]
[ManageUsers] --> [EditUser] or [DeleteUser]
[MonitorSessions] --> [ViewSessionDetails]
```



## Mentee Browsing & Match Request Flow

### High-level user journey

1. **Mentee opens Mentors page**
   - Route: `GET /mentors`
   - Access: authenticated **mentee** users only (checked via `getCurrentUser` and `Role.MENTEE`).
2. **System loads mentor catalog**
   - Server component in `mentors/page.tsx` fetches:
     - All mentors (`User` records with `role = MENTOR`).
     - All **pending** `Request` records where `menteeId` is the current user.
   - Both queries run in parallel using `Promise.all` for optimal performance.
3. **UI displays mentors with search/filter**
   - Client component: `MentorBrowser`.
   - Shows:
     - Search input (name / bio / skills).
     - Skill chips derived from mentor skills.
     - Responsive grid of mentor cards (name, skills, bio).
   - Filtering is done **client-side** with `useMemo` for instant feedback and minimal network roundtrips.
4. **Mentee requests mentorship**
   - Each mentor card contains `RequestMentorshipButton`.
   - On click:
     - Calls `POST /api/requests` with `{ mentorId }`.
     - Shows `"Requesting..."` while in-flight.
     - On success where status is `PENDING`, local state flips to “Request Pending”.
5. **System creates a mentorship request**
   - API route: `POST /api/requests`.
   - Logic:
     - Uses NextAuth (`getServerSession(authOptions)`) to ensure the caller is authenticated.
     - Verifies the caller is a `MENTEE` (`Role.MENTEE`).
     - Validates `mentorId` and ensures:
       - Mentor exists.
       - Mentor has role `MENTOR`.
       - Mentee is not requesting themselves.
     - Checks for an existing `Request` with:
       - Same `mentorId` and `menteeId`.
       - `status = PENDING`.
     - If a pending request exists:
       - Returns it as a successful, idempotent response (`alreadyPending: true`).
     - Otherwise:
       - Creates a new `Request` record with:
         - `topic` (fallback: `"Mentorship request"`).
         - Optional `message`.
         - `status = PENDING` (default in schema).
6. **UI reflects pending state**
   - On initial page load:
     - `mentors/page.tsx` passes `pendingMentorIds` (from pending `Request` records) down to `MentorBrowser`.
     - `MentorBrowser` forwards `initialIsPending` into `RequestMentorshipButton`.
   - After a successful POST:
     - `RequestMentorshipButton` sets local `isPendingRequest = true`.
     - Button changes to a non-clickable “Request Pending” pill.
   - Error states:
     - Inline error text is shown below the button if the API returns a non-2xx response.

### Data model

We reuse existing Prisma models in `schema.prisma`:

- **`User`**
  - `role: Role` (`ADMIN | MENTOR | MENTEE`).
  - `skills: String[]` (used for mentor discovery filters).
  - Relations:
    - `sentRequests: Request[] @relation("SentRequests")`
    - `receivedRequests: Request[] @relation("ReceivedRequests")`
- **`Request`**
  - `menteeId`, `mentorId` (FKs to `User`).
  - `status: RequestStatus` (`PENDING | ACCEPTED | REJECTED`).
  - Linked to `User` via the `SentRequests` / `ReceivedRequests` relations.

No new Prisma models were required for this flow.

### Backend endpoints

- **`GET /api/mentors`** (`src/app/api/mentors/route.ts`)
  - Returns a filtered list of mentors for generic use (e.g., future landing pages).
  - Filters:
    - `q`: free-text search across name, bio, and skills.
    - `skills`: optional repeated query parameter (`skills=react&skills=node`) matched with `hasSome`.
  - Only users with `role = MENTOR` are returned.

- **`POST /api/requests`** (`src/app/api/requests/route.ts`)
  - Auth:
    - Requires a logged-in user (NextAuth session).
    - Enforces `Role.MENTEE` (forbidden for mentors/admins).
  - Safety & UX:
    - Prevents self-request (`mentorId !== user.id`).
    - Ensures the target is a real mentor.
    - Enforces idempotency for pending requests (returns existing pending request instead of creating a duplicate).
  - Response:
    - On success:
      - `{ success: true, requestId, status }` with `201` (new) or `200` (already pending).
    - On error:
      - `{ error: string }` with appropriate HTTP status (400, 401, 403).

### Frontend components

- **`MentorBrowser`** (`src/app/components/MentorBrowser.tsx`)
  - Props:
    - `mentors`: list of mentors from the server.
    - `pendingMentorIds`: mentor IDs with pending requests for the current mentee.
  - Responsibilities:
    - Lightweight, client-side search over existing mentor data for high responsiveness.
    - Derived UI:
      - Unique skills list, used to render filter chips.
      - Filtered mentor list, memoized for performance.
    - Renders:
      - Search input, skill chips, and mentor cards.
      - Each mentor card includes `RequestMentorshipButton`.

- **`RequestMentorshipButton`** (`src/app/components/RequestMentorshipButton.tsx`)
  - Client component controlling the “Request Mentorship” / “Request Pending” button.
  - Uses `useTransition` to keep the UI snappy while requesting.
  - Handles:
    - Submitting the mentorship request.
    - Updating local state on success (`PENDING`).
    - Inline error display for failures.
  - Optimized to avoid unnecessary re-renders and keep API interactions minimal.

### Route and layout integration

- **Page**: `src/app/mentors/page.tsx`
  - Server component that:
    - Guards access based on authentication and role.
    - Fetches mentors and pending requests in parallel.
    - Passes data into `MentorBrowser` inside a padded container.
  - Layout:
    - Because `/mentors` is at the app root level, it currently uses the **root layout** (`src/app/layout.tsx`).
    - Mentee-specific header and sidebar come from `src/app/mentee/layout.tsx`, which apply to routes under `/mentee/*`.
    - If we want `/mentors` to share the full mentee dashboard chrome (header + sidebar), we can move this page under `/mentee/mentors/page.tsx` or use route groups.

## Mentor Receiving & Accepting/Rejecting Requests Flow

This section describes how mentors will discover, review, and act on incoming mentorship requests. It complements the mentee browsing flow and uses the same underlying `Request` data model.

### High-level sequence

```text
Backend --> Mentor: Send notification (new mentee request)
Mentor --> UI: Navigate to "My Requests"
UI --> Backend: Fetch pending mentorship requests
Backend --> Database: Query mentorship records (status: pending)
Backend --> UI: Display requests with mentee profiles
Mentor --> UI: Review mentee profile & click Accept/Reject

--- If Accept ---
UI --> Backend: Submit acceptance
Backend --> Database: Update Mentorship status to "accepted"
Backend --> Database: Create Match record
Backend --> Backend: Notify Mentee of acceptance
Backend --> UI: Match created successfully

--- If Reject ---
UI --> Backend: Submit rejection
Backend --> Database: Update Mentorship status to "rejected"
Backend --> Backend: Notify Mentee of rejection
Backend --> UI: Request rejected
```

### Data model

We continue to rely on the existing `Request` and `User` models in `schema.prisma`:

- **`User`**
  - `role: Role` (`ADMIN | MENTOR | MENTEE`).
  - Relations:
    - `receivedRequests: Request[] @relation("ReceivedRequests")` – all requests where this user is the mentor.
- **`Request`**
  - `mentorId` / `menteeId` link the request to both parties.
  - `status: RequestStatus` (`PENDING | ACCEPTED | REJECTED`).
  - `createdAt`, `updatedAt` allow us to sort by recency.

For an eventual “match” abstraction, we can either:

- Treat an `ACCEPTED` `Request` as the match (simplest; no new table), or
- Introduce a dedicated `Mentorship` model that is created when a request is accepted, which then owns future `MentorSession` records.

At present, the codebase leans toward using the existing `Request` + `MentorSession` models; a separate `Mentorship` table can be introduced later without breaking the request flow.

### Backend endpoints (planned)

To support the mentor side of the flow, we will add:

- **`GET /api/requests`** (mentor-facing)
  - Auth:
    - Requires an authenticated user.
    - Restricts to `Role.MENTOR`.
  - Behavior:
    - Returns all `Request` records where:
      - `mentorId = currentUser.id`
      - `status = PENDING` by default (optionally filterable by status).
    - Includes denormalized mentee information (name, skills, bio) via Prisma `include`/`select` for a single efficient query.

- **`PATCH /api/requests/:id`**
  - Auth:
    - Requires an authenticated user.
    - Restricts to `Role.MENTOR`.
    - Verifies that `currentUser.id` is the `mentorId` on the target `Request`.
  - Request body:
    - `{ status: "ACCEPTED" | "REJECTED" }`
  - Behavior:
    - Validates that the target `Request` is currently `PENDING`.
    - On `"ACCEPTED"`:
      - Updates `Request.status` to `ACCEPTED`.
      - Optionally creates a `MentorSession` or `Mentorship` record to represent the new match and the first session.
    - On `"REJECTED"`:
      - Updates `Request.status` to `REJECTED`.
    - In both cases, enqueues a notification to the mentee (e.g., via a `Notification` table, email, or real-time channel).

### Mentor UI: "My Requests"

Location:

- Mentor-side navigation already uses `src/app/mentor/layout.tsx` for header + sidebar.
- The “My Requests” page should live under `src/app/mentor/my-requests/page.tsx` so it inherits the mentor dashboard chrome and feels consistent with the rest of the app.

Behavior:

1. **Initial load**
   - Server component performs:
     - `getCurrentUser()` and role check (`Role.MENTOR`), redirecting non-mentors away.
     - A single Prisma query to fetch pending `Request` records for this mentor, including mentee details.
   - Data is streamed into a client component (e.g., `MentorRequestsList`) for interactive filtering and actions.
2. **Displaying requests**
   - Each row/card shows:
     - Mentee name, skills, and brief bio.
     - Time since request (`createdAt` relative time).
     - Any message the mentee included.
     - Two primary actions: **Accept** and **Reject**.
3. **Action handling**
   - Client component uses a mutation (`fetch`/`PATCH`) to `PATCH /api/requests/:id`.
   - While in-flight:
     - Button(s) show a loading state and are disabled to prevent double submits.
   - On success:
     - The request is optimistically removed from the list or its status is updated in local state.
     - A toast confirms the action (e.g., “Request accepted, mentee will be notified.”).
   - On error:
     - An inline error or toast informs the mentor and leaves the item in place.

### Notifications

The flow assumes a notification mechanism that can be implemented incrementally:

1. **v1 – In-app only**
   - When a request is created or its status changes, write a row to a `Notification` table targeting the other party.
   - Surface unread notifications in dashboards (badge count, dropdown list).
2. **v2 – Email**
   - Hook into the same events to trigger transactional emails via a provider.
3. **v3 – Real-time**
   - Use WebSockets or a service like Pusher/Ably to push updates live to connected clients.

This keeps the request acceptance flow decoupled from the delivery channel while still providing a clear place to add richer UX later.

