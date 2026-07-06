"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface FeaturePoint {
  title: string;
  desc: string;
}

export interface FeatureCardProps {
  badge?: string;
  title: string;
  description: string;
  points?: FeaturePoint[];
  align?: "left" | "right" | "center";
}

export default function FeatureCard({ 
  badge,
  title, 
  description, 
  points,
  align = "right" 
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const element = containerRef.current.parentElement;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3 // Becomes visible when 30% of the section is in view
      }
    );

    observer.observe(element);

    // Highly optimized mouse parallax using quickTo
    if (!cardRef.current) return;
    const card = cardRef.current;
    
    const xTo = gsap.quickTo(card, "x", { duration: 1, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "y", { duration: 1, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const alignmentClass = 
    align === "right" ? "justify-end pr-8 md:pr-24" : 
    align === "left" ? "justify-start pl-8 md:pl-24" : 
    "justify-center";

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none flex items-center ${alignmentClass}`}>
      <div 
        ref={cardRef}
        className={`max-w-md w-full pointer-events-auto relative group bg-black/50 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] transform hover:border-white/25 transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Subtle Glass Highlight Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {badge && (
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase font-mono tracking-widest text-white/70 mb-4 relative z-10">
            {badge}
          </div>
        )}

        <h2 className="text-3xl font-medium tracking-tight mb-3 text-white relative z-10 group-hover:text-white transition-colors">
          {title}
        </h2>
        <p className="text-white/60 leading-relaxed font-light text-sm relative z-10 group-hover:text-white/80 transition-colors">
          {description}
        </p>

        {/* 2 Key Feature Points */}
        {points && points.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3.5 relative z-10">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3.5 group/pt">
                <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-mono text-white/80 mt-0.5 group-hover/pt:bg-white group-hover/pt:text-black transition-all duration-300 flex-shrink-0">
                  0{idx + 1}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-white/90 block group-hover/pt:text-white transition-colors">
                    {pt.title}
                  </span>
                  <span className="text-[12px] font-light text-white/50 leading-snug block mt-0.5">
                    {pt.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
