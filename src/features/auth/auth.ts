import { supabase } from "../../lib/supabase";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // Return the user to the dashboard after successful OAuth login
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  // After signing out, return to the home page
  window.location.href = "/";
}

export async function getCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
