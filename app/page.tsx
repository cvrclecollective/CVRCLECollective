"use client";

import { useEffect, useRef, useState } from "react";

export default function CvrcleFinal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFragment, setActiveFragment] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

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
      role: "Vloggeuse et poétesse",
      bio: "Créatrice chinoise, diplômée en gestion de projets culturels, chargée de coordination, d’administration et de production au sein du collectif.",
      insta: "https://www.instagram.com/real_xslll/",
      img: "/shulin.jpg" 
    },
    {
      name: "Ani NIKOGOSYAN",
      title: "Directrice artistique",
      role: "Artiste pluridisciplinaire",
      bio: "Artiste franco‑arménienne travaillant with the textile, le fil et le vêtement comme médiums de mémoire, de soin et de résistance.",
      insta: "https://www.instagram.com/ani_nkgsn/",
      img: "/ani.jpg" 
    }
  ];

  const fragmentContent: Record<string, { title: string, text: string }> = {
    'Archivartiste': {
      title: 'Fragments: Archivartiste',
      text: 'The artist as a collector of living archives. We do not look for history in books, but in the voices and stories shared directly by people.'
    },
    'Storytelling': { title: 'Fragments: Storytelling', text: 'The art of weaving narratives between borders.' },
    'Poetry': { title: 'Fragments: Poetry', text: 'Excerpts from the upcoming book and thesis.' },
    'Sunday Studies': { title: 'Sunday Studies', text: 'Chalk on concrete. Every Sunday, we return to the basics.' },
    'Articles': { title: 'Fragments: Articles', text: 'Long-form reflections on artivism and identity.' }
  };

  const pressMentions = [
    {
      source: "RTL Today",
      title: "Artivism in Luxembourg: The rise of CVRCLE Collective",
      link: "https://today.rtl.lu/news/luxembourg/luxembourg-selects-lgbtqia-role-models-for-european-awards-in-prague-1785626408"
    },
    {
      source: "WOXX",
      title: "Au-delà des frontières : L'identité plurielle d'Anna Rexha",
      link: "https://www.woxx.lu/lgbtqia-vorbildfunktion/"
    },
    {
      source: "Tageblatt",
      title: "Inklusion durch Kunst - Das CVRCLE Projekt",
      link: "https://www.tageblatt.lu/Luxemburg/Isabel-Spigarelli-als-Role-Model-ausgezeichnet-24654.html"
    }
  ];

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#D6D4A1]">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div className={`relative z-10 transition-all duration-700 ${activeFragment ? 'blur-xl scale-[0.98] opacity-85' : ''}`}>
        
        {/* 1. HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border flex items-center justify-center mb-16 animate-[pulse_5s_infinite] border-[#D6D4A1]/20">
            <h1 className="text-5xl md:text-7xl tracking-[0.4em] font-serif font-light translate-x-3">CVRCLE</h1>
          </div>
          <div className="space-y-2">
            {taglines.map((line, i) => (
              <p key={i} className="text-[10px] md:text-xs tracking-[0.3em] opacity-90 uppercase font-light">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 2. THEORETICAL FRAGMENTS */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-24 text-center">Theoretical Fragments</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {Object.keys(fragmentContent).map((item) => (
              <button key={item} onClick={() => setActiveFragment(item)}
                className="group relative py-20 bg-[#050505] transition-all hover:bg-white/[0.03]">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-70 group-hover:opacity-100">{item}</span>
              </button>
            ))}
          </div>
        </section>

        {/* JOURNAL & PRESS MENTIONS */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-24">Journal & Press Mentions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl">
            <div className="bg-white/[0.02] p-12 border border-white/5 flex flex-col justify-center">
              <h4 className="text-[10px] uppercase tracking-widest mb-12 opacity-95 italic font-light">Featured Reflections</h4>
              <div className="space-y-16">
                <p className="text-2xl md:text-3xl font-serif italic opacity-95 hover:opacity-100 transition-opacity leading-relaxed">
                  &ldquo;An ephemeral approach to permanence.&rdquo;
                </p>
                <p className="text-2xl md:text-3xl font-serif italic opacity-95 hover:opacity-100 transition-opacity leading-relaxed">
                  &ldquo;Redefining the circle as a space of inclusion.&rdquo;
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-12">
               <div className="space-y-2">
                 <p className="text-[9px] uppercase tracking-[0.4em] opacity-90 mb-6">As seen in</p>
                 <div className="grid grid-cols-1 gap-8">
                   {pressMentions.map((press, i) => (
                     <a 
                       key={i} 
                       href={press.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="group border-l border-white/10 pl-6 py-2 hover:border-[#D6D4A1] transition-all relative z-[70] block"
                     >
                       <span className="text-2xl tracking-[0.3em] font-light opacity-80 uppercase block group-hover:text-[#D6D4A1] transition-colors">{press.source}</span>
                       <span className="text-[9px] tracking-widest opacity-95 uppercase block mt-1">{press.title}</span>
                     </a>
                   ))}
                 </div>
               </div>
               <p className="text-[10px] uppercase tracking-[0.5em] opacity-90 italic pt-8">
                 Tracing cultural narratives across Luxembourg.
               </p>
            </div>
          </div>
        </section>

        {/* 3. THE COLLECTIVE */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-32">The Collective</h2>
          <div className="space-y-48">
            {members.map((artist) => (
              <div key={artist.name} className="group grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-70 group-hover:opacity-100 aspect-[3/4] bg-zinc-900">
                   <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-8 space-y-8">
                  <h3 className="text-5xl md:text-8xl font-serif font-extralight tracking-tighter">{artist.name}</h3>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{artist.title}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-95 italic">{artist.role}</p>
                  </div>
                  <p className="max-w-xl text-lg md:text-xl leading-relaxed opacity-95 font-serif italic py-4 border-y border-white/5">{artist.bio}</p>
                  <a href={artist.insta} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 hover:border-white transition-all z-[70] relative">Instagram</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PAST PROJECTS */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-24">Past Projects</h2>
          <div className="space-y-12">
            <div className="group border border-white/10 p-8 md:p-12 hover:border-[#D6D4A1]/30 transition-all duration-700 bg-zinc-900/10">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 border border-white/20 text-[9px] uppercase tracking-widest rounded-full opacity-90">Completed Jan 2026</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-[#003399] flex items-center justify-center rounded-[1px]">
                      <span className="text-[6px] text-[#FFCC00]">★</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest opacity-95">Co-funded by the EU</span>
                  </div>
                </div>
                <span className="text-[10px] opacity-95 font-mono">LUXEMBOURG</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-serif mb-6 opacity-90">Role Models</h4>
              <p className="text-lg opacity-95 max-w-2xl font-serif italic mb-8 leading-relaxed">
                In partnership with BLOM ASBL & the European EPBN WISE initiative. 
                A project celebrating LGBTQIA+ visibility as a form of cultural strength.
              </p>
            </div>
            <div className="group border border-white/10 p-8 md:p-12 hover:border-white/20 transition-all duration-700 bg-black/40">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[9px] uppercase tracking-widest opacity-95">Archive</span>
                <span className="text-[10px] opacity-95 font-mono">METZ, FRANCE</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-serif mb-4 italic opacity-95">Essais Dynamiques</h4>
              <p className="text-lg opacity-90 max-w-2xl font-serif mb-6 leading-relaxed">Installation exhibited at Galerie 0.15.</p>
            </div>
          </div>
        </section>

        {/* 5. UPCOMING */}
        <section className="py-40 px-6 md:px-24 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-24">Upcoming</h2>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-95 mb-2">May 2026</p>
                <h5 className="text-2xl font-serif mb-4 underline underline-offset-8">Space & Identity</h5>
                <p className="text-sm opacity-90 font-serif italic leading-relaxed">New installation series exploring the &ldquo;Black Sheep&rdquo; in urban environments.</p>
             </div>
             <div className="p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-95 mb-2">Summer 2026</p>
                <h5 className="text-2xl font-serif mb-4 underline underline-offset-8">Collective Sanctuary</h5>
                <p className="text-sm opacity-90 font-serif italic leading-relaxed">Residency series focused on textile art and cross-border storytelling.</p>
             </div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-90 flex justify-between items-center border-t border-white/5 bg-black">
          <span>CVRCLE — 2026</span>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/cvrcle.collective/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition z-[70] relative">Instagram</a>
            <a href="mailto:hello@cvrcle.com" className="hover:text-white transition z-[70] relative">Contact</a>
          </div>
        </footer>
      </div>

      {activeFragment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveFragment(null)}></div>
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-5xl p-8 md:p-16 animate-in zoom-in duration-300">
             <div className="flex justify-between items-start mb-12">
                <h3 className="text-4xl md:text-6xl font-serif italic">{fragmentContent[activeFragment].title}</h3>
                <button onClick={() => setActiveFragment(null)} className="text-[10px] uppercase tracking-widest opacity-95 hover:opacity-100">[ Close ]</button>
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