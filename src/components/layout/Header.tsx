export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Study With Me</h1>

        <p className="text-sm text-slate-400 hidden sm:block">
          Focus. Learn. Repeat.
        </p>
      </div>
    </header>
  );
}
