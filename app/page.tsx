// ... (Keep the imports and the floating bubbles canvas at the top of the file)

export default function CvrcleFinal() {
  const taglines = [
    "Beyond borders. Between forms.",
    "Iwwer d’Grenzen eraus. Tëscht de Formen.",
    "Au-delà des frontières. Entre les formes.",
    "Përtej kufijve. Ndërmjet formave.",
    "Արտաքս սահմաններից։ Ձևերի միջև։",
    "超越边界。形之间。",
    "Поза межами. Між формами."
  ];

  return (
    <main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#D6D4A1]">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#D6D4A1]/10 flex items-center justify-center mb-12">
          <h1 className="text-5xl md:text-7xl tracking-[0.4em] font-serif font-light">CVRCLE</h1>
        </div>
        
        <div className="space-y-3 opacity-50 italic font-serif">
          {taglines.map((line, i) => (
            <p key={i} className="text-[11px] md:text-sm tracking-widest">{line}</p>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-32 px-6 md:px-24 border-t border-white/5 text-center">
        <p className="max-w-4xl mx-auto text-xl md:text-3xl font-serif italic leading-relaxed opacity-80">
          &quot;We are the black sheep not by exclusion, but by choice. We transform the shadows of our heritage into a new light.&quot;
        </p>
      </section>

      {/* ARCHIVES - REFINED SMALLER GRID */}
      <section className="py-24 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-16">Archives & Traces</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
          <div className="group flex flex-col items-center">
            <div className="w-full max-w-[200px] aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src="/sonogravure.png" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000" alt="Sonogravure" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-serif italic text-lg">Sonogravure</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Anna Rexha</p>
            </div>
          </div>

          <div className="group flex flex-col items-center">
            <div className="w-full max-w-[200px] aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src="/workshop.png" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000" alt="Workshop" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-serif italic text-lg">Art Under The Rainbow</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Workshop — Avril 2025</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center pt-10 md:pt-0">
             <img src="/butterfly.png" className="w-10 h-10 object-contain opacity-20 animate-pulse" alt="Trace" />
             <p className="mt-4 font-serif italic opacity-30 text-sm">Fragment n°01</p>
          </div>
        </div>
      </section>

      {/* CHRONICLE */}
      <section className="py-32 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-20">Chronicle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="border-l border-white/10 pl-8 hover:border-[#D6D4A1] transition-colors">
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Upcoming Phase</span>
            <h3 className="text-3xl font-serif mt-4 mb-2">New Horizon</h3>
            <p className="opacity-60 font-serif italic">Multidisciplinary research on digital displacement.</p>
          </div>

          <div className="border-l border-white/10 pl-8 hover:border-white/40 transition-colors">
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Inaugural Archive</span>
            <h3 className="text-3xl font-serif mt-4 mb-2">Galerie 0.15</h3>
            <p className="opacity-60 font-serif italic">Early fragments and the foundation of the collective.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-30 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
        <span>CVRCLE — 2026</span>
        <div className="flex gap-10">
          <a href="https://www.instagram.com/cvrcle.collective/" target="_blank" className="hover:text-white transition cursor-pointer z-50">Instagram</a>
          <a href="mailto:hello@cvrcle.com" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </main>
  );
}