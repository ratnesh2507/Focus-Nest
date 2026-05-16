import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  signInWithGoogle as authSignInWithGoogle,
  signOut as authSignOut,
  getCurrentSession,
} from "../features/auth/auth";

type AuthStore = {
  user: User | null;
  session: Session | null;
  loading: boolean;

  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,

  initialize: async () => {
    const session = await getCurrentSession();

    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });
  },

  signInWithGoogle: async () => {
    await authSignInWithGoogle();
  },

  signOut: async () => {
    await authSignOut();
  },
}));
