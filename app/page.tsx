"use client";


import { useEffect, useRef, useState } from "react";
interface Member {
  name: string;
  pronouns: string;
  title: string;
  role: string;
  bio: string;
  projects: { title: string; desc: string }[];
  insta: string;
  img: string;
}
export default function CvrcleFinal() {
  const [activeProject, setActiveProject] = useState(null);
  const [showManifesto, setShowManifesto] = useState(false);
  const phrases = [
    `Beyond borders. Between forms.`,
    `Iwwer d'Grenzen eraus. Tëscht de Formen.`,
    `Au-delà des frontières. Entre les formes.`,
    `Përtej kufijve. Ndërmjet formave.`,
    `Արտաքս սահմաններից։ Ձևերի միջև։`,
    `超越边界。形之间。`,
    `Поза межами. Між формами.`
  ];
  
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000); // This changes the text every 3 seconds
    return () => clearInterval(timer); 
}, [phrases.length]); // Adding the length here keeps it stable

  const [activeMember, setActiveMember] = useState<any | null>(null);
  const [activeWorkshop, setActiveWorkshop] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFragment, setActiveFragment] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activePoem, setActivePoem] = useState<any>(null);


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
      circles.push({ x: e.clientX, y: e.clientY, r: 8 + Math.random() * 8, a: 0.3 });
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onTouchMove = (e: any) => { // Use 'any' if 'TouchEvent' gives an error
      const onTouchMove = (e: any) => {
        // Line 68 was here - DELETE IT
        const touch = e.touches[0];
        circles.push({ x: touch.clientX, y: touch.clientY, r: 4 + Math.random() * 8, a: 0.3 });
      };
      const touch = e.touches[0];

      circles.push({ x: touch.clientX, y: touch.clientY, r: 4 + Math.random() * 8, a: 0.3 });
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });
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
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [mounted]);

  <p 
  key={currentPhrase} 
  className="text-[#D6D4A1] font-serif italic text-lg md:text-2xl opacity-80 animate-fade-in"
>
  {phrases[currentPhrase]}
</p>

const members: Member[] = [
  {
      name: `Anna Rexha`,
      pronouns: `(they/them)`,
      title: `President & Artistic director`,
      role: `Multidisciplinary artist`,
      bio: `A multidisciplinary creator from Kosovo and Luxembourg, specializing in video and sound. Their work explores the fluidity of plural identities, blending artistic expression with activism (artivism) to challenge singular cultural narratives.`,
      projects: [
        { title: `Essais Dynamiques`, desc: `Installation showcased at Galerie 0.15, Metz. A study of motion and displacement.` },
        { title: `Memory Pocket of Smiles`, desc: `Textile workshop series exploring cherished memories on tissue.` },
      ],
      insta: "https://www.instagram.com/arts_anna.rexha/",
      img: "/anna.jpeg" 
    },
    {
      name: `Shulin Xia`,
      pronouns: `(she/her)`,
      title: `Vice president & Project manager & Communications manager `,
      role: `Creative Producer and Poet`,
      bio: `Bridging the gap between vision and execution, Shulin manages the coordination and communications for CVRCLE. With a degree in Cultural Project Management, she focuses on building sustainable structures for creative expression.`,
      projects: [
        { title: `4SEASONS Strategy`, desc: `Developing the permanent framework for cyclic artistic interventions.` },
        { title: `Zine Archives`, desc: `Managing the transformation of workshop outcomes into digital narratives.` }
      ],
      insta: "https://www.instagram.com/real_xslll/",
      img: "/shulin.jpeg" 
    },
    {
      name: `Ani Nikogosyan`,
      pronouns: `(she/her)`,
      title: `Artistic director`,
      role: `Multidisciplinary Artist`,
      bio: `A Franco-Armenian artist working with textiles, thread, and garments as mediums for memory, healing, and resistance.`,
      projects: [
        { title: `Essais Dynamiques`, desc: `Installation showcased at Galerie 0.15, Metz. A study of motion and displacement.` },
        { title: `Memory Pocket of Smiles`, desc: `Textile workshop series exploring cherished memories on tissue.` },
        { title: `Fil de Mémoire`, desc: `Sculptural textile research on heritage and resistance.` }
      ],
      insta: "https://www.instagram.com/ani_nkgsn/",
      img: "/ani.jpg" 
    }
  ];

  const fragmentContent: Record<string, { title: string, text: string, list?: any[] }> = {
    'Current': {
      title: `Fragments: Active Projects`,
      text: `Current explorations and collective movements.`,
      list: [
        {
          title: `Sunday`,
          date: `Ongoing`,
          content: `A recurring space for collective artistic practice and exploration.`,
          img: "/sunday-art.png",
          collection: "Ongoing"
        },
        {
          title: `Damp Memories Forest`,
          subtitle: `ACTIVE DIGITAL PROJECT`,
          date: `Summer 2026`,
          content: `Summer project by Shulin (coordinator) and Anna (creator).`,
          quote: "Write something that never dried.",
          description: `A participatory digital ecosystem transforming diary-writing into an evolving visual forest. Focusing on the notion of dampness—memories that resist resolution and emotions that linger like internal weather.`,
          zones: [
            `WET ZONE (BLUR & OVERLAP)`,
            `OPEN FIELD (GROWTH & VISIBILITY)`,
            `SHADOW AREA (CONCEALMENT)`
          ],
          img: "/damp-forest-sketch.png",
          status: `STATUS: PILOT STAGE`,
          format: `FORMAT: ASYNCHRONOUS WHITEBOARD`,
          phase: `PHASE: 2026 COLLECTIVE ARCHIVE`,
          collection: `Summer Project`
        },
        {
          title: `Learning Boredom`,
          date: `Summer 2026`,
          content: `Summer project by Anna exploring the generative nature of stillness.`,
          img: "/images/boredom.jpg",
          collection: `Summer Project`
        }
      ]
    },
    
    'ART': {
      title: `Fragments: Artistic Work`,
      text: `A visual and sensory archive of installations, soundscapes, and physical media.`,
      list: [
        {
          title: `Title of Installation`,
          artist: `Artist Name`,
          content: `Description of the work and the concept behind it.`,
          img: "/images/artwork1.jpg",
          type: `Installation`, // Sub-section identifier
          collection: `Artistic Fragments`
        },
        {
          title: `Audio Piece Name`,
          artist: `Artist Name`,
          content: `Description of the soundscape.`,
          img: "/images/audio-cover.jpg",
          type: "Sound",
          collection: "Artistic Fragments"
        }
      ]
    },

    'Archivartism': {
      title: `Fragments: Archivartiste`,
      text: `The artist as a collector of living archives. We do not look for history in books, but in the voices and stories shared directly by people.`
    },
    'Storytelling': { 
      title: `Fragments: Storytelling`, 
      text: `A collection of shared histories, oral traditions, and lived experiences from our collective.`,
  list: [
    {
      title: `This is Silence`,
      date: `Thursday, March 4, 1999`,
      content: `I am four years old. War has broken out, and everything I knew is loosening, slipping away, like the threads of the red sweater my grandmother knitted for me, one by one, until there is nothing left to hold it together. I am lying on the ground, on rough gravel, right beside the tracks, in a place that does not know us. We ran here, just across the border, over the barricades. The sky follows us, but nothing else does. Mom says we are standing in a doorway that never opens. A few weeks ago, I watched the house where I was born burn. The smoke climbed and spread, staining the sky in black. The walls cracked, then folded in on themselves, like something giving up. BHAM.`,
      img: "/silence.JPG", // Replace with your actual image path
      collection: `Collective Memories`
    }
    // ... add more stories here
  ]
},
    'Poetry': {
      title: `Fragments: Poetry`,
      text: `A collective archive of poetic explorations and shared narratives from the members.,`,
      // Add 'list: [' here
      list: [
        {
          title: `Message on a Paper Butterfly`,
          content: `We exchanged butterflies instead of kisses.`,
          collection: `Landscape of Broken Hearts`,
          img: "paper-butterfly.jpg",
          effect: `butterflies`
        }
      ] // Close it with ']'
    },
    'Articles&Resources': { 
      title: `Fragments: Articles&Resources`, 
      text: `Long-form reflections on artivism and identity.` 
    }, 
  };

  const pressMentions = [
    {
      source: `RTL Today`,
      title: `Luxembourg selects LGBTQIA+ role models for European awards in Prague`,
      link: "https://today.rtl.lu/news/luxembourg/luxembourg-selects-lgbtqia-role-models-for-european-awards-in-prague-1785626408"
    },
    {
      source: `WOXX`,
      title: `Jung und Queer`,
      link: "https://www.woxx.lu/lgbtqia-vorbildfunktion/"
    },
    {
      source: `Tageblatt`,
      title: `Queere Menschen sichtbar machen - das ist das Ziel der „European Pride Business Network LGBTQIA+ & Allies Role Models Awards, die dieses Jahr zum ersten Mal auch in Luxemburg stattfanden.`,
      link: "https://www.tageblatt.lu/Luxemburg/Isabel-Spigarelli-als-Role-Model-ausgezeichnet-24654.html"
    }
  ];

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;


  const fragmentData = (fragmentContent as any)[activeFragment || 'Fragments'];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[200] p-4 md:p-6 md:px-12 flex justify-between items-center mix-blend-difference">
  <div className="text-[11px] uppercase tracking-[0.2em] md:tracking-[0.5em] font-serif italic text-white/90">
  <a href="#members" className="hover:opacity-70 transition-opacity cursor-pointer">
    Cvrcle Collective
  </a>
</div>
  <div className="flex gap-4 md:gap-10">
    {[ 'Fragments', '4SEASONS', 'Sunday'].map((item) => (
      <button 
        key={item}
        onClick={() => {
          if (item === 'Sunday') {
            setActiveFragment('Current');
            const sundayProject = (fragmentContent['Current']?.list || []).find(p => p.title === 'Sunday');
            if (sundayProject) setActiveProject(sundayProject);
          } else {
            const id = item === 'Fragments' ? 'grid-section' : item.toLowerCase();
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="text-[10px] md:text-[11px] py-2 uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
      >
        {item}
      </button>
    ))}
  </div>
</nav>

    
<main className="relative min-h-screen font-light selection:bg-[#D6D4A1] selection:text-black bg-[#050505] text-[#F5F5F5]">
        {/* FIXED CSS BLOCK */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
        body { margin: 0; background-color: #050505; cursor: crosshair; overflow-x: hidden; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        
        @keyframes flutter {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-20vh) translateX(30px) rotate(360deg); opacity: 0; }
        }
        
        .butterfly-particle {
          position: fixed;
          pointer-events: none;
          z-index: 200;
          animation: flutter 10s linear infinite;
          font-size: 16px; md:font-size: 24px;
          color: #D6D4A1;
          filter: sepia(1) saturate(0.5); /* This makes them look like aged paper */
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 0.8; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }

        @keyframes heartbeat {
          0% { transform: scale(1) translateY(0); }
          25% { transform: scale(1.06) translateY(-4px); }
          35% { transform: scale(1.02) translateY(-4px); }
          45% { transform: scale(1.12) translateY(-12px); }
          100% { transform: scale(1) translateY(0); }
        }

        .animate-heartbeat {
          animation: heartbeat 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        /* Add inside your <style> block */
@keyframes mist-drift {
  0% { opacity: 0.3; transform: translateX(-5px) scale(1); }
  50% { opacity: 0.5; transform: translateX(10px) scale(1.05); }
  100% { opacity: 0.3; transform: translateX(-5px) scale(1); }
}

.animate-mist {
  animation: mist-drift 8s ease-in-out infinite;
}

.blur-layer {
  backdrop-filter: blur(8px);
  mask-image: linear-gradient(to bottom, transparent, black, transparent);
}
      `}} />

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />

      <div className={`relative z-10 transition-all duration-700 ${activeFragment ? 'blur-xl scale-[0.98] opacity-85' : ''}`}>
        
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 md:py-20">
          <div className="relative group mb-12">
            <div 
              className="w-48 h-48 md:w-[350px] md:h-[350px] bg-[#D6D4A1] opacity-90 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 animate-heartbeat"
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

          <div className="flex flex-col items-center justify-center min-h-[6rem] md:min-h-[4rem]">
  <p 
    key={currentPhrase} 
    className="text-[#D6D4A1] font-serif italic text-xl md:text-2xl opacity-80 animate-fade-in text-center"
  >
    {phrases[currentPhrase]}
  </p>
  <div className="flex flex-col items-center mt-12">
  <button 
    onClick={() => setShowManifesto(!showManifesto)}
    className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] border border-[#D6D4A1]/20 px-6 py-3 hover:bg-[#D6D4A1] hover:text-black transition-all duration-700"
  >
    {showManifesto ? 'Close' : 'Read Manifesto'}
  </button>

  <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${showManifesto ? 'max-h-[1200px] opacity-100 mt-16' : 'max-h-0 opacity-0'}`}>
    <div className="max-w-2xl text-center space-y-4 text-[#D6D4A1]/90 font-serif leading-relaxed px-6 italic mx-auto pb-20">
      <p>We are CVRCLE Collective, a multicultural and multidisciplinary group of artists and cultural workers exploring what exists in the in-between: between places, memories, identities, and narratives.</p>
      <p>Our practice emerges from migration stories, from the margins, from the voices that have been silenced or overlooked. Through video, textile, sound, installation, and image, we create spaces of care and visibility where stories can be held, shared, and transformed.</p>
      <p>As a collective, we believe in art as a bridge: between people, between worlds, between the seen and the unseen.</p>
      <p>We weave together our backgrounds, our practices, and our communities to make room for narratives that resist erasure.</p>
      <p>CVRCLE is a space of resonance. A place where the invisible becomes visible. Where the unheard is amplified. Where the margins find form.</p>
      <p className="not-italic uppercase tracking-[0.3em] text-[11px] pt-4">Welcome to our circle.</p>
    </div>
  </div>
</div>
</div>
        </section>

 {/* 2. THEORETICAL FRAGMENTS */}
 <section id="grid-section" className="py-20 md:py-40 px-6 md:px-24 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.6em] opacity-95 mb-12 md:mb-24 text-center">Theoretical Fragments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {Object.keys(fragmentContent).map((item) => (
              <button key={item} onClick={() => setActiveFragment(item)}
                className="group relative py-8 md:py-10 bg-[#050505] transition-all hover:bg-white/[0.03]">
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-70 group-hover:opacity-100">{item}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4SEASONS UMBRELLA PROJECT */}
        <section id="4seasons" className="scroll-mt-24 py-22 px-6 md:px-24 border-t border-[#D6D4A1]/10 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 md:mb-32 items-center">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1] mb-8">Permanent Project</h2>
                <h3 className="text-3xl md:text-7xl font-serif mb-8 italic">4SEASONS</h3>
                <div className="space-y-6 text-lg opacity-90 font-serif leading-relaxed">
                  <p>
                    A long-term artistic gesture rebuilding our relationship with nature, time, and collective memory. 4SEASONS reflects a way of working in collaboration with nature’s cycles—a symbolic connection between care, bodies, and womanhood.
                  </p>
                  <p className="text-base opacity-70 italic border-l border-[#D6D4A1]/20 pl-4 md:pl-6">
                    Every action is documented and preserved, not as a trace, but as living material.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-12 md:mt-0">
                <div className="w-48 h-48 md:w-64 md:h-64 border border-[#D6D4A1]/20 rounded-full flex items-center justify-center relative animate-[pulse_8s_infinite]">
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

            <button 
              onClick={() => setActiveWorkshop(true)}
              className="w-full text-left border border-[#D6D4A1]/20 p-6 md:p-10 bg-[#D6D4A1]/[0.03] group transition-all hover:border-[#D6D4A1]/60 hover:bg-[#D6D4A1]/[0.05] cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-5 h-full flex items-center overflow-hidden">
                <img 
  src="/springposter.jpeg" 
  alt="Spring Poster"
  width={500}   // Add this
  height={750}  // Add this
/>
                </div>
                <div className="md:col-span-7 space-y-6 mt-6 md:mt-0">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 border border-[#D6D4A1]/40 text-[9px] uppercase tracking-widest rounded-full">Active Cycle: Spring 2026</span>
                  </div>
                  <h4 className="text-2xl md:text-4xl font-serif italic group-hover:text-white transition-colors">
                    Transforming Anger / The Inner Child &apos; s Voice
                  </h4>
                  <div className="space-y-2 font-serif text-xl opacity-90">
                    <p className="tracking-wide">RAINBOW CENTER</p>
                    <p className="text-sm opacity-60 uppercase tracking-widest">19 Rue du Saint Esprit, 1475 Luxembourg</p>
                    <p className="text-base pt-4 opacity-80 underline underline-offset-4 decoration-[#D6D4A1]/30">May 23rd, 2026 — 15h00</p>
                  </div>
                  <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">
                    &quot;A space where anger is expressed, torn apart, and artistically recomposed - transforming emotional rupture into creative renewal.&quot;
                  </p>
                  <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">Facilitated by: Anna Rexha</p>
                  <p className="text-lg opacity-80 leading-relaxed font-serif italic max-w-xl">Created by: Shulin Xia</p>
                  <div className="pt-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] border-b border-[#D6D4A1]/30 pb-2 group-hover:border-[#D6D4A1] transition-all">Click to explore the process →</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>
        {/* DAMP MEMORIES FOREST - ACTIVE DIGITAL PROJECT */}
<section className="py-12 px-6 md:px-14 border-t border-[#D6D4A1]/10 bg-[#0a0f0a]/40 relative overflow-hidden group cursor-pointer">
  {/* 1. Ambient Background Mist Effect */}
  <div className="absolute inset-0 pointer-events-none opacity-50 animate-mist bg-gradient-to-r from-transparent via-[#D6D4A1]/5 to-transparent blur-3xl" />
  
  {/* 2. Hover Border */}
  <div className="absolute inset-1.5 border border-[#D6D4A1]/0 group-hover:border-[#D6D4A1]/20 transition-all duration-500 z-0" />

  {/* 3. Main Container */}
  <div className="max-w-4xl mx-auto relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Left: Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1] mb-8">Active Digital Project</h2>
          <h3 className="text-3xl md:text-6xl font-serif mb-6 italic leading-tight">Damp Memories <br/>Forest</h3>
          <p className="text-xl font-serif opacity-80 leading-relaxed italic border-l border-[#D6D4A1]/20 pl-4 md:pl-8">
          &quot;Write something that never dried.&quot;
          </p>
        </div>

        <div className="space-y-6 text-lg opacity-90 font-serif leading-relaxed">
          <p>
            A participatory digital ecosystem transforming diary-writing into an evolving visual forest. 
            Focusing on the notion of <span className="italic">dampness</span>—memories that resist resolution and emotions that linger like internal weather.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {['Wet Zone (blur & overlap)', 'Open Field (growth & visibility)', 'Shadow Area (concealment)'].map((zone) => (
              <div key={zone} className="flex items-center gap-4 text-[11px] md:text-[10px] uppercase tracking-widest opacity-60">
                <span className="w-8 h-px bg-[#D6D4A1]/40"></span> {zone}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setActiveMember({
            name: `Damp Memories Forest`,
            pronouns: `Active Digital Project`,
            title: `Participatory Ecosystem`,
            role: `Research & Practice`,
            bio: `Damp Memories Forest is a digital art project that transforms diary-writing into a shared visual ecosystem...`,
            projects: [
              { title: `Methodology`, desc: `A shared digital whiteboard...` },
              { title: `Participation`, desc: `Up to 15 participants...` },
              { title: `The Link`, desc: `Coming Soon...` }
            ],
            insta: "cvrcle.collective",
            img: "damp-forest-sketch.png"
          })}
          className="text-[10px] uppercase tracking-[0.5em] border border-[#D6D4A1]/20 px-4 md:px-8 py-4 hover:bg-[#D6D4A1] hover:text-black transition-all duration-700"
        >
          Explore Project Details →
        </button>
      </div> {/* Closes Left Content */}

      {/* Right: The Concept Sketch Display */}
      <div className="relative group flex justify-center items-center mt-12 md:mt-0">
        <div className="relative w-full max-w-[280px] md:max-w-[320px]">
          <div className="absolute -inset-1.5 border border-[#D6D4A1]/10 rounded-sm group-hover:border-[#D6D4A1]/30 transition-all duration-1000"></div>
          <div className="h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 opacity-80 group-hover:opacity-100 shadow-2xl">
            <img 
              src="/damp-forest-sketch.png" 
              alt="Damp Memories Forest Concept Sketch" 
              className="w-full h-full object-contain transform scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
          </div>
          {/* Floating Label */}
          <div className="absolute bottom-7 left-2 md:-left-5 bg-black/90 backdrop-blur-md border border-[#D6D4A1]/20 p-3 max-w-[160px] z-20">
  <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed opacity-80 font-sans">
              Status: Pilot Stage <br/>
              Format: Asynchronous Whiteboard <br/>
              Phase: 2026 Collective Archive
            </p>
          </div>
        </div>
      </div> {/* Closes Right Column */}

    </div> {/* Closes Grid */}
  </div> {/* Closes Max-Width Container */}
</section>
       
        {/* JOURNAL & PRESS MENTIONS */}
        <section className="py-10 px-6 md:px-14 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-12 md:mb-24">Journal & Press Mentions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-6xl">
            <div className="bg-white/[0.02] p-6 md:p-12 border border-white/5 flex flex-col justify-center">
              <h4 className="text-[10px] uppercase tracking-widest mb-12 opacity-95 italic font-light">Featured Reflections</h4>
              <div className="space-y-16">
                <p className="text-xl md:text-3xl font-serif italic opacity-95 hover:opacity-100 transition-opacity leading-relaxed">
                  &quot;As an artistic collective, we understand role models as bearers of stories that should be made visible, shared, and archived.&quot;
                </p>
                <p className="text-xl md:text-3xl font-serif italic opacity-95 hover:opacity-100 transition-opacity leading-relaxed">
                Describing the trophies on behalf of CVRCLE, president and artistic director of the collective Anna Rexha said, &quot;Each trophy combines a solid structure with a textile component...&quot;.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-12">
               <div className="space-y-2">
                 <p className="text-[9px] uppercase tracking-[0.4em] opacity-90 mb-6">As seen in</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                   {pressMentions.map((press, i) => (
                     <a 
                       key={i} 
                       href={press.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="group border-l border-white/10 pl-4 md:pl-6 py-2 hover:border-[#D6D4A1] transition-all relative z-[70] block"
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
        <section id="members" className="py-10 px-6 md:px-14 border-t border-white/5">
          <h2 className="text-[10px] md:text-[9px] uppercase tracking-[0.6em] opacity-95 mb-16 md:mb-32">The Collective</h2>
          <div className="space-y-24 md:space-y-48">
          {members.map((artist) => (
            <div key={artist.name} className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start py-12 border-b border-white/5 last:border-0">
              <div className="md:col-span-4 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-70 group-hover:opacity-100 aspect-[3/4] bg-zinc-900">
                 <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-8 space-y-6 mt-8 md:mt-0">
              <button 
  onClick={() => setActiveMember(artist)}
  className="text-left group/name"
>
  <h3 className="text-2xl md:text-5xl font-serif font-extralight tracking-tighter group-hover/name:text-white transition-colors flex items-baseline gap-4">
    {artist.name}
    <span className="text-lg md:text-3xl opacity-50 font-serif italic lowercase tracking-normal">
      {artist.pronouns}
    </span>
  </h3>
</button>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{artist.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-95 italic">{artist.role}</p>
                </div>
                <p className="max-w-xl text-base md:text-xl py-6 leading-relaxed opacity-90 font-serif italic border-y border-white/5">{artist.bio}</p>
                <div className="flex flex-wrap gap-6 items-center pt-6">
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
        <section className="py-20 px-6 md:px-14 border-t border-white/5 bg-white/[0.01]">
          <h2 className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.6em] opacity-95 mb-12 md:mb-24">Past Projects</h2>
          <div className="space-y-12">
            <div className="group border border-white/10 p-5 md:p-12 hover:border-[#D6D4A1]/30 transition-all duration-700 bg-zinc-900/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 border border-white/20 text-[9px] uppercase tracking-widest rounded-full opacity-90">Completed Jan 2026</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-[#003399] flex items-center justify-center rounded-[1px]">
                      <span className="text-[6px] text-[#FFCC00]">★</span>
                    </div>
                    <span className="text-[10px] md:text-[8px] uppercase tracking-widest opacity-95">Co-funded by the EU EPBN</span>
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
        <section className="py-10 px-6 md:px-14 border-t border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-95 mb-12 md:mb-24">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 md:p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-95 mb-2">May 2026</p>
                <h5 className="text-2xl font-serif mb-4 underline underline-offset-8">Space & Identity</h5>
                <p className="text-sm opacity-90 font-serif italic leading-relaxed">
                  New installation series exploring the &quot;Black Sheep&quot; in urban environments.
                </p>
             </div>
             <div className="p-6 md:p-8 border border-white/10 hover:bg-[#D6D4A1]/[0.02] transition-colors">
                <p className="text-[9px] uppercase tracking-widest opacity-95 mb-2">Summer 2026</p>
                <h5 className="text-2xl font-serif mb-4 underline underline-offset-8">Collective Sanctuary</h5>
                <p className="text-sm opacity-90 font-serif italic leading-relaxed">Residency series focused on textile art and cross-border storytelling.</p>
             </div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="py-12 px-6 md:px-24 text-[10px] uppercase tracking-[0.5em] opacity-90 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10">
          <span>CVRCLE — 2026</span>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/cvrcle_collective/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition z-[70] relative">Instagram</a>
            <a href="direction-cvrcle.collective@hotmail.com" className="hover:text-white transition z-[70] relative">Contact</a>
          </div>
        </footer>
      </div>

      {/* --- 7. OVERLAY: STORYTELLING & LISTS --- */}
{activeFragment && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    {/* Background Overlay */}
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      onClick={() => activeProject ? setActiveProject(null) : setActiveFragment(null)}
    ></div>

    {/* Modal Container */}
    <div className="relative bg-[#080808] border border-white/10 w-full max-w-5xl p-5 md:p-16 overflow-y-auto max-h-[90vh] custom-scroll">
    
      {/* Header Section: Title & Back Button */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 md:mb-12">
        <h3 className="text-3xl md:text-6xl font-serif italic text-[#fef9c3]">

        {activeProject ? (activeProject as any).title : (fragmentData as any)?.title}
</h3>
        
        <button 
          onClick={() => activeProject ? setActiveProject(null) : setActiveFragment(null)} 
          className="text-[10px] uppercase tracking-widest opacity-95 hover:opacity-100"
        >
          [ {activeProject ? 'back to list' : 'close'} ]
        </button>
      </div>

      {/* Intro text (Hides when a story is open) */}
      {!activeProject && (
        <p className="text-lg md:text-xl mb-8 md:mb-12 opacity-80 font-serif leading-relaxed italic max-w-2xl">
          {fragmentData?.text || ''}
        </p>
        
      )}

      {/* Main Content Area */}
{activeProject ? (
  /* Inside the Story/Project */
  <div className="animate-fade-in py-6 md:py-10">
    {/* This container handles the Left (Text) and Right (Image) layout */}
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      
      {/* LEFT SIDE: The Story Text */}
      <div className="flex-[1.5] text-lg md:text-xl opacity-80 leading-relaxed font-serif">
        {activeProject.content}
      </div>

      {/* RIGHT SIDE: The Image(s) */}
      {activeProject.img && (
        <div className="flex-1 w-full mt-8 md:mt-0">
          <img
            src={activeProject.img} 
            alt={activeProject.title} 
            className="w-full h-auto object-cover" 
          />
        </div>
      )}

    </div>
  </div>
) : (
  /* ... rest of your list logic ... */

        /* The List of Stories/Projects */
        fragmentContent[activeFragment].list && (
          <div className="space-y-4 md:space-y-6 border-t border-white/10 pt-6 md:pt-8">
            {fragmentContent[activeFragment].list.map((poem, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(poem)}
                className="block w-full text-left hover:text-[#D6D4A1] transition-all italic font-serif text-2xl group"
              >
                <span className="opacity-40 group-hover:opacity-100 mr-4 transition-opacity">—</span>
                {poem.title}
              </button>
            ))}
          </div>
        )
      )}
    </div>
  </div>
)}

      {/* WORKSHOP MODAL */}
      {activeWorkshop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto bg-black/95 backdrop-blur-xl">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveWorkshop(false)}></div>
          <div className="relative bg-[#080808] border border-[#D6D4A1]/20 w-full max-w-6xl p-6 md:p-20 overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10 md:mb-16 border-b border-white/5 pb-8 md:pb-10">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1]">Workshop Proposal — Spring 2026</p>
                <h3 className="text-3xl md:text-6xl font-serif italic tracking-tight">Transforming Anger</h3>
                <p className="text-base md:text-lg font-serif opacity-60">CVRCLE x RAINBOW CENTER | Luxembourg</p>
              </div>
              <button onClick={() => setActiveWorkshop(false)} className="text-[10px] uppercase tracking-[0.5em] border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">[ Close ]</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div className="space-y-8 lg:space-y-16">
                <div className="space-y-6">
                  <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">The Methodology</h5>
                  <p className="opacity-70 font-serif text-base lg:text-lg leading-relaxed">
                    Rather than denying anger, we treat it as a signal, a memory, and a source of creative energy. A participatory experiment on &quot;unfinished actions.&quot;
                  </p>
                </div>
                {/* PROMPTS SECTION */}
<div className="mb-10 lg:mb-20">
  <div className="flex items-center gap-4 mb-8">
    <div className="w-1 h-6 bg-[#D6D4A1]" />
    <h4 className="text-xs tracking-[0.3em] uppercase opacity-60">The Prompts</h4>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 italic text-base lg:text-lg font-light opacity-90 pl-4 lg:pl-6">
    <div>&apos;I was told to stop being...”</div>
    <div>&apos;No one listened when...&apos;</div>
    <div>&apos;It felt unfair that...&apos;</div>
    <div>&apos;I swallowed my anger when...&apos;</div>
    <div>&apos;I wish I had shouted...&apos;</div>
    <div>&apos;I wasn&apos;t allowed to...&apos;</div>
    <div>&apos;It made me angry when...&apos;</div>
    <div>&apos;I wanted to break...&apos;</div>
  </div>
</div>
{/* THE PROCESS SECTION */}
<div className="space-y-10 my-10 md:my-16">
            <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">The Process</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pl-4">
              <div className="space-y-3">
                <span className="text-[#D6D4A1] text-[10px] uppercase tracking-widest opacity-80 font-sans">I. Expression</span>
                <p className="opacity-80 text-sm leading-relaxed font-serif italic">Raw emotional release. Draw, paint, or write freely and without aesthetic judgment. About something that makes one deeply angry, even by simply thinking about it.</p>
              </div>
              <div className="space-y-3">
                <span className="text-[#D6D4A1] text-[10px] uppercase tracking-widest opacity-80 font-sans">II. Destruction</span>
                <p className="opacity-80 text-sm leading-relaxed font-serif italic">Tear the paper apart. Physically enact rupture, rejection, or release. This gesture symbolizes: breaking with what hurts, acknowledging emotional intensity, and allowing movement instead of suppression.</p>
              </div>
              <div className="space-y-3">
                <span className="text-[#D6D4A1] text-[10px] uppercase tracking-widest opacity-80 font-sans">III. Recomposition</span>
                <p className="opacity-90 text-sm leading-relaxed font-serif italic">New blank sheet. Using the torn fragments, glue the pieces in a new composition, reshape the narrative of the anger,imagine another possible outcome,
transform the emotion into release, distance, or meaning.
The final piece becomes a visual trace of transformation rather than destruction.
</p>
              </div>
            </div>
          </div>
                <div className="space-y-8 md:space-y-10">
                  <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">Sensory Stations</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Sound: Childhood ambient triggers', 'Touch: Sandpaper & Ice cubes', 'Smell: Alcohol & Incense ash', 'Movement: Forceful repetition'].map(item => (
                      <div key={item} className="p-6 bg-white/[0.03] border border-white/5 font-serif italic text-lg opacity-85">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-10 lg:space-y-16">
                <div className="space-y-8">
                  <h5 className="text-[11px] uppercase tracking-[0.4em] border-l-2 border-[#D6D4A1] pl-4">Acts of Alteration</h5>
                  <ul className="space-y-4 lg:space-y-6 text-base lg:text-lg font-serif italic opacity-90">
                    <li className="flex items-start gap-3 lg:gap-4"><span>—</span> <span>Correction fluid: To cover, to create opacity.</span></li>
                    <li className="flex items-start gap-3 lg:gap-4"><span>—</span> <span>Tear it open: Physically enacting rupture.</span></li>
                    <li className="flex items-start gap-3 lg:gap-4"><span>—</span> <span>Fingernail scratching: Bringing the body to the surface.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ARTIST PROFILE MODAL */}
      {activeMember && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="absolute inset-0" onClick={() => setActiveMember(null)}></div>
          <div className="relative bg-[#080808] border border-[#D6D4A1]/10 w-full max-w-6xl overflow-y-auto max-h-[90vh]">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 h-[300px] md:h-full bg-zinc-900">
              <img src={activeMember.img} alt={activeMember.name} className="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div className="md:col-span-7 p-6 md:p-16 space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="space-y-4">
                    <h4 className="text-4xl md:text-8xl font-serif italic">{activeMember.name}</h4>
                    <p className="text-[10px] uppercase tracking-[0.6em] text-[#D6D4A1]">{activeMember.title}</p>
                  </div>
                  <button onClick={() => setActiveMember(null)} className="text-[10px] uppercase tracking-[0.5em]">[ Close ]</button>
                </div>
                <div className="space-y-6">
                   <h5 className="text-[11px] uppercase tracking-[0.4em] opacity-70 border-b border-white/5 pb-2">Full Biography</h5>
                   <p className="text-lg md:text-xl font-serif leading-relaxed italic opacity-90">
  {activeMember.bio}
</p>
                </div>
                <div className="space-y-8">
                   <h5 className="text-[11px] uppercase tracking-[0.4em] opacity-70 border-b border-white/5 pb-2">Artist Projects</h5>
                   <div className="space-y-6 md:space-y-8">
                     {activeMember.projects.map((p: any) => (
                       <div key={p.title} className="space-y-2">
                          <p className="text-xl md:text-2xl font-serif underline decoration-[#D6D4A1]/20">{p.title}</p>
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
          {/* THE BUTTERFLY EFFECT */}
{activePoem?.effect === "butterflies" && (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-[150]">
    {[...Array(isMobile ? 8 : 15)].map((_, i) => (
      <div 
        key={i}
        className="butterfly-particle flex items-center justify-center scale-[0.7] md:scale-100"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${10 + Math.random() * 5}s`,
        }}
      >
        <span style={{ transform: `scale(${0.5 + Math.random()})` }}>🦋</span>
      </div>
    ))}
  </div>
)}

      {/* THE POEM DISPLAY WINDOW */}
      {activePoem && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="max-w-2xl text-center space-y-8 animate-fade-in">
          <img src={activePoem.img} alt="Poem Illustration"
              className="max-h-[40vh] md:max-h-[50vh] mx-auto border border-[#D6D4A1]/20 shadow-2xl" 
            />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#D6D4A1]">{activePoem.title}</h2>
              
              {/* AUTHOR & DATE SECTION */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.3em] opacity-70">By Anna Rexha</p>
                {activePoem.date && (
                  <p className="text-[10px] font-serif italic opacity-60">{activePoem.date}</p>
                )}
              </div>

              <p className="text-xl md:text-2xl font-serif italic opacity-90">{activePoem.content}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">{activePoem.collection}</p>
            </div>
            <button 
              onClick={() => setActivePoem(null)} 
              className="uppercase tracking-[0.5em] text-[10px] border border-[#D6D4A1]/20 px-6 py-3 hover:bg-[#D6D4A1] hover:text-black transition-all"
            >
              Close Fragment
              </button>
              </div>
              </div>
        )}
      </main>
    </>
  );
}