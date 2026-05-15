import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function SessionNotes() {
  const [notes, setNotes] = useLocalStorage("study-notes", "");

  const wordCount = notes.trim() === "" ? 0 : notes.trim().split(/\s+/).length;

  return (
    <section
      className="h-full flex flex-col"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text)", fontFamily: "var(--font-ui)" }}
          >
            Session Notes
          </span>

          {/* Live dot */}
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--green)" }}
            />
            <span
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
              }}
            >
              auto-saved
            </span>
          </span>
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-faint)",
          }}
        >
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
      </div>

      {/* Ruled paper lines as bg decoration */}
      <div className="flex-1 relative">
        {/* Faint rule lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent calc(1.75rem - 1px),
              rgba(255,255,255,0.03) calc(1.75rem - 1px),
              rgba(255,255,255,0.03) 1.75rem
            )`,
            backgroundPositionY: "4.5rem",
          }}
        />

        {/* Left gutter stripe */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "3.5rem",
            width: "1px",
            background: "rgba(212,145,74,0.06)",
          }}
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start writing your thoughts, tasks, or ideas..."
          className="absolute inset-0 w-full h-full resize-none outline-none"
          style={{
            background: "transparent",
            color: "var(--text)",
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            lineHeight: "1.75rem",
            padding: "1.5rem 1.5rem 1.5rem 4.5rem",
            caretColor: "var(--amber)",
          }}
          spellCheck
        />

        {/* Placeholder style override via inline placeholder styling */}
        <style>{`
          textarea::placeholder {
            color: var(--text-faint);
            font-style: italic;
          }
        `}</style>
      </div>
    </section>
  );
}
