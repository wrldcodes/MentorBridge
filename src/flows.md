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
