"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SPECS = [
  { label: "Resolution", value: "23 Million Pixels" },
  { label: "Refresh Rate", value: "90Hz" },
  { label: "Display", value: "Micro OLED" },
  { label: "Field of View", value: "120°" },
  { label: "Weight", value: "600g" },
  { label: "Materials", value: "Glass, Aluminum, Fabric" },
  { label: "Battery", value: "External Battery" },
];

export default function TechSpecsUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll(".spec-card");
    const title = containerRef.current.querySelector(".spec-title");
    
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
      animation: gsap.timeline()
        .fromTo(title, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(cards, 
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.2)" },
          "-=0.6"
        )
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none flex flex-col justify-center items-start pl-8 md:pl-24">
      <div className="max-w-2xl w-full pointer-events-auto">
        <div className="spec-title mb-12">
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/50 uppercase block mb-4">Technical Specifications</span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Unprecedented Power.</h2>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {SPECS.map((spec, i) => (
            <div key={i} className="spec-card bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-center">
              <span className="text-[10px] text-white/40 uppercase tracking-wider mb-2 block">{spec.label}</span>
              <span className="text-sm md:text-base font-medium text-white/90">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
