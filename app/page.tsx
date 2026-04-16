"use client";

import { useEffect, useRef, useState } from "react";

export default function CvrcleFinal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFragment, setActiveFragment] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const circles: { x: number; y: number; r: number; a: number }[] = [];

    const onMove = (e: MouseEvent) => {
      circles.push({ x: e.clientX, y: e.clientY, r: 8 + Math.random() * 15, a: 0.3 });
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        c.a -= 0.007;
        c.r += 0.3;
        if (c.a <= 0) { circles.splice(i, 1); i--; continue; }
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(214, 212, 161, ${c.a})`; 
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const members = [
    {
      name: "Anna REXHA",
      title: "Présidente & Directrice artistique",
      role: "Artiste pluridisciplinaire",
      bio: "Artiste vidéaste et artiviste originaire du Kosovo/Luxembourg dont la pratique artistique s’articule autour de l’image animée, du son et de l’identité plurielle.",
      insta: "https://www.instagram.com/arts_anna.rexha/",
      img: "/anna.jpg" 
    },
    {
      name: "Shulin XIA",
      title: "Vice présidente & Cheffe de projet & Chargée de communication",
      role: "Voggeuse et poétesse",
      bio: "Créatrice chinoise, diplômée en gestion de projets culturels, chargée de coordination, d’administration et de production au sein du collectif.",
      insta: "https://www.instagram.com/real_xslll/",
      img: "/shulin.jpg" 
    },
    {
      name: "Ani NIKOGOSYAN",
      title: "Directrice artistique",
      role: "Artiste pluridisciplinaire",
      bio: "Artiste franco‑arménienne travaillant avec le textile, le fil et le vêtement comme médiums de mémoire, de soin et de résistance.",
      insta: "https://www.instagram.com/ani_nkgsn/",
      img: "/ani.jpg" 
    }
  ];

  const fragmentContent: Record<string, { title: string, text: string }> = {
    'Archivartiste': {
      title: 'Fragments: Archivartiste',
      text: 'The artist as a collector of living archives. We do not look for history in books, but in the voices and stories shared directly by people. These oral archives are the raw material of our resistance.'
    },
    'Storytelling': { title: 'Fragments: Storytelling', text: 'The art of weaving narratives between borders.' },
    'Poetry': { title: 'Fragments: Poetry', text: 'Excerpts from the upcoming book and thesis.' },
    'Sunday Studies': { title: 'Sunday Studies', text: 'Chalk on concrete. Every Sunday, we return to the basics.' },
    'Articles': { title: 'Fragments: Articles', text: 'Long-form reflections on artivism and identity.' }
  };

  return (
    <main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#D6D4A1]">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div className={`relative z-10 transition-all duration-700 ${activeFragment ? 'blur-xl scale-[0.98] opacity-50' : ''}`}>
        
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-[#D6D4A1]/20 flex items-center justify-center mb-16 animate-[pulse_5s_infinite]">
            <h1 className="text-5xl md:text-7xl tracking-[0.4em] font-serif font-light translate-x-3">CVRCLE</h1>
          </div>
          <p className="text-sm tracking-[0.3em] opacity-60 uppercase">Beyond borders. Between forms.</p>
        </section>

        {/* MANIFESTO */}
        <section className="py-32 px-6 md:px-24 border-t border-white/5 text-center flex flex-col items-center">
          <p className="max-w-4xl text-2xl md:text-4xl font-serif italic leading-snug">
            "We are the black sheep not by exclusion, but by choice. We transform the weight of pain into the fluidity of language, creating sanctuaries where the overlooked becomes visible."
          </p>
        </section>

        {/* ARCHIVES & TRACES */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-24">Archives & Traces</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7 group">
              <div className="overflow-hidden bg-zinc-900 aspect-[4/5] mb-6">
                <img src="/sonogravure.jpg" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity" alt="Sonogravure" />
              </div>
              <p className="font-serif italic text-xl">Sonogravure — Anna Rexha</p>
            </div>
            <div className="md:col-span-5 space-y-24">
              <div className="group">
                <div className="overflow-hidden bg-zinc-900 aspect-square mb-6">
                  <img src="/workshop.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" alt="Workshop" />
                </div>
                <p className="font-serif italic">Art workshop : Art Under The Rainbow</p>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mt-2">Avril, 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* FRAGMENTS */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-24 text-center">Theoretical Fragments</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {Object.keys(fragmentContent).map((item) => (
              <button key={item} onClick={() => setActiveFragment(item)}
                className="group relative py-20 bg-[#050505] transition-all hover:bg-white/[0.03]">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-60 group-hover:opacity-100">{item}</span>
              </button>
            ))}
          </div>
        </section>

        {/* THE COLLECTIVE */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-32">The Collective</h2>
          <div className="space-y-48">
            {members.map((artist) => (
              <div key={artist.name} className="group grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100 aspect-[3/4] bg-zinc-900">
                   <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-8 space-y-8">
                  <h3 className="text-5xl md:text-8xl font-serif font-extralight tracking-tighter">{artist.name}</h3>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{artist.title}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 italic">{artist.role}</p>
                  </div>
                  <p className="max-w-xl text-lg md:text-xl leading-relaxed opacity-70 font-serif italic py-4 border-y border-white/5">{artist.bio}</p>
                  <a href={artist.insta} target="_blank" className="inline-block text-[10px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 hover:border-white transition-all z-[70] relative">Instagram</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAST PROJECTS */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-24">Past Projects</h2>
          <div className="space-y-12">
            <div className="group border border-white/10 p-8 md:p-12 hover:border-[#D6D4A1]/30 transition-all duration-700 bg-zinc-900/10">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 border border-white/20 text-[9px] uppercase tracking-widest rounded-full opacity-60">Completed Jan 2026</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-[#003399] flex items-center justify-center rounded-[1px]">
                      <span className="text-[6px] text-[#FFCC00]">★</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest opacity-40">Co-funded by the EU</span>
                  </div>
                </div>
                <span className="text-[10px] opacity-40 font-mono">LUXEMBOURG</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-serif mb-6 opacity-90">Role Models</h4>
              <p className="text-lg opacity-70 max-w-2xl font-serif italic leading-relaxed">
                In partnership with BLOM ASBL & the European EPBN WISE initiative.
              </p>
            </div>
            <div className="group border border-white/10 p-8 md:p-12 hover:border-white/20 transition-all duration-700 bg-black/40">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[9px] uppercase tracking-widest opacity-40">Archive</span>
                <span className="text-[10px] opacity-40 font-mono">METZ, FRANCE</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-serif mb-4 italic opacity-70">Essais Dynamiques</h4>
              <p className="text-lg opacity-60 max-w-2xl font-serif mb-6">Installation exhibited at Galerie 0.15.</p>
            </div>
          </div>
        </section>

        {/* PRESS SECTION - NEWLY ADDED */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-16">Press & Recognition</h2>
          <div className="flex flex-wrap gap-x-16 gap-y-8 items-center">
            <span className="text-2xl md:text-4xl font-serif italic opacity-60 hover:opacity-100 transition-opacity">Tageblatt</span>
            <span className="text-2xl md:text-4xl font-serif italic opacity-60 hover:opacity-100 transition-opacity">RTL Luxembourg</span>
            <span className="text-2xl md:text-4xl font-serif italic opacity-60 hover:opacity-100 transition-opacity">Woxx</span>
          </div>
        </section>

        {/* UPCOMING */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-24">Upcoming</h2>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-40 mb-2">May 2026</p>
                <h5 className="text-2xl font-serif mb-4">Space & Identity</h5>
                <p className="text-sm opacity-60 font-serif italic">Exhibition series exploring the Black Sheep philosophy.</p>
             </div>
             <div className="p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Summer 2026</p>
                <h5 className="text-2xl font-serif mb-4">Collective Sanctuary</h5>
                <p className="text-sm opacity-60 font-serif italic">Textile residency focused on oral archives.</p>
             </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-30 flex justify-between items-center border-t border-white/5 bg-black">
          <span>CVRCLE — 2026</span>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/cvrcle.collective/" target="_blank" className="hover:text-white transition z-[70] relative">Instagram</a>
            <a href="mailto:hello@cvrcle.com" className="hover:text-white transition z-[70] relative">Contact</a>
          </div>
        </footer>
      </div>

      {/* MODAL */}
      {activeFragment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveFragment(null)}></div>
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-5xl p-8 md:p-16 animate-in zoom-in duration-300">
             <div className="flex justify-between items-start mb-12">
                <h3 className="text-4xl md:text-6xl font-serif italic">{fragmentContent[activeFragment].title}</h3>
                <button onClick={() => setActiveFragment(null)} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">[ Close ]</button>
              </div>
              <p className="text-xl opacity-80 font-serif leading-relaxed italic max-w-2xl">{fragmentContent[activeFragment].text}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
        body { margin: 0; background-color: #050505; cursor: crosshair; overflow-x: hidden; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes pulse {
          0%, 100% { border-color: rgba(214, 212, 161, 0.1); transform: scale(1); }
          50% { border-color: rgba(214, 212, 161, 0.4); transform: scale(1.02); }
        }
      `}</style>
    </main>
  );
}