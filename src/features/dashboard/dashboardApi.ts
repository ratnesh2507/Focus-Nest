import { supabase } from "../../lib/supabase";

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchStats(userId: string) {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Returns all dates in the selected month where the user
 * completed at least one study session.
 *
 * Example return:
 * ["2026-05-01", "2026-05-03", "2026-05-18"]
 */
export async function fetchMonthlyStudyDates(
  userId: string,
  monthStart: string,
  nextMonthStart: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("study_sessions")
    .select("completed_at")
    .eq("user_id", userId)
    .gte("completed_at", monthStart)
    .lt("completed_at", nextMonthStart)
    .order("completed_at", { ascending: true });

  if (error) throw error;

  // Convert timestamps to YYYY-MM-DD and remove duplicates
  const uniqueDates = new Set<string>();

  for (const row of data ?? []) {
    const date = row.completed_at.slice(0, 10);
    uniqueDates.add(date);
  }

  return Array.from(uniqueDates);
}
