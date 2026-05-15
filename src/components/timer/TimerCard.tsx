import { useState } from "react";
import { useTimerStore } from "../../store/useTimerStore";
import { formatTime } from "../../lib/formatTime";
import TimerSettingsModal from "./TimerSettingsModal";

const PRESETS = [
  { label: "1m", minutes: 1 },
  { label: "5m", minutes: 5 },
  { label: "10m", minutes: 10 },
  { label: "15m", minutes: 15 },
  { label: "25m", minutes: 25 },
  { label: "50m", minutes: 50 },
  { label: "90m", minutes: 90 },
];

export default function TimerCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { duration, timeLeft, isRunning, start, pause, reset, setMinutes } =
    useTimerStore();

  // Convert duration (stored in seconds) to minutes for the modal
  const currentMinutes = Math.max(1, Math.floor(duration / 60));

  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Pomodoro Timer</h2>

        {/* Click timer display to open settings modal */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full text-5xl font-bold tracking-tight text-center py-6 rounded-2xl hover:bg-slate-800/40 transition"
          title="Click to configure timer"
        >
          {formatTime(timeLeft)}
        </button>

        {/* Presets */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.minutes}
              type="button"
              onClick={() => setMinutes(preset.minutes)}
              className={`rounded-xl px-3 py-2 text-sm transition ${
                currentMinutes === preset.minutes
                  ? "bg-indigo-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {!isRunning ? (
            <button
              type="button"
              onClick={start}
              className="rounded-xl bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 transition"
            >
              {timeLeft === 0 ? "Restart" : "Start"}
            </button>
          ) : (
            <button
              type="button"
              onClick={pause}
              className="rounded-xl bg-amber-600 px-4 py-2 font-medium hover:bg-amber-500 transition"
            >
              Pause
            </button>
          )}

          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-slate-700 px-4 py-2 font-medium hover:bg-slate-600 transition"
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-slate-400 text-center">
          Click the timer display to configure custom duration.
        </p>
      </section>

      {/* Timer Settings Modal */}
      <TimerSettingsModal
        isOpen={isModalOpen}
        initialMinutes={currentMinutes}
        onClose={() => setIsModalOpen(false)}
        onSave={(minutes) => {
          setMinutes(minutes);
        }}
      />
    </>
  );
}
