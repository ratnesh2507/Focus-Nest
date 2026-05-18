# Study Streak System

Focus Nest automatically tracks study consistency using PostgreSQL RPC functions and daily activity aggregation.

---

# High-Level Flow

```text
Pomodoro completes
        ↓
record_study_session RPC
        ↓
study_sessions insert
        ↓
daily_activity upsert
        ↓
user_stats recalculated
        ↓
Dashboard refreshes
```

---

# Step 1 — Timer Completion

When the timer reaches zero:

```ts
notifySessionComplete();
```

fires:

- toast notification
- browser notification
- alarm sound

---

# Step 2 — Session Recording

If the user is authenticated:

```ts
recordCompletedSession();
```

calls the Supabase RPC:

```sql
record_study_session()
```

---

# Step 3 — Insert Study Session

A row is inserted into:

```text
study_sessions
```

Example:

```text
duration_minutes = 25
completed_at = 2026-05-18
```

---

# Step 4 — Daily Activity Upsert

The RPC ensures only one activity row exists per day.

```text
daily_activity
```

This powers the calendar heatmap.

---

# Step 5 — Streak Calculation

The backend recalculates:

- current streak
- longest streak
- sessions today
- total minutes

and updates:

```text
user_stats
```

---

# Why Streak Logic Is Server-Side

Benefits:

- prevents inconsistent calculations
- reduces frontend complexity
- guarantees atomic updates
- centralizes business rules

---

# Calendar Heatmap

The frontend loads activity dates:

```ts
fetchStreakDays();
```

The calendar then maps active days to 🔥 cells.

---

# Timezone Handling

Dates are normalized using local calendar dates before insertion.

This prevents UTC offsets from shifting activity into the wrong day.

---

# Example

```text
User studies on:
18 May
19 May
20 May
```

Current streak becomes:

```text
3 days
```

---

# Dashboard Metrics

The dashboard displays:

- current streak
- longest streak
- total focus time
- sessions completed

from `user_stats`.

---

# Future Improvements

Planned additions:

- weekly charts
- yearly heatmaps
- achievements
- streak freezes
- milestones
- productivity insights
