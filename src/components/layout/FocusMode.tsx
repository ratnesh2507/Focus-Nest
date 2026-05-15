import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  timer: React.ReactNode;
  music: React.ReactNode;
};

export default function FocusMode({ isOpen, onClose, timer, music }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="focus-overlay fixed inset-0 z-50 overflow-hidden bg-bg">
      {/* Ambient orbs — purely decorative, cannot be done without some values */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-125 h-125 rounded-full bg-amber/4 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[8%]  w-100 h-100 rounded-full bg-green/4  blur-[80px]" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-base text-text">Focus Nest</span>
          <span className="font-mono text-[10px] tracking-widest text-amber bg-amber-glow border border-amber-dim rounded px-1.5 py-0.5">
            FOCUS MODE
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 font-ui text-sm text-muted bg-lift border border-border-md rounded-btn px-3 py-1.5 cursor-pointer transition-colors hover:text-text"
        >
          <X size={13} />
          Exit
          <span className="font-mono text-[10px] text-faint">esc</span>
        </button>
      </div>

      {/* Content */}
      <div className="h-full flex flex-col md:flex-row items-center justify-center gap-6 px-6 pt-18 pb-6">
        <div className="w-full max-w-90">{timer}</div>
        <div className="w-full max-w-105">{music}</div>
      </div>
    </div>
  );
}
