import { supabase } from "../../lib/supabase";

export async function incrementCompletedSession(
  userId: string,
  durationMinutes: number,
) {
  const { error } = await supabase.rpc("record_study_session", {
    p_user_id: userId,
    p_duration_minutes: durationMinutes,
  });

  if (error) {
    console.error("record_study_session RPC error:", error);
    throw error;
  }
}
