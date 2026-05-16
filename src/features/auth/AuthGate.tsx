import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: Props) {
  const { user, loading, signInWithGoogle } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-8 h-8 rounded-full border-2 border-border border-t-amber animate-spin" />
          <span className="font-mono text-[11px] tracking-widest text-faint">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center px-6">
        {/* Ambient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-125 h-125 rounded-full bg-amber/4 blur-[80px]" />
          <div className="absolute bottom-[15%] right-[10%] w-100 h-100 rounded-full bg-green/4  blur-[80px]" />
        </div>

        <div className="relative w-full max-w-sm flex flex-col items-center gap-8">
          {/* Wordmark */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl text-text tracking-tight">
              Focus Nest
            </span>
            <span className="font-mono text-[11px] tracking-widest text-muted">
              YOUR STUDY COMPANION
            </span>
          </div>

          {/* Card */}
          <div className="w-full bg-card border border-border rounded-card p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
              <p className="font-ui text-sm font-medium text-text">
                Sign in to continue
              </p>
              <p className="font-mono text-[11px] text-faint">
                Your notes and sessions will sync across devices
              </p>
            </div>

            {/* Google button */}
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-3 w-full font-ui text-sm font-medium text-text bg-lift border border-border-md rounded-btn py-2.5 cursor-pointer transition-colors hover:bg-hover"
            >
              {/* Google logo SVG — cannot be an icon library import */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] text-faint">
                FREE TO USE
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Feature hints */}
            <ul className="flex flex-col gap-2.5">
              {[
                "Pomodoro timer with progress ring",
                "Session notes, auto-saved",
                "Focus Mode — zero distractions",
                "Lofi radio built in",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-amber shrink-0" />
                  <span className="font-ui text-xs text-muted">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-mono text-[10px] text-faint text-center">
            No credit card required &mdash; free forever
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
