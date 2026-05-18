import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import {
  fetchProfile,
  fetchStats,
  fetchMonthlyStudyDates,
} from "../features/dashboard/dashboardApi";
import {
  formatDate,
  getMonthStart,
  getNextMonthStart,
} from "../features/dashboard/calendarUtils";

/* Types */
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type UserStats = {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  sessions_completed: number;
  sessions_completed_today: number;
  total_focus_minutes: number;
  longest_session_minutes: number;
  account_age_days: number;
  last_session_date: string | null;
  created_at: string;
  updated_at: string;
};

type DashboardStore = {
  profile: Profile | null;
  stats: UserStats | null;
  streakDays: string[]; // ["2026-05-01", "2026-05-03"]

  loading: boolean;
  error: string | null;

  loadDashboard: (user: User) => Promise<void>;
  loadStreakDays: (userId: string, month: Date) => Promise<void>;
  refreshStats: (userId: string) => Promise<void>;
  clear: () => void;
};

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
      const monthStart = getMonthStart(month);
      const nextMonthStart = getNextMonthStart(month);

      const dates = await fetchMonthlyStudyDates(
        userId,
        formatDate(monthStart),
        formatDate(nextMonthStart),
      );

      set({
        streakDays: dates,
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
