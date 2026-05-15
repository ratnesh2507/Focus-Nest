type Props = {
  onToggleFocusMode: () => void;
};

export default function Header({ onToggleFocusMode }: Props) {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Focus Nest</h1>

        <button
          onClick={onToggleFocusMode}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition"
        >
          Enter Focus Mode
        </button>
      </div>
    </header>
  );
}
