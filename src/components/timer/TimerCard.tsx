import { useTimer } from "../../hooks/useTimer";
import { formatTime } from "../../lib/formatTime";

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
  const { timeLeft, isRunning, start, pause, reset, setMinutes } = useTimer(
    5 * 60,
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">Pomodoro Timer</h2>

      <div className="text-5xl font-bold tracking-tight text-center py-6">
        {formatTime(timeLeft)}
      </div>

      {/* Presets */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.minutes}
            onClick={() => setMinutes(preset.minutes)}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700 transition"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="rounded-xl bg-emerald-600 px-4 py-2 font-medium hover:bg-emerald-500 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="rounded-xl bg-amber-600 px-4 py-2 font-medium hover:bg-amber-500 transition"
          >
            Pause
          </button>
        )}

        <button
          onClick={reset}
          className="rounded-xl bg-slate-700 px-4 py-2 font-medium hover:bg-slate-600 transition"
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-slate-400 text-center">
        Stay focused and keep going.
      </p>
    </section>
  );
}
