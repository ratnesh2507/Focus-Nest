import { create } from "zustand";

type TimerStore = {
  duration: number;
  timeLeft: number;
  isRunning: boolean;
  intervalId: number | null;

  start: () => void;
  pause: () => void;
  reset: () => void;
  setMinutes: (minutes: number) => void;
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  duration: 5 * 60,
  timeLeft: 5 * 60,
  isRunning: false,
  intervalId: null,

  start: () => {
    const { isRunning, timeLeft } = get();

    if (isRunning || timeLeft <= 0) return;

    const intervalId = window.setInterval(() => {
      const { timeLeft, pause } = get();

      if (timeLeft <= 1) {
        set({ timeLeft: 0 });
        pause();
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
}));
