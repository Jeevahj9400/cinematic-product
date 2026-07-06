"use client";

import dynamic from "next/dynamic";

// Dynamically import the Scene strictly on the client
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneWrapper() {
  return <Scene />;
}
