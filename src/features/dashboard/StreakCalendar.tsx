import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useDashboardStore } from "../../store/useDashboardStore";
import {
  getCalendarDays,
  getMonthLabel,
  isFutureDate,
  isSameDate,
  isToday,
} from "./calendarUtils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StreakCalendar() {
  const { user } = useAuthStore();
  const { streakDays, loadStreakDays } = useDashboardStore();

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  useEffect(() => {
    if (!user) return;
    loadStreakDays(user.id, currentMonth);
  }, [user, currentMonth, loadStreakDays]);

  const calendarDays = getCalendarDays(currentMonth);
  const hasActivity = (date: Date) =>
    streakDays.some((day) => isSameDate(day, date));

  const prevMonth = () =>
    setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentMonth((p) => new Date(p.getFullYear(), p.getMonth() + 1, 1));

  return (
    <section className="bg-card border border-border rounded-card p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl text-text">Study Streak</h2>
          <p className="font-mono text-[10px] tracking-widest text-faint mt-0.5">
            {streakDays.length} ACTIVE DAY{streakDays.length !== 1 ? "S" : ""}{" "}
            THIS MONTH
          </p>
        </div>

        {/* Month navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-sm border border-border bg-lift flex items-center justify-center text-muted hover:text-text hover:bg-hover transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="font-mono text-[11px] tracking-widest text-muted w-32 text-center">
            {getMonthLabel(currentMonth).toUpperCase()}
          </span>

          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-sm border border-border bg-lift flex items-center justify-center text-muted hover:text-text hover:bg-hover transition-colors cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Weekday labels ── */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center font-mono text-[10px] tracking-widest text-faint py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, i) => {
          if (date === null) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }

          const inCurrentMonth =
            date.getMonth() === currentMonth.getMonth() &&
            date.getFullYear() === currentMonth.getFullYear();

          const studied = hasActivity(date);
          const today = isToday(date);
          const future = isFutureDate(date);

          return (
            <div
              key={date.toISOString()}
              title={
                studied
                  ? `${date.toDateString()} · studied`
                  : date.toDateString()
              }
              className={[
                "aspect-square rounded-sm border flex items-center justify-center transition-all select-none",
                // Out-of-month cells — fade out entirely
                !inCurrentMonth &&
                  "opacity-20 border-transparent bg-transparent",
                // Studied
                inCurrentMonth &&
                  studied &&
                  "bg-amber-glow border-amber-dim shadow-[0_0_16px_rgba(212,145,74,0.1)]",
                // Future — subtly dimmed, no hover
                inCurrentMonth &&
                  !studied &&
                  future &&
                  "bg-transparent border-border opacity-40",
                // Past, no activity
                inCurrentMonth &&
                  !studied &&
                  !future &&
                  "bg-lift border-border",
                // Today ring
                today && "ring-1 ring-green/50",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {studied ? (
                <span
                  className="text-base leading-none"
                  role="img"
                  aria-label="studied"
                >
                  🔥
                </span>
              ) : (
                <span
                  className={[
                    "font-ui text-xs",
                    today ? "text-green font-medium" : "text-muted",
                    future && "text-faint",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {date.getDate()}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Legend ── */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sm" role="img" aria-label="fire">
              🔥
            </span>
            <span className="font-ui text-xs text-muted">
              Session completed
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm border border-green/50 bg-transparent" />
            <span className="font-ui text-xs text-muted">Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm bg-lift border border-border opacity-40" />
            <span className="font-ui text-xs text-muted">Upcoming</span>
          </div>
        </div>
      </div>
    </section>
  );
}
