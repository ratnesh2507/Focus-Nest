import { useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  initialMinutes: number;
  onClose: () => void;
  onSave: (minutes: number) => void;
};

const PRESETS = [25, 50, 90];
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

    const timer = window.setTimeout(() => {
      setSelectedMinutes(initialMinutes);
    }, 0);

    return () => window.clearTimeout(timer);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Timer Settings
        </h2>

        {/* Presets */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setSelectedMinutes(preset)}
              className={`rounded-xl px-4 py-3 transition ${
                selectedMinutes === preset
                  ? "bg-indigo-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>

        {/* Scroll Picker */}
        <div className="relative mb-6">
          <div className="h-56 overflow-y-auto rounded-2xl bg-slate-800/60 p-2">
            {MINUTES.map((minute) => (
              <button
                key={minute}
                ref={minute === selectedMinutes ? selectedRef : null}
                onClick={() => setSelectedMinutes(minute)}
                className={`w-full rounded-lg py-3 text-lg transition ${
                  minute === selectedMinutes
                    ? "bg-indigo-600 font-semibold"
                    : "hover:bg-slate-700"
                }`}
              >
                {minute} minute{minute > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-slate-800 py-3 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave(selectedMinutes);
              onClose();
            }}
            className="flex-1 rounded-xl bg-indigo-600 py-3 font-medium hover:bg-indigo-500 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
