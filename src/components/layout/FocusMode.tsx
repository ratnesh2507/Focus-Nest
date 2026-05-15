import { useEffect } from "react";
import { X, Moon } from "lucide-react";

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
      if (e.key === "Escape") {
        onClose();
      }
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950 text-white">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-950 to-black" />

        {/* Soft glowing orbs */}
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-24 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        {/* Light vignette */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-100 px-6 py-5 pointer-events-none">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Focus Indicator */}
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2">
            <Moon size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-slate-200">
              Focus Mode
            </span>
          </div>

          {/* Exit Button */}
          <button
            type="button"
            onClick={() => onClose()}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 transition cursor-pointer"
            title="Exit Focus Mode (Esc)"
          >
            <X size={16} />
            Exit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex md:flex-row flex-col gap-4 items-center justify-around px-6 pt-28 pb-8">
        {/* Timer Section */}
        <div className="md:w-2xl w-xl max-w-3xl">
          <div className="rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl shadow-2xl">
            {timer}
          </div>
        </div>

        {/* Music Section */}
        <div className="w-xl max-w-5xl">
          <div className="rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl shadow-2xl p-4">
            {music}
          </div>
        </div>
      </div>
    </div>
  );
}
