import { Moon, LogOut, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  onToggleFocusMode: () => void;
};

export default function Header({ onToggleFocusMode }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, signInWithGoogle, signOut } = useAuthStore();

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const firstName = fullName.split(" ")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;

  const isDashboard = location.pathname === "/dashboard";

  const handleUserClick = () => {
    if (isDashboard) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-10 h-14 bg-bg/85 border-b border-border backdrop-blur-xl">
      <div className="h-full mx-auto max-w-350 px-6 flex items-center justify-between">
        {/* Wordmark (click to go home) */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span className="font-display text-lg tracking-tight text-text">
            Focus Nest
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted bg-lift border border-border rounded px-1.5 py-0.5">
            v2
          </span>
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Authentication Controls */}
          {!loading &&
            (user ? (
              <div className="flex items-center gap-2">
                {/* Clickable user profile pill -> Dashboard */}
                <button
                  onClick={handleUserClick}
                  title={isDashboard ? "Back to Home" : "Open Dashboard"}
                  className={`flex items-center gap-2.5 px-2 py-1 rounded-btn border transition-colors cursor-pointer ${
                    isDashboard
                      ? "bg-amber-glow border-amber-dim"
                      : "bg-lift border-border hover:bg-hover"
                  }`}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="w-7 h-7 rounded-full border border-border-md"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-glow border border-amber-dim flex items-center justify-center font-mono text-[10px] text-amber">
                      {firstName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-ui text-sm text-muted max-w-32 truncate">
                    {firstName}
                  </span>
                </button>

                {/* Sign Out Button */}
                <button
                  onClick={signOut}
                  title="Sign out"
                  className="flex items-center justify-center w-8 h-8 rounded-btn bg-lift border border-border text-faint hover:text-text hover:bg-hover transition-colors cursor-pointer"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 font-ui text-sm font-medium text-muted bg-lift border border-border rounded-btn px-3 py-1.5 cursor-pointer transition-colors hover:text-text hover:bg-hover"
              >
                <LogIn size={13} />
                Sign In
              </button>
            ))}

          {/* Focus Mode Button (only on home page) */}
          {!isDashboard && (
            <button
              onClick={onToggleFocusMode}
              className="flex items-center gap-2 font-ui text-sm font-medium text-amber bg-amber-glow border border-amber-dim rounded-btn px-3.5 py-1.5 cursor-pointer transition-colors hover:bg-amber/22"
            >
              <Moon size={13} />
              Focus Mode
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
