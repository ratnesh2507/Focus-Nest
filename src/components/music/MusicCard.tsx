import { Music } from "lucide-react";

export default function MusicCard() {
  return (
    <section className="bg-card border border-border rounded-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <Music size={13} className="text-faint" />
        <span className="font-ui text-sm font-medium text-text">
          Lofi Radio
        </span>

        {/* Live badge */}
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-danger bg-danger-glow border border-danger-dim rounded px-1.5 py-0.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-danger" />
          LIVE
        </span>
      </div>

      {/* YouTube embed */}
      <div className="aspect-video">
        <iframe
          className="w-full h-full block"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0"
          title="Lofi Hip Hop Radio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border">
        <p className="font-mono text-[10px] tracking-wide text-faint">
          lofi hip hop radio — beats to study/relax to
        </p>
      </div>
    </section>
  );
}
