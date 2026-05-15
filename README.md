<div align="center">

<!-- <img src="public/favicon.svg" alt="Focus Nest Logo" width="56" height="56" /> -->

# Focus Nest

**A minimalist Study With Me app — Pomodoro timer, session notes, lofi music, and distraction-free Focus Mode.**

[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## Preview

**Home view** — notes, timer, and music in one layout.

![Focus Nest — Home](public/home.png)

**Focus Mode** — full-screen, distraction-free workspace.

![Focus Nest — Focus Mode](public/focus.png)

---

## Features

|     | Feature                   | Details                                                                                   |
| --- | ------------------------- | ----------------------------------------------------------------------------------------- |
| ⏱   | **Pomodoro Timer**        | Preset durations (1 – 90 min), custom scroll-snap picker, Start / Pause / Reset / Restart |
| 🔔  | **Session Notifications** | Toast, browser notification, and alarm sound on completion                                |
| 📝  | **Session Notes**         | Full-height notepad, auto-persisted to localStorage                                       |
| 🎧  | **Lofi Radio**            | Embedded YouTube live stream                                                              |
| 🌙  | **Focus Mode**            | Full-screen glassmorphism overlay, `Esc` to exit                                          |
| 💾  | **Persistence**           | Timer state via Zustand persist middleware, notes via localStorage                        |
| 📱  | **Responsive**            | Works on desktop and mobile                                                               |

---

## Tech Stack

| Category         | Technology                   |
| ---------------- | ---------------------------- |
| Frontend         | React 18 + TypeScript        |
| Styling          | Tailwind CSS v4              |
| Build            | Vite                         |
| Package manager  | Bun                          |
| State management | Zustand + persist middleware |
| Notifications    | react-hot-toast              |
| Icons            | Lucide React                 |
| Storage          | Browser localStorage         |

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Top nav + Focus Mode trigger
│   │   └── FocusMode.tsx        # Full-screen overlay
│   ├── timer/
│   │   ├── TimerCard.tsx        # Pomodoro ring + controls
│   │   └── TimerSettingsModal.tsx  # Scroll-snap duration picker
│   ├── music/
│   │   └── MusicCard.tsx        # YouTube lofi embed
│   └── notes/
│       └── SessionNotes.tsx     # Ruled notepad
├── hooks/
│   └── useLocalStorage.ts
├── store/
│   └── useTimerStore.ts         # Zustand timer store
├── lib/
│   ├── formatTime.ts
│   └── notifySessionComplete.ts
├── App.tsx
├── main.tsx
└── index.css                    # Tailwind v4 @theme tokens

public/
└── alarm.mp3
```

---

## How the Timer Works

All timer logic lives in a single Zustand store, making state seamlessly shared between the normal view and Focus Mode.

```
UI Components  →  useTimerStore (Zustand)  →  setInterval
                                                   ↓
                              localStorage  ←  Notifications + Alarm
```

On page refresh, the persisted `isRunning` flag is detected by `initialize()`, which re-creates the interval — so your session survives a reload.

---

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) ≥ 1.0

```bash
# 1. Clone
git clone https://github.com/ratnesh2507/Focus-Nest.git
cd Focus-Nest

# 2. Install dependencies
bun install

# 3. Start dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Roadmap

### v2 — Accounts & Cloud

- [ ] Authentication via Supabase
- [ ] Cloud sync across devices
- [ ] Daily streaks
- [ ] Sessions completed today
- [ ] Full study history

### v3 — Analytics & AI

- [ ] Analytics dashboard with calendar heatmaps
- [ ] Custom themes
- [ ] Task management
- [ ] AI-powered study insights

---

## Product Vision

Focus Nest is built to grow into a freemium productivity platform.

| Tier                   | What's included                                              |
| ---------------------- | ------------------------------------------------------------ |
| **Free**               | Timer, notes, Focus Mode, lofi music, local persistence      |
| **Account**            | Cloud sync, streaks, statistics, history                     |
| **Premium** _(future)_ | Advanced analytics, themes, integrations, AI recommendations |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

**Ratnesh BVK** — Full-Stack Web Developer & part-time YouTuber

[GitHub →](https://github.com/ratnesh2507)

---

<div align="center">

_Focus Nest is a simple yet powerful productivity companion built to help you stay focused, consistent, and motivated._

⭐ Star the repo if you find it useful!

</div>
