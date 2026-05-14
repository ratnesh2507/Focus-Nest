import { useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [duration, setDuration] = useState(initialSeconds);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  // Update timer when duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(duration);
    }
  }, [duration, isRunning]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  function start() {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setTimeLeft(duration);
  }

  function setMinutes(minutes: number) {
    const seconds = minutes * 60;
    setDuration(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  }

  return {
    duration,
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setMinutes,
  };
}
