import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import {
  fetchProfile,
  fetchStats,
  fetchStreakDays,
} from "../features/dashboard/dashboardApi";

/* Types                                                                      */
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type UserStats = {
  user_id: string;
  total_sessions: number;
  total_minutes: number;
  sessions_today: number;
  current_streak: number;
  longest_streak: number;
  longest_session_minutes: number;
  created_at: string;
  updated_at: string;
};

type DashboardStore = {
  profile: Profile | null;
  stats: UserStats | null;
  streakDays: string[]; // ["2026-05-01", "2026-05-03", ...]

  loading: boolean;
  error: string | null;

  loadDashboard: (user: User) => Promise<void>;
  loadStreakDays: (userId: string, month: Date) => Promise<void>;
  refreshStats: (userId: string) => Promise<void>;
  clear: () => void;
};

/* Helpers                                                                    */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/* Store                                                                      */
export const useDashboardStore = create<DashboardStore>((set) => ({
  profile: null,
  stats: null,
  streakDays: [],

  loading: false,
  error: null,

  loadDashboard: async (user) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const [profile, stats] = await Promise.all([
        fetchProfile(user.id),
        fetchStats(user.id),
      ]);

      set({
        profile,
        stats,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data.",
        loading: false,
      });
    }
  },

  loadStreakDays: async (userId, month) => {
    try {
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);

      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const rows = await fetchStreakDays(
        userId,
        formatDate(monthStart),
        formatDate(monthEnd),
      );

      set({
        streakDays: rows.map(
          (row: { activity_date: string }) => row.activity_date,
        ),
      });
    } catch (error) {
      console.error("Failed to load streak days:", error);
    }
  },

  refreshStats: async (userId) => {
    try {
      const stats = await fetchStats(userId);

      set({
        stats,
      });
    } catch (error) {
      console.error("Failed to refresh stats:", error);
    }
  },

  clear: () => {
    set({
      profile: null,
      stats: null,
      streakDays: [],
      loading: false,
      error: null,
    });
  },
}));
