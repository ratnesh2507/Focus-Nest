import Header from "./components/layout/Header";
import FocusMode from "./components/layout/FocusMode";
import SessionNotes from "./components/notes/SessionNotes";
import TimerCard from "./components/timer/TimerCard";
import MusicCard from "./components/music/MusicCard";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [isFocusMode, setIsFocusMode] = useLocalStorage(
    "study-focus-mode",
    false,
  );

  const timer = <TimerCard />;
  const music = <MusicCard />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {!isFocusMode ? (
        <>
          <Header onToggleFocusMode={() => setIsFocusMode(true)} />

          <main className="max-w-7xl mx-auto p-6 h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              <div className="lg:col-span-3 h-full min-h-100">
                <SessionNotes />
              </div>

              <div className="lg:col-span-1 flex flex-col gap-6">
                {timer}
                {music}
              </div>
            </div>
          </main>
        </>
      ) : (
        <FocusMode
          isOpen={isFocusMode}
          onClose={() => setIsFocusMode(false)}
          timer={timer}
          music={music}
        />
      )}
    </div>
  );
}
