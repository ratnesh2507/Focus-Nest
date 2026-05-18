import { Navigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthGate() {
  const { user, loading, signInWithGoogle } = useAuthStore();

  // Show loading spinner while restoring session
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

  // If already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    "Sync your study sessions across devices",
    "Track daily streaks and longest streak",
    "View focus analytics and dashboard",
    "Access your notes anywhere",
  ];

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-125 h-125 rounded-full bg-amber/4 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-110 h-110 rounded-full bg-green/4 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center gap-8">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col items-center gap-2">
          <span className="font-display text-4xl tracking-tight text-text">
            Focus Nest
          </span>
          <span className="font-mono text-[11px] tracking-widest text-muted">
            YOUR STUDY COMPANION
          </span>
        </Link>

        {/* Sign-in card */}
        <div className="w-full bg-card border border-border rounded-card p-8 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          {/* Heading */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-display text-2xl text-text">
              Sign in to continue
            </h1>
            <p className="font-ui text-sm text-muted leading-relaxed">
              Unlock cloud sync, streak tracking, and your personal study
              dashboard.
            </p>
          </div>

          {/* Google sign-in button */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-btn border border-border-md bg-lift hover:bg-hover transition-colors cursor-pointer font-ui text-sm font-medium text-text"
          >
            {/* Google logo */}
            <svg
              width="18"
              height="18"
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
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] tracking-widest text-faint">
              FREE FOREVER
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 shrink-0" />
                <span className="font-ui text-xs text-muted">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Privacy notice */}
          <p className="font-ui text-xs text-faint text-center leading-relaxed">
            By signing in, you agree to our{" "}
            <Link
              to="/privacy"
              className="text-muted hover:text-text transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Footer note */}
        <p className="font-mono text-[10px] tracking-wide text-faint text-center">
          NO CREDIT CARD REQUIRED • START STUDYING IN SECONDS
        </p>
      </div>
    </div>
  );
}
