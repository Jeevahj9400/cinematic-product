"use client";

import { useEffect, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CameraRig() {
  const { camera } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Pure decoupled proxy for sub-pixel smooth rendering
  const proxy = useMemo(() => ({
    x: 0, y: 0.05, z: 2.0,
    tx: 0, ty: 0, tz: 0 
  }), []);

  useEffect(() => {
    // Initial Setup
    proxy.x = 0; proxy.y = 0.05; proxy.z = 2.0;
    proxy.tx = 0; proxy.ty = 0; proxy.tz = 0;

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5, // Ultimate smoothness
      },
    });

    const ease = "power2.inOut";

    // The Ultimate Cinematic Orbit Sequence
    // Designed to feel like a high-end robotic motion control camera

    // 1 -> 2: Macro right side (Precision Engineering)
    timelineRef.current.to(proxy, { 
      x: 0.8, y: 0.1, z: 0.8, 
      tx: 0.2, ty: 0, tz: 0, 
      ease 
    });

    // 2 -> 3: Sweep close across the front visor (Display)
    timelineRef.current.to(proxy, { 
      x: -0.5, y: 0, z: 0.8, 
      tx: -0.1, ty: 0, tz: 0, 
      ease 
    });

    // 3 -> 4: Arc up to the top left (Materials)
    timelineRef.current.to(proxy, { 
      x: -0.6, y: 0.6, z: 0.6, 
      tx: 0, ty: 0.1, tz: 0, 
      ease 
    });

    // 4 -> 5: Sweep around to the back (360 Reveal)
    timelineRef.current.to(proxy, { 
      x: -1.0, y: 0.2, z: -1.0, 
      tx: 0, ty: 0, tz: 0, 
      ease 
    });

    // 5 -> 6: Macro rear strap (Comfort)
    timelineRef.current.to(proxy, { 
      x: 0, y: 0, z: -1.5, 
      tx: 0, ty: 0, tz: -0.3, 
      ease 
    });

    // 6 -> 7: Audio speakers (Spatial Audio) - The section from the screenshot
    timelineRef.current.to(proxy, { 
      x: 0.9, y: -0.1, z: -0.7, 
      tx: 0.2, ty: 0, tz: -0.2, 
      ease 
    });

    // 7 -> 8: Pull out to grand finale
    timelineRef.current.to(proxy, { 
      x: 0, y: 0.1, z: 2.2, 
      tx: 0, ty: 0, tz: 0, 
      ease 
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [proxy]);

  useFrame(() => {
    camera.position.set(proxy.x, proxy.y, proxy.z);
    camera.lookAt(proxy.tx, proxy.ty, proxy.tz);
  });

  return null;
}
