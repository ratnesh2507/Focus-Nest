import { Moon } from "lucide-react";

type Props = {
  onToggleFocusMode: () => void;
};

export default function Header({ onToggleFocusMode }: Props) {
  return (
    <header
      className="sticky top-0 z-10 h-14"
      style={{
        background: "rgba(14,18,16,0.85)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div
        className="h-full mx-auto px-6 flex items-center justify-between"
        style={{ maxWidth: "1400px" }}
      >
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <span
            className="text-lg tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Focus Nest
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              background: "var(--bg-lift)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              letterSpacing: "0.08em",
            }}
          >
            v1
          </span>
        </div>

        {/* Focus Mode CTA */}
        <button
          onClick={onToggleFocusMode}
          className="flex items-center gap-2 text-sm font-medium transition-all"
          style={{
            fontFamily: "var(--font-ui)",
            background: "var(--amber-glow)",
            color: "var(--amber)",
            border: "1px solid var(--amber-dim)",
            borderRadius: "var(--radius-btn)",
            padding: "6px 14px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(212,145,74,0.22)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--amber-glow)";
          }}
        >
          <Moon size={13} />
          Focus Mode
        </button>
      </div>
    </header>
  );
}
