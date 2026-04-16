"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function CvrcleFinal() {
  const [activeFragment, setActiveFragment] = useState(null);
  const canvasRef = useRef(null);

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
    { id: "01", title: "Sonogravure", description: "A study in sound-generated visual imprints.", artist: "Anna Rexha", type: "Digital Archive" },
    { id: "02", title: "Art Under The Rainbow", description: "Workshop archive — Avril 2025.", artist: "Collective", type: "Community Workshop" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const circles = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 150 + 50,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(214, 212, 161, 0.02)';
      circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        circle.x += circle.dx;
        circle.y += circle.dy;
        if (circle.x < -circle.radius) circle.x = canvas.width + circle.radius;
        if (circle.x > canvas.width + circle.radius) circle.x = -circle.radius;
        if (circle.y < -circle.radius) circle.y = canvas.height + circle.radius;
        if (circle.y > canvas.height + circle.radius) circle.y = -circle.radius;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#D6D4A1]">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#D6D4A1]/10 flex items-center justify-center mb-12">
          <h1 className="text-5xl md:text-7xl tracking-[0.4em] font-serif font-light">CVRCLE</h1>
        </div>
        <div className="space-y-3 opacity-50 italic font-serif">
          {taglines.map((line, i) => (
            <p key={i} className="text-[11px] md:text-sm tracking-widest">{line}</p>
          ))}
        </div>
      </section>

      {/* ARCHIVES & TRACES */}
      <section className="relative z-10 py-24 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-16">Archives & Traces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
          <div className="group flex flex-col items-center cursor-pointer" onClick={() => setActiveFragment(fragments[0])}>
            <div className="w-full max-w-[200px] aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
              <img src="/sonogravure.png" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000" alt="Sonogravure" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-serif italic text-lg">Sonogravure</p>
              <p className="text-[9px] uppercase tracking-widest opacity-40">Anna Rexha</p>
            </div>
          </div>
          <div className="group flex flex-col items-center cursor-pointer" onClick={() => setActiveFragment(fragments[1])}>
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
             <p className="mt-4 font-serif italic opacity-30 text-sm text-center tracking-widest">Fragment n°01</p>
          </div>
        </div>
      </section>

      {/* CHRONICLE & JOURNAL */}
      <section className="relative z-10 py-32 px-6 md:px-24 border-t border-white/5">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-20">Chronicle & Journal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div className="space-y-16">
            <div className="border-l border-white/10 pl-8 hover:border-[#D6D4A1] transition-colors">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Upcoming Phase</span>
              <h3 className="text-3xl font-serif mt-4 mb-2">New Horizon</h3>
              <p className="opacity-60 font-serif italic">Multidisciplinary research on digital displacement.</p>
            </div>
            <div className="border-l border-white/10 pl-8 hover:border-white/40 transition-colors">
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Past Exhibition</span>
              <h3 className="text-3xl font-serif mt-4 mb-2">Galerie 0.15</h3>
              <p className="opacity-60 font-serif italic">Early fragments and the foundation of the collective.</p>
            </div>
          </div>
          <div className="bg-white/[0.02] p-10 border border-white/5 flex flex-col justify-center">
            <h4 className="text-[10px] uppercase tracking-widest mb-8 opacity-40 italic">Journal Mentions</h4>
            <div className="space-y-8">
              <p className="text-xl font-serif italic opacity-70 hover:opacity-100 transition-opacity leading-relaxed">&quot;An ephemeral approach to permanence.&quot;</p>
              <p className="text-xl font-serif italic opacity-70 hover:opacity-100 transition-opacity leading-relaxed">&quot;Redefining the circle as a space of inclusion.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIVE SECTION */}
      <section className="relative z-10 py-32 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
        <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-20 text-center">The Collective</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {members.map((member, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto mb-8 grayscale opacity-20 group-hover:opacity-100 transition-all duration-700" />
              <h3 className="text-xl font-serif italic mb-2">{member.name}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">{member.role}</p>
              <p className="text-sm opacity-60 leading-relaxed italic px-4">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POPUP */}
      {activeFragment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveFragment(null)}>
          <div className="max-w-2xl w-full bg-[#080808] border border-white/10 p-12 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Fragment {activeFragment.id}</p>
            <h3 className="text-4xl font-serif italic mb-2">{activeFragment.title}</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-8">{activeFragment.type}</p>
            <p className="text-lg opacity-70 font-serif italic mb-8">{activeFragment.description}</p>
            <button onClick={() => setActiveFragment(null)} className="text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity pt-4 border-t border-white/10 w-full">Close</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-30 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
        <span>CVRCLE — 2026</span>
        <div className="flex gap-10">
          <a href="https://www.instagram.com/cvrcle.collective/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6D4A1] transition cursor-pointer">Instagram</a>
          <a href="mailto:hello@cvrcle.com" className="hover:text-[#D6D4A1] transition">Contact</a>
        </div>
      </footer>
    </main>
  );
}