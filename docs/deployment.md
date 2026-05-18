# Deployment Guide

Focus Nest is designed for deployment on Vercel with Supabase as the backend.

---

# Requirements

- GitHub repository
- Supabase project
- Vercel account

---

# Step 1 — Create Supabase Project

Go to:

```text
https://supabase.com
```

Create a new project.

---

# Step 2 — Run Database Schema

Open:

```text
SQL Editor
```

Run the SQL from:

```text
docs/database-schema.md
```

---

# Step 3 — Configure Google OAuth

In Supabase:

```text
Authentication → Providers → Google
```

Enable Google provider.

Add redirect URLs:

```text
http://localhost:5173
https://your-domain.vercel.app
```

---

# Step 4 — Clone Repository

```bash
git clone https://github.com/ratnesh2507/Focus-Nest.git
cd Focus-Nest
```

---

# Step 5 — Install Dependencies

```bash
bun install
```

---

# Step 6 — Environment Variables

Create:

```text
.env.local
```

```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

---

# Step 7 — Run Locally

```bash
bun run dev
```

---

# Step 8 — Deploy to Vercel

Push repository to GitHub.

Then import the repository into Vercel.

---

# Step 9 — Add Environment Variables in Vercel

Add:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

inside:

```text
Project Settings → Environment Variables
```

---

# Step 10 — Redeploy

Vercel will automatically build and deploy the application.

---

# Production Notes

## Never Commit

```text
.env.local
service role keys
database passwords
```

---

# Recommended Setup

## Public Repository

Safe because:

- secrets stay in env variables
- database protected by RLS
- OAuth handled by Supabase

---

# Recommended Domain

Examples:

```text
focusnest.app
focusnest.io
```

---

# Future Deployment Plans

Potential future infrastructure:

- CDN caching
- Edge functions
- Analytics
- Rate limiting
- AI services
