export default function SessionNotes() {
  return (
    <section className="h-full rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">Session Notes</h2>

      <textarea
        placeholder="Write your thoughts, tasks, or study notes here..."
        className="w-full h-[calc(100%-3rem)] resize-none bg-transparent outline-none text-slate-200 placeholder:text-slate-500"
      />
    </section>
  );
}
