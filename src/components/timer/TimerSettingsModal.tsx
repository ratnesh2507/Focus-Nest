import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  initialMinutes: number;
  onClose: () => void;
  onSave: (minutes: number) => void;
};

const PRESETS = [
  { label: "5 min", value: 5 },
  { label: "25 min", value: 25 },
  { label: "50 min", value: 50 },
  { label: "90 min", value: 90 },
];
const MINUTES = Array.from({ length: 180 }, (_, i) => i + 1);

export default function TimerSettingsModal({
  isOpen,
  initialMinutes,
  onClose,
  onSave,
}: Props) {
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => setSelectedMinutes(initialMinutes), 0);
    return () => window.clearTimeout(t);
  }, [isOpen, initialMinutes]);

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [isOpen, selectedMinutes]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div className="w-full max-w-95 flex flex-col bg-card border border-border-md rounded-card overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-display text-lg text-text">Set Duration</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-1 bg-lift border border-border rounded-sm text-muted cursor-pointer hover:text-text transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="px-6 pt-5">
          {/* Preset pills */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PRESETS.map((p) => {
              const active = selectedMinutes === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setSelectedMinutes(p.value)}
                  className={`font-mono text-xs py-2 rounded-sm border cursor-pointer transition-colors
                    ${
                      active
                        ? "bg-amber-glow border-amber-dim text-amber"
                        : "bg-lift border-border text-muted hover:bg-hover"
                    }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Large selected value display */}
          <div className="text-center mb-4">
            <span className="font-display text-5xl text-amber leading-none">
              {selectedMinutes}
            </span>
            <span className="font-mono text-sm text-muted ml-1.5">min</span>
          </div>
        </div>

        {/* Scroll picker */}
        <div className="relative mx-6 mb-5">
          {/* Top fade */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-card to-transparent z-10" />
          {/* Bottom fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-card to-transparent z-10" />
          {/* Selection highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-amber-glow border border-amber-dim rounded-sm z-10" />

          <div className="picker-scroll h-44 overflow-y-auto snap-y snap-mandatory bg-lift rounded-sm">
            <div className="h-17.5" />
            {MINUTES.map((m) => (
              <button
                key={m}
                ref={m === selectedMinutes ? selectedRef : null}
                onClick={() => setSelectedMinutes(m)}
                className={`w-full h-10 snap-center bg-transparent border-0 cursor-pointer transition-colors font-mono
                  ${
                    m === selectedMinutes
                      ? "text-amber text-sm font-medium"
                      : "text-faint text-xs font-light hover:text-muted"
                  }`}
              >
                {m} {m === 1 ? "minute" : "minutes"}
              </button>
            ))}
            <div className="h-17.5" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-6 py-5 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 font-ui text-sm font-medium py-2.5 rounded-btn border cursor-pointer transition-colors bg-lift border-border text-muted hover:bg-hover"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(selectedMinutes);
              onClose();
            }}
            className="flex-1 font-ui text-sm font-medium py-2.5 rounded-btn border cursor-pointer transition-colors bg-amber-glow border-amber-dim text-amber hover:bg-amber/22"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
