"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureSplitUI({ 
  number, 
  title, 
  featureName, 
  description,
  align = "left"
}: { 
  number: string, 
  title: string, 
  featureName: string, 
  description: string,
  align?: "left" | "right"
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    const elements = contentRef.current.querySelectorAll(".split-animate");
    
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
      animation: gsap.fromTo(elements, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      )
    });

    return () => st.kill();
  }, []);

  const alignmentClass = align === "left" ? "justify-start pl-8 md:pl-24" : "justify-end pr-8 md:pr-24";

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none flex items-center ${alignmentClass}`}>
      <div ref={contentRef} className="max-w-md w-full pointer-events-auto flex flex-col justify-center">
        
        <div className="split-animate mb-6">
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/50 uppercase">{title}</span>
        </div>

        <div className="split-animate flex items-center gap-4 mb-4">
          <span className="text-4xl font-light text-white/20 tabular-nums">{number}</span>
          <div className="h-[1px] w-12 bg-white/20"></div>
          <span className="text-sm font-mono text-white/40">06</span>
        </div>
        
        <h2 className="split-animate text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
          {featureName}
        </h2>
        
        <p className="split-animate text-white/60 text-[15px] leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
