import { create } from "zustand";
import { incrementCompletedSession } from "../features/stats/statsApi";
import { useDashboardStore } from "./useDashboardStore";

type StatsStore = {
  recording: boolean;
  error: string | null;

  recordCompletedSession: (
    userId: string,
    durationMinutes: number,
  ) => Promise<void>;

  clearError: () => void;
};

export const useStatsStore = create<StatsStore>((set) => ({
  recording: false,
  error: null,

  recordCompletedSession: async (userId, durationMinutes) => {
    set({
      recording: true,
      error: null,
    });

    try {
      await incrementCompletedSession(userId, durationMinutes);

      // Refresh dashboard stats immediately if the dashboard store is in use.
      await useDashboardStore.getState().refreshStats(userId);
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to record completed session.",
      });
    } finally {
      set({
        recording: false,
      });
    }
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
