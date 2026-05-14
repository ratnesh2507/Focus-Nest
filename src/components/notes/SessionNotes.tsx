import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function SessionNotes() {
  const [notes, setNotes] = useLocalStorage("study-notes", "");

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Session Notes</h2>

        <span className="text-xs text-emerald-400">✔ Saved</span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your thoughts, tasks, or study notes here..."
        className="w-full h-[calc(100%-3rem)] resize-none bg-transparent outline-none text-slate-200 placeholder:text-slate-500"
      />
    </section>
  );
}
