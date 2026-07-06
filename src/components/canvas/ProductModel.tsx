"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function ProductModel() {
  const { scene } = useGLTF("/Occulas.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          const mat = child.material;
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
            
            const name = mat.name.toLowerCase();
            
            // VISOR OVERRIDE: Clean, deep glossy black with no fake reflections
            if (name.includes('glass') || name.includes('visor') || name.includes('lens')) {
              mat.color.setHex(0x050505); // Very dark gray/black
              mat.roughness = 0.05; // Smooth, but not a perfect mirror to avoid artifacting
              mat.metalness = 0.8;
              
              mat.envMapIntensity = 0.2; // Very subtle environment bounce
              
              if (mat instanceof THREE.MeshPhysicalMaterial) {
                mat.clearcoat = 1.0;
                mat.clearcoatRoughness = 0.05;
              }
            } else {
              // Body materials
              mat.envMapIntensity = 0.4;
            }
            
            mat.needsUpdate = true;
          }
        }
      });

      // Normalization
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Standardizes size so it fits perfectly in the 45-55% viewport setup
      scene.scale.setScalar(scale);

      const scaledBox = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      scaledBox.getCenter(center);
      scene.position.sub(center); // perfectly center the model natively
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Majestic, incredibly heavy breathing motion
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.015;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.005;
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.005;
    }
  });

  return (
    // We add a wrapper group so GSAP can move the camera without fighting the model
    <group>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload("/Occulas.glb");
