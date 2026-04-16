// ... (Keep your imports and the bubble background canvas logic at the very top)

export default function CvrcleFinal() {
  const [activeFragment, setActiveFragment] = useState(null);

  const taglines = [
    "Beyond borders. Between forms.",
    "Iwwer d’Grenzen eraus. Tëscht de Formen.",
    "Au-delà des frontières. Entre les formes.",
    "Përtej kufijve. Ndërmjet formave.",
    "Արտաքս սահմաններից։ Ձևերի միջև։",
    "超越边界。形之间。",
    "Поза межами. Між формами."
  ];

  const members = [
    { name: "Anna Rexha", role: "Visual Artist", bio: "Exploring the intersection of memory and digital texture." },
    { name: "Shulin", role: "Creative Director", bio: "Focusing on the architectural fluidity of modern forms." },
    { name: "Ani", role: "Multimedia Artist", bio: "Bridging traditional heritage with contemporary movement." }
  ];

  const fragments = [
    { id: "01", title: "Sonogravure", description: "A study in sound-generated visual imprints.", artist: "Anna Rexha", type: "Digital" },
    { id: "02", title: "Art Under The Rainbow", description: "Workshop archive — Avril 2025.", artist: "Collective", type: "Workshop" }
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

      {/* ARCHIVES & TRACES - SMALLER GALLERY */}
      <section className="py-24 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-16">Archives & Traces</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
          {/* Sonogravure */}
          <div className="group flex flex-col items-center cursor-pointer" onClick={() => setActiveFragment(fragments[0])}>
            <div className="w-full max-w-[200px] aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src="/sonogravure.png" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000" alt="Sonogravure" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-serif italic text-lg">Sonogravure</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Anna Rexha</p>
            </div>
          </div>

          {/* Workshop */}
          <div className="group flex flex-col items-center cursor-pointer" onClick={() => setActiveFragment(fragments[1])}>
            <div className="w-full max-w-[200px] aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src="/workshop.png" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000" alt="Workshop" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-serif italic text-lg">Art Under The Rainbow</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Workshop — Avril 2025</p>
            </div>
          </div>

          {/* Trace n°01 */}
          <div className="flex flex-col items-center justify-center pt-10 md:pt-0">
             <img src="/butterfly.png" className="w-10 h-10 object-contain opacity-20 animate-pulse" alt="Trace" />
             <p className="mt-4 font-serif italic opacity-30 text-sm">Fragment n°01</p>
          </div>
        </div>
      </section>

      {/* CHRONICLE & JOURNAL */}
      <section className="py-32 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-20">Chronicle & Journal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
          
          <div className="space-y-16">
            <div className="border-l border-white/10 pl-8 hover:border-[#D6D4A1] transition-colors">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Next Phase</span>
              <h3 className="text-3xl font-serif mt-4 mb-2">New Horizon</h3>
              <p className="opacity-60 font-serif italic">Multidisciplinary research on digital displacement.</p>
            </div>

            <div className="border-l border-white/10 pl-8 hover:border-white/40 transition-colors">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Inaugural</span>
              <h3 className="text-3xl font-serif mt-4 mb-2">Galerie 0.15</h3>
              <p className="opacity-60 font-serif italic">Early fragments and the foundation of the collective.</p>
            </div>
          </div>

          <div className="bg-white/[0.02] p-10 border border-white/5">
            <h4 className="text-[10px] uppercase tracking-widest mb-8 opacity-40 italic">Journal Mentions</h4>
            <div className="space-y-8">
              <p className="text-xl font-serif italic opacity-70 hover:opacity-100 transition-opacity">&quot;An ephemeral approach to permanence.&quot;</p>
              <p className="text-xl font-serif italic opacity-70 hover:opacity-100 transition-opacity">&quot;Redefining the circle as a space of inclusion.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIVE SECTION */}
      <section className="py-32 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-20 text-center">The Collective</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {members.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto mb-8 grayscale opacity-20 group-hover:opacity-100 transition-all duration-700" />
              <h3 className="text-xl font-serif italic mb-2">{member.name}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">{member.role}</p>
              <p className="text-sm opacity-60 leading-relaxed italic">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POPUP FOR FRAGMENTS */}
      {activeFragment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveFragment(null)}>
          <div className="max-w-2xl w-full bg-[#080808] border border-white/10 p-12 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Fragment {activeFragment.id}</p>
            <h3 className="text-4xl font-serif italic mb-6">{activeFragment.title}</h3>
            <p className="text-lg opacity-70 font-serif italic mb-8">{activeFragment.description}</p>
            <button onClick={() => setActiveFragment(null)} className="text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity pt-4 border-t border-white/10 w-full">Close</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-30 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 bg-black">
        <span>CVRCLE — 2026</span>
        <div className="flex gap-10">
          <a href="https://www.instagram.com/cvrcle.collective/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition relative z-[150]">Instagram</a>
          <a href="mailto:hello@cvrcle.com" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </main>
  );
}