export default function MusicCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur p-4 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">Lofi Music</h2>

      <div className="aspect-video rounded-2xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jfKfPfyJRdk"
          title="Lofi Hip Hop Radio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
