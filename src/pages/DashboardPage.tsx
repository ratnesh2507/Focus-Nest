import { ArrowLeft, Flame, Clock, Trophy, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useDashboardStore, type UserStats } from "../store/useDashboardStore";
import { useEffect } from "react";
import StreakCalendar from "../features/dashboard/StreakCalendar";

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}m`;
}

function getStats(stats: UserStats | null) {
  return [
    {
      label: "Current Streak",
      value: `${stats?.current_streak ?? 0}`,
      unit: `day${(stats?.current_streak ?? 0) !== 1 ? "s" : ""}`,
      icon: Flame,
    },
    {
      label: "Total Focus",
      value: formatMinutes(stats?.total_focus_minutes ?? 0),
      unit: "logged",
      icon: Clock,
    },
    {
      label: "Sessions Done",
      value: `${stats?.sessions_completed ?? 0}`,
      unit: "sessions",
      icon: Timer,
    },
    {
      label: "Longest Streak",
      value: `${stats?.longest_streak ?? 0}`,
      unit: `day${(stats?.longest_streak ?? 0) !== 1 ? "s" : ""}`,
      icon: Trophy,
    },
  ];
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { profile, stats, loading, error, loadDashboard } = useDashboardStore();

  useEffect(() => {
    if (user) loadDashboard(user);
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
        <p className="font-ui text-sm text-muted">
          Please sign in to view your dashboard.
        </p>
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
            className="flex items-center gap-2 font-ui text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Study
          </Link>
          <span className="font-display text-lg tracking-tight text-text">
            Dashboard
          </span>
          {/* Spacer keeps title optically centred */}
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-350 px-6 py-6">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-32">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-amber animate-spin" />
            <span className="font-mono text-[11px] tracking-widest text-faint">
              LOADING
            </span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-card border border-danger-dim rounded-card p-8 text-center">
            <p className="font-ui text-sm text-danger">{error}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="grid grid-cols-[300px_1fr] gap-6 items-start">
            {/* Left col: profile + stats */}
            <div className="flex flex-col gap-4">
              {/* Profile card */}
              <section className="bg-card border border-border rounded-card p-6 flex flex-col items-center text-center gap-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full border border-border-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-amber-glow border border-amber-dim flex items-center justify-center font-display text-3xl text-amber">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col gap-0.5">
                  <h1 className="font-display text-xl text-text">{fullName}</h1>
                  <p className="font-ui text-xs text-muted">
                    {profile?.email || user.email}
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-border flex flex-col gap-0.5">
                  <p className="font-mono text-[10px] tracking-widest text-faint">
                    MEMBER SINCE
                  </p>
                  <p className="font-ui text-sm text-muted">{joinedDate}</p>
                </div>
              </section>

              {/* Stats — 2×2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {getStats(stats).map(({ label, value, unit, icon: Icon }) => (
                  <div
                    key={label}
                    className="bg-card border border-border rounded-card p-4 flex flex-col gap-3"
                  >
                    <div className="w-7 h-7 rounded-sm bg-amber-glow border border-amber-dim flex items-center justify-center text-amber">
                      <Icon size={13} />
                    </div>
                    <div>
                      <p className="font-display text-2xl text-text leading-none">
                        {value}
                      </p>
                      <p className="font-mono text-[10px] tracking-widest text-faint mt-1">
                        {unit.toUpperCase()}
                      </p>
                    </div>
                    <p className="font-ui text-xs text-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col: streak calendar */}
            <StreakCalendar />
          </div>
        )}
      </main>
    </div>
  );
}
