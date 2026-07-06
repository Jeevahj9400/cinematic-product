"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  "Spatial Computing",
  "Eye Tracking",
  "Hand Tracking",
  "Gesture Navigation",
  "Immersive Workspace",
  "Entertainment"
];

export default function ExperienceUI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !listRef.current) return;
    
    const items = listRef.current.querySelectorAll(".exp-item");
    const title = containerRef.current.querySelector(".exp-title");
    
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
      animation: gsap.timeline()
        .fromTo(title, 
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(items, 
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        )
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none flex flex-col justify-center items-start pl-8 md:pl-24">
      <div className="max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-24">
        
        <div className="exp-title flex-shrink-0">
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/50 uppercase block mb-4">The Experience</span>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
            Beyond<br/>Reality.
          </h2>
        </div>
        
        <div ref={listRef} className="flex flex-col gap-4 md:gap-6 border-l border-white/10 pl-8 md:pl-12">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item group cursor-default">
              <h3 className="text-2xl md:text-4xl font-light text-white/40 group-hover:text-white transition-colors duration-500">
                {exp}
              </h3>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
