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

export async function fetchStreakDays(
  userId: string,
  monthStart: string,
  monthEnd: string,
) {
  const { data, error } = await supabase
    .from("daily_activity")
    .select("activity_date")
    .eq("user_id", userId)
    .gte("activity_date", monthStart)
    .lte("activity_date", monthEnd);

  if (error) throw error;
  return data;
}
