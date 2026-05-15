import { useState } from "react";
import { useTimerStore } from "../../store/useTimerStore";
import { formatTime } from "../../lib/formatTime";
import TimerSettingsModal from "./TimerSettingsModal";

const PRESETS = [
  { label: "5m", minutes: 5 },
  { label: "10m", minutes: 10 },
  { label: "25m", minutes: 25 },
  { label: "50m", minutes: 50 },
  { label: "90m", minutes: 90 },
];

const RADIUS = 88;
const STROKE = 5;
const CIRCUM = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE) * 2 + 4;

export default function TimerCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { duration, timeLeft, isRunning, start, pause, reset, setMinutes } =
    useTimerStore();

  const currentMinutes = Math.max(1, Math.floor(duration / 60));
  const progress = duration > 0 ? timeLeft / duration : 1;
  const dashOffset = CIRCUM * (1 - progress);

  const statusLabel = isRunning
    ? "● running"
    : timeLeft === 0
      ? "● done"
      : "● idle";
  const statusColor = isRunning ? "text-green" : "text-faint";

  return (
    <>
      <section className="bg-card border border-border rounded-card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-ui text-sm font-medium text-text">
            Pomodoro Timer
          </span>
          <span className={`font-mono text-[11px] ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Ring + digits */}
        <div className="flex justify-center mb-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            title="Click to set custom duration"
            className="relative flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
            style={{ width: SIZE, height: SIZE }}
          >
            {/* SVG ring — SVG presentation attributes cannot be expressed as Tailwind classes */}
            <svg width={SIZE} height={SIZE} className="absolute top-0 left-0">
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                className="timer-ring-track"
              />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                strokeDasharray={CIRCUM}
                strokeDashoffset={dashOffset}
                className="timer-ring-fill -rotate-90 origin-center"
              />
            </svg>

            {/* Time digits */}
            <span className="font-display text-[2.8rem] leading-none tracking-tight text-text select-none">
              {formatTime(timeLeft)}
            </span>
          </button>
        </div>

        {/* Hint */}
        <p className="font-mono text-[10px] tracking-widest text-faint text-center mb-5">
          TAP RING TO SET DURATION
        </p>

        {/* Presets */}
        <div className="flex gap-1.5 mb-5">
          {PRESETS.map((p) => {
            const active = currentMinutes === p.minutes;
            return (
              <button
                key={p.minutes}
                type="button"
                onClick={() => setMinutes(p.minutes)}
                className={`flex-1 font-mono text-xs py-1.5 rounded-sm border cursor-pointer transition-colors
                  ${
                    active
                      ? "bg-amber-glow border-amber-dim text-amber"
                      : "bg-lift border-border text-muted hover:bg-hover"
                  }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isRunning ? (
            <button
              type="button"
              onClick={start}
              className="flex-1 font-ui text-sm font-medium py-2.5 rounded-btn border cursor-pointer transition-colors bg-green-glow border-green-dim text-green hover:bg-green/22"
            >
              {timeLeft === 0 ? "Restart" : "Start"}
            </button>
          ) : (
            <button
              type="button"
              onClick={pause}
              className="flex-1 font-ui text-sm font-medium py-2.5 rounded-btn border cursor-pointer transition-colors bg-amber-glow border-amber-dim text-amber hover:bg-amber/22"
            >
              Pause
            </button>
          )}

          <button
            type="button"
            onClick={reset}
            className="font-ui text-sm font-medium px-5 py-2.5 rounded-btn border cursor-pointer transition-colors bg-lift border-border text-muted hover:bg-hover"
          >
            Reset
          </button>
        </div>
      </section>

      <TimerSettingsModal
        isOpen={isModalOpen}
        initialMinutes={currentMinutes}
        onClose={() => setIsModalOpen(false)}
        onSave={(minutes) => setMinutes(minutes)}
      />
    </>
  );
}
