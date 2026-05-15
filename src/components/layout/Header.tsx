import { Moon } from "lucide-react";

type Props = {
  onToggleFocusMode: () => void;
};

export default function Header({ onToggleFocusMode }: Props) {
  return (
    <header className="sticky top-0 z-10 h-14 bg-bg/85 border-b border-border backdrop-blur-xl">
      <div className="h-full mx-auto max-w-350 px-6 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="font-display text-lg tracking-tight text-text">
            Focus Nest
          </span>
          <span className="font-mono text-[10px] tracking-widest text-muted bg-lift border border-border rounded px-1.5 py-0.5">
            v1
          </span>
        </div>

        {/* Focus Mode CTA */}
        <button
          onClick={onToggleFocusMode}
          className="flex items-center gap-2 font-ui text-sm font-medium text-amber bg-amber-glow border border-amber-dim rounded-btn px-3.5 py-1.5 cursor-pointer transition-colors hover:bg-amber/22"
        >
          <Moon size={13} />
          Focus Mode
        </button>
      </div>
    </header>
  );
}
