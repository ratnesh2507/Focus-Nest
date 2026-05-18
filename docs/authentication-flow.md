# Authentication Flow

Focus Nest uses Supabase Auth with Google OAuth.

---

# Authentication Overview

```text
User clicks Sign In
      ↓
Google OAuth
      ↓
Supabase Auth
      ↓
Redirect back to app
      ↓
Session restored
      ↓
Dashboard unlocked
```

---

# Sign-In Flow

## Step 1 — User clicks Sign In

The user clicks the Google sign-in button in `Header.tsx`.

```ts
signInWithGoogle();
```

---

## Step 2 — Redirect to Google OAuth

Supabase redirects the user to Google.

```ts
supabase.auth.signInWithOAuth({
  provider: "google",
});
```

---

## Step 3 — User grants permission

Google authenticates the user.

---

## Step 4 — Redirect back to app

The user returns to:

```text
http://localhost:5173/dashboard
```

or the deployed production URL.

---

# Session Management

Supabase automatically stores:

- access token
- refresh token
- user session

The session persists across:

- refreshes
- browser restarts
- tabs

---

# useAuthStore

Authentication state is centralized in Zustand.

## Responsibilities

- Initialize session
- Listen for auth changes
- Expose user object
- Handle sign out

---

# onAuthStateChange

The app subscribes to auth changes.

```ts
supabase.auth.onAuthStateChange();
```

This keeps UI state synchronized automatically.

---

# Protected Routes

Dashboard features require authentication.

Unauthenticated users:

- cannot access cloud features
- cannot record sessions
- cannot load streaks

---

# Sign Out Flow

```text
User clicks Sign Out
      ↓
Supabase clears session
      ↓
Stores reset
      ↓
User returned to guest state
```

---

# Security

Authentication security is handled by Supabase.

## Important Protections

- JWT-based sessions
- Secure refresh tokens
- OAuth provider verification
- Row Level Security (RLS)

---

# Why Supabase Auth Was Chosen

Benefits:

- simple integration
- secure OAuth handling
- built-in session persistence
- PostgreSQL integration
- minimal backend setup
