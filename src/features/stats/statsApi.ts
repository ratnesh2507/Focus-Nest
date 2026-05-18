import { supabase } from "../../lib/supabase";

export async function incrementCompletedSession(
  userId: string,
  durationMinutes: number,
) {
  await supabase.rpc("record_study_session", {
    p_user_id: userId,
    p_duration_minutes: durationMinutes,
  });
}
