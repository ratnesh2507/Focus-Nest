# Focus Nest 🌙🕒

A modern and minimalist **Study With Me** web application built with React, TypeScript, Tailwind CSS, and [Zustand](https://zustand-demo.pmnd.rs?utm_source=chatgpt.com).

Focus Nest helps students and developers stay productive with a customizable Pomodoro timer, distraction-free Focus Mode, session notes, and ambient lofi music.

---

## ✨ Features (v1)

### ⏱️ Advanced Pomodoro Timer

- Preset durations (1, 5, 10, 15, 25, 50, 90 minutes)
- Custom timer selection using a smooth scroll-snap picker
- Start, Pause, Reset, and Restart controls
- Persistent timer state across page refreshes
- Completion alarm sound
- Browser notifications
- Toast notifications using [react-hot-toast](https://react-hot-toast.com?utm_source=chatgpt.com)

### 📝 Session Notes

- Large note-taking area for each study session
- Automatically persisted in local storage

### 🎧 Ambient Music

- Embedded YouTube live lofi stream

### 🌙 Focus Mode

- Full-screen distraction-free interface
- Beautiful glassmorphism design
- Large timer and music player layout
- Exit using button or `Esc` key

### 💾 Persistence

- Timer settings and remaining time saved using [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data?utm_source=chatgpt.com)
- Notes and preferences stored locally

### 📱 Responsive Design

- Works across desktop and mobile devices

---

## 🛠️ Tech Stack

| Category         | Technology                                                            |
| ---------------- | --------------------------------------------------------------------- |
| Frontend         | React + TypeScript                                                    |
| Styling          | Tailwind CSS                                                          |
| Build Tool       | [Vite](https://vite.dev?utm_source=chatgpt.com)                       |
| Package Manager  | [Bun](https://bun.sh?utm_source=chatgpt.com)                          |
| State Management | [Zustand](https://zustand-demo.pmnd.rs?utm_source=chatgpt.com)        |
| Notifications    | [react-hot-toast](https://react-hot-toast.com?utm_source=chatgpt.com) |
| Icons            | [Lucide React](https://lucide.dev?utm_source=chatgpt.com)             |
| Persistence      | Browser Local Storage                                                 |

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── FocusMode.tsx
│   │
│   ├── timer/
│   │   ├── TimerCard.tsx
│   │   └── TimerSettingsModal.tsx
│   │
│   ├── music/
│   │   └── MusicCard.tsx
│   │
│   └── notes/
│       └── SessionNotes.tsx
│
├── hooks/
│   └── useLocalStorage.ts
│
├── store/
│   └── useTimerStore.ts
│
├── lib/
│   ├── formatTime.ts
│   └── notifySessionComplete.ts
│
├── App.tsx
├── main.tsx
└── index.css

public/
└── alarm.mp3
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/focus-nest.git
cd focus-nest
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Development Server

```bash
bun run dev
```

### 4. Open in Browser

```text
http://localhost:5173
```

---

## 📦 Key Dependencies

```bash
bun add zustand react-hot-toast lucide-react
```

---

## 🧠 Core Concepts Learned

This project demonstrates several important frontend engineering concepts:

- Custom React hooks
- Global state management with Zustand
- Persistent state using local storage
- Modal dialogs with backdrop blur
- Scroll-snap interfaces
- Browser Notifications API
- Audio playback with the Web Audio API
- Full-screen overlays
- Responsive layouts with Tailwind CSS

---

## ⏳ How the Timer Works

The timer logic is centralized in a global Zustand store.

```text
UI Components
     ↓
useTimerStore (Zustand)
     ↓
setInterval
     ↓
Notifications + Alarm
     ↓
Local Storage Persistence
```

This design ensures the timer continues seamlessly when switching between normal mode and Focus Mode.

---

## 🌙 Focus Mode

Focus Mode is a distraction-free workspace that displays:

- A large countdown timer
- Embedded lofi music
- Ambient gradient background
- Keyboard shortcut support (`Esc` to exit)

This creates a clean study environment similar to dedicated productivity applications.

---

## 🔔 Notifications

When a session ends, Focus Nest:

1. Shows a toast notification
2. Sends a browser notification
3. Plays an alarm sound

This helps users stay aware even when working in another tab.

---

## 🗺️ Roadmap

### Version 2

- Authentication with [Supabase](https://supabase.com?utm_source=chatgpt.com)
- Cloud synchronization
- Daily streaks
- Sessions completed today
- Study history
- Multi-device access

### Version 3

- Analytics dashboard
- Calendar heatmaps
- Custom themes
- Task management
- AI-powered study insights

---

## 💡 Product Vision

Focus Nest is designed as a freemium productivity platform:

### Free Version

- Timer
- Notes
- Focus Mode
- Music
- Local persistence

### Account Features

- Cloud sync
- Statistics
- Streaks
- History

### Premium Features (Future)

- Advanced analytics
- Themes
- Integrations
- AI recommendations

---

## 📚 What I Learned

Building Focus Nest helped me gain practical experience with:

- Architecting scalable React applications
- Managing shared state with Zustand
- Persisting application state
- Creating polished user interfaces
- Integrating browser APIs
- Designing products with SaaS evolution in mind

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Ratnesh BVK**

- [GitHub](https://github.com/ratnesh2507?utm_source=chatgpt.com)
- Part-time YouTuber
- Full-Stack Web Developer

---

## ⭐ Support

If you find this project useful:

- Star the repository on [GitHub](https://github.com/ratnesh2507?utm_source=chatgpt.com)
- Share it with friends
- Use it in your daily study sessions

---

> Focus Nest is a simple yet powerful productivity companion built to help you stay focused, consistent, and motivated.
