"use client";

export default function EnvironmentEffects() {
  return (
    <group>
      {/* Highly performant, subtle dark floor */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#020202" 
          metalness={0.9} 
          roughness={0.8} 
          envMapIntensity={0.2}
        />
      </mesh>

      {/* Cinematic Planet Edge Background - Soft and Performant */}
      <mesh position={[6, 4, -15]} rotation={[-Math.PI / 4, -Math.PI / 6, 0]}>
        <torusGeometry args={[18, 0.05, 16, 64]} />
        <meshBasicMaterial color={[1.1, 1.1, 1.2]} transparent opacity={0.15} fog={false} />
      </mesh>
    </group>
  );
}
