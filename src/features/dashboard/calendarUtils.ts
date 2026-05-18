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
