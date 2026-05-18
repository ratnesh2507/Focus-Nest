import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useTimerStore } from "./store/useTimerStore";
import { useAuthStore } from "./store/useAuthStore";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthGate from "./features/auth/AuthGate";

export default function App() {
  const initializeTimer = useTimerStore((state) => state.initialize);
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeTimer();
    initializeAuth();
  }, [initializeTimer, initializeAuth]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<AuthGate />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
