import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function SessionNotes() {
  const [notes, setNotes] = useLocalStorage("study-notes", "");

  const wordCount = notes.trim() === "" ? 0 : notes.trim().split(/\s+/).length;

  return (
    <section className="h-full flex flex-col bg-card border border-border rounded-card overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-ui text-sm font-medium text-text">
            Session Notes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green" />
            <span className="font-mono text-[11px] text-muted">auto-saved</span>
          </span>
        </div>
        <span className="font-mono text-[11px] text-faint">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
      </div>

      {/* Writing area */}
      <div className="relative flex-1 min-h-0 notes-ruled">
        {/* Left gutter stripe */}
        <div className="absolute top-0 bottom-0 left-14 w-px bg-amber/6 pointer-events-none" />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start writing your thoughts, tasks, or ideas..."
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none text-text font-ui text-sm leading-7 pl-18 pr-6 pt-6 pb-6 caret-amber"
          spellCheck
        />
      </div>
    </section>
  );
}
