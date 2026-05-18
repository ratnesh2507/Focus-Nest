import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useDashboardStore } from "../../store/useDashboardStore";
import {
  getCalendarDays,
  getMonthLabel,
  isSameDate,
  isToday,
} from "./calendarUtils";

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

  const handlePreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const hasActivity = (date: Date) =>
    streakDays.some((day) => isSameDate(day, date));

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="bg-card border border-border rounded-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl text-text">Study Streak</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePreviousMonth}
            className="w-8 h-8 rounded-lg border border-border bg-lift flex items-center justify-center text-muted hover:text-text hover:bg-hover transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="font-mono text-[10px] tracking-widest text-faint min-w-27.5 text-center">
            {getMonthLabel(currentMonth).toUpperCase()}
          </span>

          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-lg border border-border bg-lift flex items-center justify-center text-muted hover:text-text hover:bg-hover transition-colors cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdayLabels.map((day) => (
          <div
            key={day}
            className="text-center font-mono text-[10px] tracking-widest text-faint py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => {
          // Empty leading/trailing cells
          if (date === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const isCurrentMonth =
            date.getMonth() === currentMonth.getMonth() &&
            date.getFullYear() === currentMonth.getFullYear();

          const studied = hasActivity(date);
          const todayCell = isToday(date);

          return (
            <div
              key={`${date.toISOString()}-${index}`}
              title={
                studied
                  ? `${date.toDateString()} • Studied`
                  : date.toDateString()
              }
              className={`
                aspect-square rounded-xl border flex items-center justify-center
                transition-all select-none
                ${
                  !isCurrentMonth
                    ? "opacity-25 border-transparent"
                    : studied
                      ? "bg-amber-glow border-amber-dim shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                      : "bg-lift border-border"
                }
                ${todayCell ? "ring-1 ring-green/50" : ""}
              `}
            >
              {studied ? (
                <span className="text-lg leading-none">🔥</span>
              ) : (
                <span
                  className={`
                    font-ui text-sm
                    ${isCurrentMonth ? "text-muted" : "text-faint"}
                  `}
                >
                  {date.getDate()}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🔥</span>
          <span className="font-ui text-xs text-muted">
            Study session completed
          </span>
        </div>

        <span className="font-mono text-[10px] tracking-widest text-faint">
          {streakDays.length} ACTIVE DAY{streakDays.length !== 1 ? "S" : ""}
        </span>
      </div>
    </section>
  );
}
