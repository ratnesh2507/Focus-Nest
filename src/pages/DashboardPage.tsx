import { ArrowLeft, Flame, Clock, Trophy, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useDashboardStore } from "../store/useDashboardStore";
import { useEffect } from "react";
import StreakCalendar from "../features/dashboard/StreakCalendar";

function formatMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  const { profile, stats, loading, error, loadDashboard } = useDashboardStore();

  useEffect(() => {
    if (user) {
      loadDashboard(user);
    }
  }, [user, loadDashboard]);

  const fullName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Guest User";

  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  if (!user) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center">
        <p className="text-muted">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-10 h-14 bg-bg/85 border-b border-border backdrop-blur-xl">
        <div className="h-full mx-auto max-w-350 px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Study
          </Link>

          <span className="font-display text-lg tracking-tight">Dashboard</span>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-350 px-6 py-6">
        {loading ? (
          <div className="bg-card border border-border rounded-card p-8 text-center text-muted">
            Loading dashboard...
          </div>
        ) : error ? (
          <div className="bg-card border border-red-500/30 rounded-card p-8 text-center text-red-300">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-[380px_1fr] gap-6">
            {/* Profile Panel */}
            <section className="bg-card border border-border rounded-card p-6">
              <div className="flex flex-col items-center text-center gap-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-full border border-border-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-amber-glow border border-amber-dim flex items-center justify-center text-3xl font-display text-amber">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h1 className="font-display text-2xl text-text">
                    {fullName}
                  </h1>
                  <p className="font-ui text-sm text-muted">
                    {profile?.email || user.email}
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-border">
                  <p className="font-mono text-[10px] tracking-widest text-faint">
                    MEMBER SINCE
                  </p>
                  <p className="font-ui text-sm text-muted mt-1">
                    {joinedDate}
                  </p>
                </div>
              </div>
            </section>

            {/* Right Side */}
            <div className="flex flex-col gap-6">
              {/* Monthly Streak Calendar */}
              <StreakCalendar />

              {/* Stats Grid */}
              <section className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Current Streak",
                    value: `${stats?.current_streak ?? 0} day${
                      (stats?.current_streak ?? 0) !== 1 ? "s" : ""
                    }`,
                    icon: <Flame size={16} />,
                  },
                  {
                    label: "Total Focus",
                    value: formatMinutes(stats?.total_focus_minutes ?? 0),
                    icon: <Clock size={16} />,
                  },
                  {
                    label: "Sessions Completed",
                    value: `${stats?.sessions_completed ?? 0}`,
                    icon: <Timer size={16} />,
                  },
                  {
                    label: "Longest Streak",
                    value: `${stats?.longest_streak ?? 0} day${
                      (stats?.longest_streak ?? 0) !== 1 ? "s" : ""
                    }`,
                    icon: <Trophy size={16} />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card border border-border rounded-card p-5"
                  >
                    <div className="flex items-center gap-2 text-amber mb-3">
                      {stat.icon}
                    </div>

                    <p className="font-display text-2xl text-text">
                      {stat.value}
                    </p>

                    <p className="font-ui text-sm text-muted mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
