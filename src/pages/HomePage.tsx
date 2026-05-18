import Header from "../components/layout/Header";
import FocusMode from "../components/layout/FocusMode";
import SessionNotes from "../components/notes/SessionNotes";
import TimerCard from "../components/timer/TimerCard";
import MusicCard from "../components/music/MusicCard";

import { useLocalStorage } from "../hooks/useLocalStorage";

export default function HomePage() {
  const [isFocusMode, setIsFocusMode] = useLocalStorage(
    "study-focus-mode",
    false,
  );

  const timer = <TimerCard />;
  const music = <MusicCard />;

  return (
    <div className="min-h-screen bg-bg text-text">
      {!isFocusMode ? (
        <>
          <Header onToggleFocusMode={() => setIsFocusMode(true)} />

          <main className="mx-auto max-w-350 px-6 py-6 h-[calc(100vh-3.5rem)]">
            <div className="grid grid-cols-[1fr_320px] gap-5 h-full">
              {/* Session Notes */}
              <div className="min-h-0 h-full">
                <SessionNotes />
              </div>

              {/* Right Sidebar */}
              <div className="flex flex-col gap-5 min-h-0">
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
