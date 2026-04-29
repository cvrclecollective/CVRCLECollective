"use client";

import { useEffect, useRef, useState } from "react";

export default function CvrcleFinal() {
  const [activeMember, setActiveMember] = useState<any | null>(null);
  const [activeWorkshop, setActiveWorkshop] = useState<boolean>(false);
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
      projects: [
        { title: "Essais Dynamiques", desc: "Installation showcased at Galerie 0.15, Metz. A study of motion and displacement." },
        { title: "Memory Pocket of Smiles", desc: "Textile workshop series exploring cherished memories on tissue." },
      ],
      insta: "https://www.instagram.com/arts_anna.rexha/",
      img: "/anna.jpg" 
    },
    {
      name: "Shulin XIA",
      title: "Vice présidente & Cheffe de projet & Chargée de communication",
      role: "Vloggeuse et poétesse",
      bio: "Créatrice chinoise, diplômée en gestion de projets culturels, chargée de coordination, d’administration et de production au sein du collectif.",
      projects: [
        { title: "4SEASONS Strategy", desc: "Developing the permanent framework for cyclic artistic interventions." },
        { title: "Zine Archives", desc: "Managing the transformation of workshop outcomes into digital narratives." }
      ],
      insta: "https://www.instagram.com/real_xslll/",
      img: "/shulin.jpg" 
    },
    {
      name: "Ani NIKOGOSYAN",
      title: "Directrice artistique",
      role: "Artiste pluridisciplinaire",
      bio: "Artiste franco‑arménienne travaillant avec le textile, le fil et le vêtement comme médiums de mémoire, de soin et de résistance.",
      projects: [
        { title: "Essais Dynamiques", desc: "Installation showcased at Galerie 0.15, Metz. A study of motion and displacement." },
        { title: "Memory Pocket of Smiles", desc: "Textile workshop series exploring cherished memories on tissue." },
        { title: "Fil de Mémoire", desc: "Sculptural textile research on heritage and resistance." }
      ],
      insta: "https://www.instagram.com/ani_nkgsn/",
      img: "/ani.jpg" 
    }
  ];

  const fragmentContent: Record<string, { title: string, text: string }> = {
    'Archivartiste': {
      title: `Fragments: Archivartiste`,
      text: `The artist as a collector of living archives. We do not look for history in books, but in the voices and stories shared directly by people.`
    },
    'Storytelling': { 
      title: `Fragments: Storytelling`, 
      text: `The art of weaving narratives between borders.` 
    },
    'Poetry': { 
      title: `Fragments: Poetry`, 
      text: `Excerpts from the upcoming book and thesis.` 
    },
    'Sunday Studies': { 
      title: `Sunday Studies`, 
      text: `Chalk on concrete. Every Sunday, we return to the basics.` 
    },
    'Articles': { 
      title: `Fragments: Articles`, 
      text: `Long-form reflections on artivism and identity.` 
    }
  };

  const pressMentions = [
    {
      source: "RTL Today",
      title: "Luxembourg selects LGBTQIA+ role models for European awards in Prague",
      link: "https://today.rtl.lu/news/luxembourg/luxembourg-selects-lgbtqia-role-models-for-european-awards-in-prague-1785626408"
    },
    {
      source: "WOXX",
      title: "Jung und Queer",
      link: "https://www.woxx.lu/lgbtqia-vorbildfunktion/"
    },
    {
      source: "Tageblatt",
      title: "Queere Menschen sichtbar machen – das ist das Ziel der „European Pride Business Network LGBTQIA+ & Allies Role Models Awards“, die dieses Jahr zum ersten Mal auch in Luxemburg stattfanden.",
      link: "https://www.tageblatt.lu/Luxemburg/Isabel-Spigarelli-als-Role-Model-ausgezeichnet-24654.html"
    }
  ];

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#D6D4A1]">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div className={`relative z-10 transition-all duration-700 ${activeFragment ? 'blur-xl scale-[0.98] opacity-85' : ''}`}>
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="relative group mb-12">
            {/* The Logo Mask - Using the butterfly shape but site color */}
            <div 
              className="w-72 h-72 md:w-[500px] md:h-[500px] bg-[#D6D4A1] opacity-90 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
              style={{
                maskImage: 'url("/logo.png")',
                WebkitMaskImage: 'url("/logo.png")',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
              }}
            />
          </div>

          <div className="space-y-2">
            {taglines.map((line, i) => (
              <p key={i} className="text-[10px] md:text-xs tracking-[0.3em] opacity-90 uppercase font-light">
                {line}
              </p>
            ))}
          </div>
        </section>

{/* 4SEASONS UMBRELLA PROJECT */}
<section className="py-32 px-6 md:px-24 border-t border-[#D6D4A1]/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            
            {/* The Umbrella Concept */}
            <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1] mb-8">Permanent Project</h2>
                <h3 className="text-5xl md:text-7xl font-serif mb-8 italic">4SEASONS</h3>
                <div className="space-y-6 text-lg opacity-90 font-serif leading-relaxed">
                  <p>
                    A long-term artistic gesture rebuilding our relationship with nature, time, and collective memory. 4SEASONS reflects a way of working in collaboration with nature’s cycles—a symbolic connection between care, bodies, and womanhood.
                  </p>
                  <p className="text-base opacity-70 italic border-l border-[#D6D4A1]/20 pl-6">
                    "Every action is documented and preserved, not as a trace, but as living material."
                  </p>
                </div>
              </div>
              
              {/* Symbolic Icon for 4SEASONS */}
              <div className="flex justify-center items-center">
                <div className="w-64 h-64 border border-[#D6D4A1]/20 rounded-full flex items-center justify-center relative animate-[pulse_8s_infinite]">
                  <div className="absolute inset-0 border border-[#D6D4A1]/10 rounded-full scale-110"></div>
                  <div className="grid grid-cols-2 gap-4 text-[9px] uppercase tracking-widest opacity-60">
                    <span className="text-center">Spring</span>
                    <span className="text-center">Summer</span>
                    <span className="text-center">Autumn</span>
                    <span className="text-center">Winter</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Chapter: SPRING 2026 */}
            {/* CLICKABLE WORKSHOP CARD */}
<button 
  onClick={() => setActiveWorkshop(true)}
  className="w-full text-left border border-[#D6D4A1]/20 p-8 md:p-16 bg-[#D6D4A1]/[0.03] group transition-all hover:border-[#D6D4A1]/60 hover:bg-[#D6D4A1]/[0.05] cursor-pointer"
>
  <div className="grid md:grid-cols-12 gap-12 items-center">
    {/* Replace the old placeholder div with this */}
<div className="md:col-span-5 aspect-[3/4] overflow-hidden border border-[#D6D4A1]/20">
  <img 
    src="/springposter.png" 
    alt="4SEASONS Spring Workshop Poster" 
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
</div>

    <div className="md:col-span-7 space-y-10">
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 border border-[#D6D4A1]/40 text-[9px] uppercase tracking-widest rounded-full">Active Cycle: Spring 2026</span>
      </div>
      
      <h4 className="text-4xl md:text-6xl font-serif italic group-hover:text-white transition-colors">
  {`Transforming Anger / The Inner Child's Voice`}
</h4>
      
      <div className="space-y-2 font-serif text-xl opacity-90">
        <p className="tracking-wide">RAINBOW CENTER</p>
        <p className="text-sm opacity-60 uppercase tracking-widest">19 Rue du Saint Esprit, 1475 Luxembourg</p>
        <p className="text-base pt-4 opacity-80 underline underline-offset-4 decoration-[#D6D4A1]/30">May 23rd, 2026 — 15h00</p>
      </div>

      <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">
  {`"A space where anger is expressed, torn apart, and artistically recomposed — transforming emotional rupture into creative renewal."`}
</p>
      <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">
        Facilitated by: Anna Rexha. 
        </p>
        <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">
        Created by: Shulin Xia.
      </p>


      <div className="pt-4">
        <span className="text-[10px] uppercase tracking-[0.5em] border-b border-[#D6D4A1]/30 pb-2 group-hover:border-[#D6D4A1] transition-all">Click to explore the process →</span>
      </div>
    </div>
  </div>
</button>

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
  {`"As an artistic collective, we understand role models as bearers of stories that should be made visible, shared, and archived."`}
</p>
<p className="text-2xl md:text-3xl font-serif italic opacity-95 hover:opacity-100 transition-opacity leading-relaxed">
  {`"Describing the trophies on behalf of CVRCLE, president and artistic director of the collective Anna Rexha said, 'Each trophy combines a solid structure with a textile component: the textile's fragility representing the societal challenges...'"`}
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
  <div key={artist.name} className="group grid md:grid-cols-12 gap-12 items-start py-12 border-b border-white/5 last:border-0">
    <div className="md:col-span-4 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-70 group-hover:opacity-100 aspect-[3/4] bg-zinc-900">
       <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
    </div>
    <div className="md:col-span-8 space-y-8">
      <button 
        onClick={() => setActiveMember(artist)}
        className="text-left group/name"
      >
        <h3 className="text-5xl md:text-8xl font-serif font-extralight tracking-tighter group-hover/name:text-white transition-colors">{artist.name}</h3>
      </button>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{artist.title}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-95 italic">{artist.role}</p>
      </div>
      <p className="max-w-xl text-lg md:text-xl leading-relaxed opacity-90 font-serif italic py-4 border-y border-white/5">{artist.bio}</p>
      <div className="flex gap-8 items-center pt-4">
        <button 
          onClick={() => setActiveMember(artist)}
          className="text-[10px] uppercase tracking-[0.5em] border-b border-[#D6D4A1]/30 pb-2 hover:border-[#D6D4A1] transition-all"
        >
          See more about the artist
        </button>
        <a href={artist.insta} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.5em] opacity-50 hover:opacity-100 transition-all">Instagram</a>
      </div>
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
                <p className="text-sm opacity-90 font-serif italic leading-relaxed">{`New installation series exploring the "Black Sheep" in urban environments.`}</p>
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
      `}</style>
      {/* WORKSHOP MODAL */}
{activeWorkshop && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto bg-black/95 backdrop-blur-xl">
    <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveWorkshop(false)}></div>
    <div className="relative bg-[#080808] border border-[#D6D4A1]/20 w-full max-w-6xl p-8 md:p-20 overflow-y-auto max-h-[90vh]">
      
      <div className="flex justify-between items-start mb-16 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1]">Workshop Proposal — Spring 2026</p>
          <h3 className="text-4xl md:text-7xl font-serif italic tracking-tight">Transforming Anger</h3>
          <p className="text-lg font-serif opacity-60">CVRCLE x RAINBOW CENTER | Luxembourg</p>
        </div>
        <button onClick={() => setActiveWorkshop(false)} className="text-[10px] uppercase tracking-[0.5em] border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">[ Close ]</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-6">
            <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">The Methodology</h5>
            <p className="opacity-70 font-serif text-lg leading-relaxed">
  {`Rather than denying anger, we treat it as a signal, a memory, and a source of creative energy. A participatory experiment on "unfinished actions."`}
</p>
          </div>

          <div className="space-y-10">
            <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">Sensory Stations</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['Sound: Childhood ambient triggers', 'Touch: Sandpaper & Ice cubes', 'Smell: Alcohol & Incense ash', 'Movement: Forceful repetition'].map(item => (
                <div key={item} className="p-6 bg-white/[0.03] border border-white/5 font-serif italic text-lg opacity-85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-8">
            <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">Acts of Alteration</h5>
            <ul className="space-y-6 text-lg font-serif italic opacity-90">
              <li className="flex gap-4"><span>—</span> <span>Correction fluid: To cover, to create opacity.</span></li>
              <li className="flex gap-4"><span>—</span> <span>Tear it open: Physically enacting rupture.</span></li>
              <li className="flex gap-4"><span>—</span> <span>Fingernail scratching: Bringing the body to the surface.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{/* ARTIST PROFILE MODAL */}
{activeMember && (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in zoom-in-95 duration-500">
    <div className="absolute inset-0" onClick={() => setActiveMember(null)}></div>
    <div className="relative bg-[#080808] border border-[#D6D4A1]/10 w-full max-w-6xl overflow-y-auto max-h-[90vh] custom-scrollbar">
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-5 h-[400px] md:h-full bg-zinc-900">
          <img src={activeMember.img} alt={activeMember.name} className="w-full h-full object-cover grayscale opacity-80" />
        </div>
        <div className="md:col-span-7 p-8 md:p-16 space-y-12">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h4 className="text-6xl md:text-8xl font-serif italic">{activeMember.name}</h4>
              <p className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1]">{activeMember.title}</p>
            </div>
            <button onClick={() => setActiveMember(null)} className="text-[10px] uppercase tracking-[0.5em]">[ Close ]</button>
          </div>
          
          <div className="space-y-6">
             <h5 className="text-[11px] uppercase tracking-[0.4em] opacity-50 border-b border-white/5 pb-2">Full Biography</h5>
             <p className="text-xl font-serif leading-relaxed italic opacity-90">{activeMember.bio} Her practice serves as a bridge between intimate memory and collective activism.</p>
          </div>

          <div className="space-y-8">
             <h5 className="text-[11px] uppercase tracking-[0.4em] opacity-50 border-b border-white/5 pb-2">Artist Projects</h5>
             <div className="space-y-8">
               {activeMember.projects.map((p: any) => (
                 <div key={p.title} className="space-y-2">
                    <p className="text-2xl font-serif underline decoration-[#D6D4A1]/20">{p.title}</p>
                    <p className="text-base opacity-70 font-serif italic">{p.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </main>
  );
}