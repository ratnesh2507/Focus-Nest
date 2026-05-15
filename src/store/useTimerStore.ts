import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notifySessionComplete } from "../lib/notifySessionComplete";

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

        const intervalId = window.setInterval(() => {
          const { timeLeft, pause } = get();

          if (timeLeft <= 1) {
            set({ timeLeft: 0 });
            pause();
            notifySessionComplete();
            return;
          }

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

        // After hydration, if timer was running but no valid interval exists,
        // recreate the interval.
        if (isRunning && intervalId === null) {
          set({ isRunning: false });
          start();
        }
      },
    }),
    {
      name: "focus-nest-timer",

      // Persist only serializable state values
      partialize: (state) => ({
        duration: state.duration,
        timeLeft: state.timeLeft,
        isRunning: state.isRunning,
      }),
    },
  ),
);
