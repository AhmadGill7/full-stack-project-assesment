# Advanced Full Stack Assessment Project

This assessment is intentionally designed to test **Full Stack**

The candidate should reason about:
- request / response contracts
- frontend state and UX
- backend validation and filtering
- optimistic updates and rollback
- pagination and query handling
- loading, error, and empty states
- how UI behavior depends on backend behavior

## Stack
- Frontend: React + Vite + Redux Toolkit
- Backend: Express
- Data: local in-memory JSON

## Setup

From the root:

```bash
npm install
npm run install:all
```

## Run

Terminal 1:

```bash
npm run dev:server
```

Terminal 2:

```bash
npm run dev:client
```

Frontend:
- http://localhost:5173

Backend:
- http://localhost:4000

## Assessment Scenario

You are working on an internal operations dashboard for an engineering team.
The dashboard shows work items, supports filtering, search, pagination, and status updates.

The assessment is deliberately incomplete and contains bugs on both sides of the stack.

## Candidate Tasks

### Full stack integration
1. Fix the frontend/backend status update flow
2. Fix query handling so search, status filter, and pagination work together correctly
3. Make search behave consistently across frontend and backend
4. Add clear empty, loading, and error states
5. Keep optimistic UI updates safe when server validation fails

### Backend
6. Validate allowed status values
7. Fix summary stats bug
8. Fix pagination metadata
9. Improve search to be trimmed and case-insensitive
10. Return consistent error shapes

### Frontend
11. Fix page reset behavior when filters change
12. Improve Redux state boundaries
13. Prevent bad UX during update failures
14. Make status update controls reflect pending state
15. Explain what should be local state vs Redux state

### Senior-level discussion
16. Explain how you would test this end to end
17. Explain how you would move from in-memory data to database-backed pagination
18. Explain tradeoffs of optimistic updates in this UI
19. Explain where caching would or would not help
20. Explain how you would handle race conditions between filter changes and task updates

## What this project is intended to assess
- real full stack debugging
- API contract thinking
- backend validation
- frontend/backend coupling awareness
- state management decisions
- product-quality UX handling
- ability to improve an existing codebase rather than start from scratch

## Tip of issues
1. frontend PATCH path is wrong (`/task/:id` instead of `/tasks/:id`)
2. backend search is case-sensitive and not trimmed
3. backend does not validate allowed status values
4. backend summary `done` count is wrong
5. backend `totalPages` calculation is wrong
6. frontend filter changes do not reset page
7. optimistic update rollback works, but candidate should improve overall behavior and explanation
8. error shape is inconsistent and should be unified