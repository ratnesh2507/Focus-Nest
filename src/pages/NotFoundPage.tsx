import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-6">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-125 h-125 rounded-full bg-amber/4 blur-[80px]" />
        <div className="absolute bottom-[15%] right-[10%] w-100 h-100 rounded-full bg-green/4 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center text-center gap-8">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-glow border border-amber-dim flex items-center justify-center text-amber">
          <Compass size={32} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] tracking-widest text-faint">
            ERROR 404
          </p>

          <h1 className="font-display text-5xl tracking-tight text-text">
            Page Not Found
          </h1>

          <p className="font-ui text-sm text-muted max-w-md leading-relaxed">
            The page you are looking for does not exist, has been moved, or was
            never built in this version of Focus Nest.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-ui text-sm font-medium text-text bg-lift border border-border rounded-btn px-4 py-2.5 hover:bg-hover transition-colors"
          >
            <ArrowLeft size={14} />
            Back Home
          </Link>

          <Link
            to="/dashboard"
            className="font-ui text-sm font-medium text-amber bg-amber-glow border border-amber-dim rounded-btn px-4 py-2.5 hover:bg-amber/22 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>

        <p className="font-mono text-[10px] text-faint">
          Focus Nest • Stay focused, stay consistent
        </p>
      </div>
    </div>
  );
}
