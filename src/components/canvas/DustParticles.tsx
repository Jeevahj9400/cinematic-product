"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DustParticles({ count = 180 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Clustered strictly around the headset (radius 1.2 to 3.5)
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical distribution around origin (headset)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.2 + Math.random() * 2.3; // Clustered between 1.2 and 3.5 radius around headset

      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
      temp[i * 3 + 2] = r * Math.cos(phi); // z
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.elapsedTime;
      // Extremely slow, elegant floating drift around the headset
      pointsRef.current.rotation.y = t * 0.008;
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.015;
      pointsRef.current.position.y = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.016} 
        color="#e0e8ff" 
        transparent 
        opacity={0.22} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}
