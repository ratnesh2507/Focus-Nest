import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notifySessionComplete } from "../lib/notifySessionComplete";
import { useAuthStore } from "./useAuthStore";
import { useStatsStore } from "./useStatsStore";

type TimerStore = {
  duration: number;
  timeLeft: number;
  isRunning: boolean;
  intervalId: number | null;

  start: () => void;
  pause: () => void;
  reset: () => void;
  setMinutes: (minutes: number) => void;
  initialize: () => void;
};

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      duration: 5 * 60,
      timeLeft: 5 * 60,
      isRunning: false,
      intervalId: null,

      start: () => {
        const { isRunning, timeLeft, duration } = get();

        if (isRunning) return;

        // Restart if timer had already completed
        if (timeLeft <= 0) {
          set({ timeLeft: duration });
        }

        const intervalId = window.setInterval(async () => {
          const { timeLeft, pause, duration } = get();

          if (timeLeft <= 1) {
            // Stop timer and set to zero
            set({ timeLeft: 0 });
            pause();

            // Browser notification + toast
            notifySessionComplete();

            // If user is signed in, record session in Supabase
            const user = useAuthStore.getState().user;

            if (user) {
              const durationMinutes = Math.floor(duration / 60);

              try {
                await useStatsStore
                  .getState()
                  .recordCompletedSession(user.id, durationMinutes);
              } catch (error) {
                console.error("Failed to record completed session:", error);
              }
            }

            return;
          }

          // Countdown
          set({ timeLeft: timeLeft - 1 });
        }, 1000);

        set({
          isRunning: true,
          intervalId,
        });
      },

      pause: () => {
        const { intervalId } = get();

        if (intervalId !== null) {
          clearInterval(intervalId);
        }

        set({
          isRunning: false,
          intervalId: null,
        });
      },

      reset: () => {
        const { duration, pause } = get();

        pause();

        set({
          timeLeft: duration,
        });
      },

      setMinutes: (minutes: number) => {
        const seconds = minutes * 60;
        const { pause } = get();

        pause();

        set({
          duration: seconds,
          timeLeft: seconds,
        });
      },

      initialize: () => {
        const { isRunning, intervalId, start } = get();

        // After hydration, if timer was running but the interval
        // itself was not persisted, recreate it.
        if (isRunning && intervalId === null) {
          set({ isRunning: false });
          start();
        }
      },
    }),
    {
      name: "focus-nest-timer",

      // Persist only serializable state
      partialize: (state) => ({
        duration: state.duration,
        timeLeft: state.timeLeft,
        isRunning: state.isRunning,
      }),
    },
  ),
);
