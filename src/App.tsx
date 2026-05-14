import Header from "./components/layout/Header";
import SessionNotes from "./components/notes/SessionNotes";
import TimerCard from "./components/timer/TimerCard";
import MusicCard from "./components/music/MusicCard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="max-w-7xl mx-auto p-6 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Notes Section (75%) */}
          <div className="lg:col-span-3 h-full min-h-100">
            <SessionNotes />
          </div>

          {/* Sidebar (25%) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TimerCard />
            <MusicCard />
          </div>
        </div>
      </main>
    </div>
  );
}
