# Architecture

Focus Nest follows a layered frontend architecture with clear separation between UI, state management, API access, and persistence.

---

# High-Level Architecture

```text
React UI Components
        ↓
Zustand Global Stores
        ↓
Feature API Layer
        ↓
Supabase Client
        ↓
PostgreSQL Database
```

---

# Frontend Architecture

## UI Layer

The UI layer contains reusable React components built with Tailwind CSS v4.

### Responsibilities

- Rendering layouts and interactions
- Managing local component state
- Calling Zustand actions
- Displaying loading and error states

### Example Components

| Component            | Responsibility        |
| -------------------- | --------------------- |
| `TimerCard.tsx`      | Pomodoro timer UI     |
| `SessionNotes.tsx`   | Notes editor          |
| `MusicCard.tsx`      | Lofi player           |
| `Header.tsx`         | Navigation + auth     |
| `StreakCalendar.tsx` | Monthly study heatmap |

---

# State Management

Global state is handled using Zustand.

## Stores

| Store               | Responsibility                    |
| ------------------- | --------------------------------- |
| `useTimerStore`     | Timer state and interval logic    |
| `useAuthStore`      | Supabase authentication session   |
| `useDashboardStore` | Dashboard stats + streak calendar |
| `useStatsStore`     | Session recording                 |

---

# Feature API Layer

Feature APIs isolate Supabase queries from UI components.

```text
UI → Store → Feature API → Supabase
```

## Example

```ts
fetchStats(userId);
```

This approach keeps components clean and makes backend logic reusable.

---

# Routing

Client-side routing uses React Router DOM v7.

## Routes

| Route        | Page                 |
| ------------ | -------------------- |
| `/`          | Home study workspace |
| `/dashboard` | Analytics dashboard  |

---

# Authentication Flow

Authentication uses Supabase Auth with Google OAuth.

```text
User clicks Sign In
      ↓
Supabase Google OAuth
      ↓
Redirect back to app
      ↓
Session restored
      ↓
Dashboard unlocked
```

---

# Database Architecture

Focus Nest uses PostgreSQL through Supabase.

## Main Tables

| Table            | Purpose                       |
| ---------------- | ----------------------------- |
| `profiles`       | User metadata                 |
| `study_sessions` | Individual completed sessions |
| `daily_activity` | One row per active day        |
| `user_stats`     | Aggregated statistics         |

---

# RPC Functions

Business logic is centralized in PostgreSQL RPC functions.

## Example

```sql
record_study_session(
  p_user_id uuid,
  p_duration_minutes integer
)
```

This function:

1. Inserts a study session
2. Upserts daily activity
3. Updates streaks
4. Updates aggregate statistics

---

# Calendar System

The dashboard calendar uses a 6×7 fixed grid.

```text
42 cells total
7 columns
6 rows
```

The frontend fetches activity dates from Supabase and maps them onto the calendar.

---

# Persistence Strategy

## Local Persistence

| Data        | Storage         |
| ----------- | --------------- |
| Timer state | Zustand persist |
| Notes       | localStorage    |
| Focus Mode  | localStorage    |

## Cloud Persistence

| Data         | Storage  |
| ------------ | -------- |
| Sessions     | Supabase |
| Streaks      | Supabase |
| User profile | Supabase |

---

# Design Principles

## Separation of Concerns

Each layer has a single responsibility.

## Thin Components

Components avoid direct database logic.

## Centralized Business Logic

Complex operations happen in PostgreSQL RPC functions.

## Reusable Utilities

Date logic is extracted into `calendarUtils.ts`.

---

# Future Scalability

The architecture supports future additions like:

- Charts
- AI insights
- Task management
- Premium subscriptions
- Real-time sync
- Mobile apps

without major restructuring.
