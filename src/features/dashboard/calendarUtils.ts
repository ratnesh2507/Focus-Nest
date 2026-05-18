export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getNextMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getDaysInMonth(date: Date): number {
  return getMonthEnd(date).getDate();
}

export function getFirstDayOfWeek(date: Date): number {
  return getMonthStart(date).getDay(); // 0 = Sunday
}

export function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function isFutureDate(date: Date): boolean {
  const today = new Date();

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return date > todayOnly;
}

export function getMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Compare a YYYY-MM-DD string from Supabase with a Date object.
 */
export function isSameDate(dateString: string, date: Date): boolean {
  return formatDate(date) === dateString;
}

/**
 * Builds a 6x7 (42 cell) calendar grid.
 *
 * Empty leading/trailing cells are represented as null so the UI can
 * render blank placeholders.
 */
export function getCalendarDays(currentMonth: Date): (Date | null)[] {
  const days: (Date | null)[] = [];

  const monthStart = getMonthStart(currentMonth);
  const firstDayOffset = monthStart.getDay(); // Sunday = 0
  const daysInMonth = getDaysInMonth(currentMonth);

  // Leading empty cells
  for (let i = 0; i < firstDayOffset; i++) {
    days.push(null);
  }

  // Actual month dates
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
    );
  }

  // Fill remaining cells to make a consistent 6-week grid (42 cells)
  while (days.length < 42) {
    days.push(null);
  }

  return days;
}
