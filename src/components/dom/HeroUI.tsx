"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroUI() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(
        ".mask-reveal",
        { yPercent: 100 },
        { yPercent: 0, duration: 1.4, stagger: 0.1, ease: "power4.out" }
      );

      tl.fromTo(
        ".fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      );

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "400px top",
          scrub: 1.5,
        },
        opacity: 0,
        y: -50,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToPreOrder = () => {
    const el = document.getElementById("pre-order");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end p-6 md:p-12 font-sans text-white pb-16 md:pb-24">
      
      {/* --- MIDDLE/BOTTOM HERO CONTENT --- */}
      <div className="flex items-center justify-between pointer-events-auto">
        
        {/* Left Column */}
        <div className="max-w-[32rem]">
          <div className="overflow-hidden mb-6">
             <div className="mask-reveal text-[10px] tracking-[0.3em] text-white/50 uppercase font-medium">Introducing</div>
          </div>
          
          <div className="overflow-hidden mb-2">
            <h1 className="mask-reveal text-6xl md:text-[6.5rem] font-medium leading-[1.05] tracking-[-0.04em]">
              Reality,
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="mask-reveal text-6xl md:text-[6.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white/80">
              Redefined.
            </h1>
          </div>
          
          <p className="fade-up text-white/50 text-[15px] leading-relaxed mb-12 max-w-[320px] font-light">
            A new era of spatial computing. Designed to blur the boundaries between the real and the unreal.
          </p>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={scrollToPreOrder}
              className="fade-up bg-white text-black px-8 py-4 rounded-full flex items-center gap-3 text-[12px] font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.97]"
            >
              Pre-order now
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
            <button 
              onClick={scrollToFeatures}
              className="fade-up flex items-center gap-4 text-[12px] font-medium text-white/80 hover:text-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/50 group-hover:scale-105 transition-all duration-300">
                <Play size={14} fill="currentColor" className="ml-1 opacity-80 group-hover:opacity-100" />
              </div>
              Watch the film
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
