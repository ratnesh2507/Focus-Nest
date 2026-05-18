import { ArrowLeft, Flame, Clock, Trophy, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Guest User";

  const avatarUrl = user?.user_metadata?.avatar_url;

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

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
                <h1 className="font-display text-2xl text-text">{fullName}</h1>
                <p className="font-ui text-sm text-muted">{user?.email}</p>
              </div>

              <div className="w-full pt-4 border-t border-border">
                <p className="font-mono text-[10px] tracking-widest text-faint">
                  MEMBER SINCE
                </p>
                <p className="font-ui text-sm text-muted mt-1">{joinedDate}</p>
              </div>
            </div>
          </section>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            {/* Calendar Placeholder */}
            <section className="bg-card border border-border rounded-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl">Study Streak</h2>
                <span className="font-mono text-[10px] tracking-widest text-faint">
                  MAY 2026
                </span>
              </div>

              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-xl text-muted">
                Monthly streak calendar coming next
              </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Current Streak",
                  value: "1 day",
                  icon: <Flame size={16} />,
                },
                {
                  label: "Total Focus",
                  value: "1 min",
                  icon: <Clock size={16} />,
                },
                {
                  label: "Sessions Completed",
                  value: "1",
                  icon: <Timer size={16} />,
                },
                {
                  label: "Longest Streak",
                  value: "1 day",
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
      </main>
    </div>
  );
}
