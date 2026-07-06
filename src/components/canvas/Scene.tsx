"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Suspense } from "react";
import CameraRig from "./CameraRig";
import ProductModel from "./ProductModel";
import DustParticles from "./DustParticles";
import EnvironmentEffects from "./EnvironmentEffects";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030305]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 28 }}
        gl={{ 
          antialias: false, // We use postprocessing, so native AA is disabled for performance
          alpha: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0 // Balanced exposure, no blown highlights
        }}
        dpr={[1, 1.5]} // Capped DPR for massive performance gain on retina displays
      >
        <color attach="background" args={["#030305"]} />
        <fog attach="fog" args={["#030305", 2, 10]} />
        
        <Suspense fallback={null}>
          {/* Subtle ambient occlusion reflection */}
          <Environment preset="city" environmentIntensity={0.15} />
          
          {/* Cinematic Studio Lighting Rig - Soft and Natural */}
          <ambientLight intensity={0.1} color="#ffffff" />
          
          {/* Soft Key Light */}
          <rectAreaLight 
            name="keyLight"
            width={5} height={5} 
            color="#ffffff" intensity={0.6} 
            position={[-3, 2, 3]} 
            lookAt={[0, 0, 0]} 
          />
          
          {/* Soft Rim Light */}
          <spotLight 
            name="rimLight"
            position={[4, 3, -4]} 
            intensity={1.5} 
            angle={0.6} 
            penumbra={0.5} 
            color="#aaccff" 
            castShadow 
            shadow-bias={-0.0001}
            shadow-mapSize={[512, 512]} // Optimized shadow map
          />
          
          {/* Gentle Top Light */}
          <directionalLight 
            position={[0, 4, 0]} 
            intensity={0.2} 
            color="#ffffff" 
          />

          {/* Particles */}
          <DustParticles />

          {/* Environment Effects */}
          <EnvironmentEffects />

          {/* Production Product Model */}
          <ProductModel />
          
          {/* GSAP Camera Choreography */}
          <CameraRig />

          <Preload all />
          
          {/* Post Processing Pipeline - Optimized */}
          <EffectComposer multisampling={0}>
            {/* Very subtle bloom, no strong glare */}
            <Bloom 
              luminanceThreshold={0.8} 
              mipmapBlur 
              intensity={0.05} 
            />
            {/* Removed Chromatic Aberration as requested */}
            <Noise opacity={0.01} />
            <Vignette eskil={false} offset={0.15} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
