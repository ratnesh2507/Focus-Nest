export default function TimerCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl cursor-pointer hover:border-indigo-400/30 transition">
      <h2 className="text-lg font-semibold mb-4">Pomodoro Timer</h2>

      <div className="text-5xl font-bold tracking-tight text-center py-6">
        25:00
      </div>

      <p className="text-sm text-slate-400 text-center">
        Click to configure timer
      </p>
    </section>
  );
}
