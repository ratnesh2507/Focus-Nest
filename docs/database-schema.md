# Database Schema

Focus Nest uses PostgreSQL through Supabase.

---

# Tables

## profiles

Stores user metadata synced from Google OAuth.

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
```

---

## study_sessions

Stores every completed Pomodoro session.

```sql
create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  duration_minutes integer not null,
  completed_at timestamptz default now(),
  notes_snapshot text
);
```

---

## daily_activity

Tracks whether a user studied on a specific date.

```sql
create table public.daily_activity (
  user_id uuid not null references profiles(id) on delete cascade,
  activity_date date not null,
  sessions_count integer default 1,

  primary key (user_id, activity_date)
);
```

---

## user_stats

Stores aggregate statistics for fast dashboard loading.

```sql
create table public.user_stats (
  user_id uuid primary key references profiles(id) on delete cascade,

  current_streak integer default 0,
  longest_streak integer default 0,

  sessions_completed integer default 0,
  sessions_completed_today integer default 0,

  total_focus_minutes integer default 0,
  longest_session_minutes integer default 0,

  account_age_days integer default 0,

  last_session_date date,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

# RPC Functions

## record_study_session

Centralized database function for session recording.

```sql
record_study_session(
  p_user_id uuid,
  p_duration_minutes integer
)
```

---

# What This Function Does

## 1. Insert session

```text
study_sessions
```

A new completed session is stored.

---

## 2. Upsert activity day

```text
daily_activity
```

The current date is marked active.

---

## 3. Refresh streaks

```text
user_stats
```

Current streak and longest streak are recalculated.

---

## 4. Update totals

Updates:

- total focus minutes
- sessions completed
- longest session
- sessions today

---

# Row Level Security (RLS)

All tables use Row Level Security.

Users can only access their own rows.

---

# Example Policy

```sql
create policy "Users can view own stats"
on user_stats
for select
using (auth.uid() = user_id);
```

---

# Why RPC Functions Are Used

RPC functions provide:

- atomic updates
- consistent business logic
- fewer frontend queries
- improved security
- easier maintenance

---

# Relationships

```text
profiles
   ↓
study_sessions
   ↓
daily_activity
   ↓
user_stats
```

---

# Future Database Plans

Potential future tables:

- tasks
- goals
- achievements
- premium_subscriptions
- ai_insights
- session_tags
