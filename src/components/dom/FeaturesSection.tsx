"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    number: "01",
    badge: "Front Glass",
    title: "Optical Glass Panel",
    description: "A single piece of three-dimensionally formed laminated glass acts as the optical surface for all front-facing cameras and sensors. Polished to near-zero distortion.",
    spec1: "Anti-reflective coating reduces glare to under 0.2%",
    spec2: "Curved geometry provides 178° unobstructed sensor field of view",
  },
  {
    number: "02",
    badge: "Micro-OLED",
    title: "Micro-OLED Displays",
    description: "Custom dual 4K Micro-OLED panels deliver 23 million pixels in total — sharper than any consumer display available — for text and imagery that looks perfectly printed in space.",
    spec1: "3400 PPI pixel density exceeds human visual acuity threshold",
    spec2: "100,000:1 native contrast ratio renders true cinema-grade black",
  },
  {
    number: "03",
    badge: "Eye Tracking",
    title: "High-Speed Eye Tracking",
    description: "An array of infrared cameras and illuminators projects invisible light patterns onto each eye. Neural processing identifies your point of regard within 12 milliseconds.",
    spec1: "Sub-12ms latency for near-zero perceptible input delay",
    spec2: "Foveated rendering concentrates GPU power exactly where you look",
  },
  {
    number: "04",
    badge: "Digital Crown",
    title: "Digital Crown & Controls",
    description: "A precision-machined stainless steel Digital Crown gives you physical control of immersion levels. Rotate to blend between environments. Press to instantly return to reality.",
    spec1: "Haptic feedback mimics physical clicks with sub-millisecond response",
    spec2: "Capacitive side button handles multitasking and passthrough control",
  },
  {
    number: "05",
    badge: "Headband",
    title: "Personalized Fit System",
    description: "A micro-adjustable fit dial and dual-loop knit band distribute weight precisely across the crown of your head. Designed for extended comfort sessions without pressure points.",
    spec1: "Micro-ratchet dial tunes tension to 0.1mm precision",
    spec2: "3D-knit mesh rear cushion breathes and flexes with natural movement",
  },
  {
    number: "06",
    badge: "Spatial Audio",
    title: "Spatial Audio Engine",
    description: "Dual-driver audio pods positioned near each ear project personalized acoustic space. The system models your unique ear geometry to place sound precisely in the world around you.",
    spec1: "Ray-traced acoustic engine maps real-world sound reflections in real time",
    spec2: "6-mic beamforming array isolates voice from ambient noise for clarity",
  },
];

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // One ScrollTrigger per feature step
    const triggers: ScrollTrigger[] = [];

    FEATURES.forEach((_, i) => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top+=${i * (window.innerHeight)} top`,
        end: `top+=${(i + 1) * (window.innerHeight)} top`,
        onEnter: () => activateFeature(i),
        onEnterBack: () => activateFeature(i),
        scroller: window,
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  const activateFeature = (index: number) => {
    if (prevIndexRef.current === index) return;
    prevIndexRef.current = index;
    setActiveIndex(index);

    // Dispatch camera event for CameraRig to pick up
    window.dispatchEvent(new CustomEvent("featurechange", { detail: { index } }));

    // Animate text out then in
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.querySelectorAll(".feat-animate"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    }
  };

  const feature = FEATURES[activeIndex];

  return (
    // Tall section: 6 panels × 100vh = 600vh
    <div ref={sectionRef} className="relative w-full pointer-events-none" style={{ height: `${FEATURES.length * 100}vh` }}>

      {/* STICKY CONTENT PANEL */}
      <div className="sticky top-0 h-screen w-full flex items-center pointer-events-auto overflow-hidden">

        {/* LEFT: Text Content */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[45%] flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 pr-6 z-20">
          <div ref={textRef} className="max-w-md">

            {/* Section Label */}
            <div className="feat-animate mb-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Features</span>
            </div>

            {/* Progress Counter */}
            <div className="feat-animate flex items-center gap-3 mb-6">
              <span className="text-5xl font-light tabular-nums text-white/20 leading-none">
                {feature.number}
              </span>
              <div className="flex flex-col gap-1.5">
                {FEATURES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-white"
                        : i < activeIndex
                        ? "w-4 bg-white/30"
                        : "w-4 bg-white/15"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-white/30 ml-1">/ {FEATURES.length.toString().padStart(2, "0")}</span>
            </div>

            {/* Badge */}
            <div className="feat-animate inline-block px-3 py-1 rounded-full bg-white/8 border border-white/15 text-[10px] font-mono tracking-widest text-white/60 mb-4 uppercase">
              {feature.badge}
            </div>

            {/* Title */}
            <div className="overflow-hidden mb-4">
              <h2 className="feat-animate text-4xl md:text-5xl font-medium tracking-tight leading-tight text-white">
                {feature.title}
              </h2>
            </div>

            {/* Description */}
            <p className="feat-animate text-white/55 text-[15px] leading-relaxed mb-8 font-light">
              {feature.description}
            </p>

            {/* Spec Points */}
            <div className="feat-animate flex flex-col gap-3 mb-8 pl-0">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                <p className="text-white/60 text-[13px] font-light leading-snug">{feature.spec1}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                <p className="text-white/60 text-[13px] font-light leading-snug">{feature.spec2}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="feat-animate">
              <button className="group flex items-center gap-3 text-[12px] font-medium text-white/70 hover:text-white transition-colors duration-300">
                <span>Learn more</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* VERTICAL DOTS INDICATOR (right edge) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {FEATURES.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                if (!sectionRef.current) return;
                const top = sectionRef.current.offsetTop + i * window.innerHeight;
                window.scrollTo({ top, behavior: "smooth" });
              }}
              className="group flex items-center gap-2"
              aria-label={`Jump to feature ${f.number}`}
            >
              <span className={`text-[9px] font-mono transition-all duration-300 ${i === activeIndex ? "text-white/50 opacity-100" : "opacity-0 text-white/0"}`}>
                {f.number}
              </span>
              <div
                className={`rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-1.5 h-5 bg-white"
                    : "w-1 h-1 bg-white/25 hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
