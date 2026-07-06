"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export default function LightSweep() {
  const lightRef = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      // Start the light far left
      lightRef.current.position.set(-5, 2, 2);
      
      // Sweep across the model on load after a slight delay
      gsap.to(lightRef.current.position, {
        x: 5,
        duration: 3,
        delay: 1.5,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <spotLight
      ref={lightRef}
      intensity={15} // High intensity for the premium cinematic sweep
      penumbra={0.2}
      angle={Math.PI / 6}
      color="#ffffff"
      castShadow
      distance={20}
    />
  );
}
