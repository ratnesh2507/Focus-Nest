import { Moon, LogOut, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  onToggleFocusMode: () => void;
};

export default function Header({ onToggleFocusMode }: Props) {
  const { user, loading, signInWithGoogle, signOut } = useAuthStore();

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const firstName = fullName.split(" ")[0];
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-10 h-14 bg-bg/85 border-b border-border backdrop-blur-xl">
      <div className="h-full mx-auto max-w-350 px-6 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="font-display text-lg tracking-tight text-text">
            Focus Nest
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted bg-lift border border-border rounded px-1.5 py-0.5">
            v2
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Authentication Controls */}
          {!loading &&
            (user ? (
              <div className="flex items-center gap-2.5 px-2 py-1 rounded-btn bg-lift border border-border">
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

                <button
                  onClick={signOut}
                  title="Sign out"
                  className="flex items-center justify-center w-7 h-7 rounded-sm text-faint hover:text-text hover:bg-hover transition-colors cursor-pointer"
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

          {/* Focus Mode Button */}
          <button
            onClick={onToggleFocusMode}
            className="flex items-center gap-2 font-ui text-sm font-medium text-amber bg-amber-glow border border-amber-dim rounded-btn px-3.5 py-1.5 cursor-pointer transition-colors hover:bg-amber/22"
          >
            <Moon size={13} />
            Focus Mode
          </button>
        </div>
      </div>
    </header>
  );
}
