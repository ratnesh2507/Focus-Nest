import { useEffect } from "react";
import { useTimerStore } from "./store/useTimerStore";
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
  const initializeTimer = useTimerStore((state) => state.initialize);

  useEffect(() => {
    initializeTimer();
  }, [initializeTimer]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {!isFocusMode ? (
        <>
          <Header onToggleFocusMode={() => setIsFocusMode(true)} />

          <main
            className="mx-auto px-6 py-6"
            style={{
              maxWidth: "1400px",
              height: "calc(100vh - 3.5rem)",
            }}
          >
            <div
              className="grid gap-5 h-full"
              style={{
                gridTemplateColumns: "1fr 320px",
              }}
            >
              {/* Notes — full height journal */}
              <div className="h-full min-h-0">
                <SessionNotes />
              </div>

              {/* Right sidebar: timer + music stacked */}
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
