"use client";

import Loader from '@/components/dom/Loader';
import SceneWrapper from '@/components/canvas/SceneWrapper';
import HeroUI from '@/components/dom/HeroUI';
import FeatureCard from '@/components/dom/FeatureCard';
import Navbar from '@/components/dom/Navbar';

export default function Home() {
  return (
    <main className="relative w-full bg-[#030305] text-white font-sans">
      <Loader />
      <Navbar />
      <SceneWrapper />
      
      <div className="relative w-full z-10 pointer-events-none">
        
        {/* EXISTING HERO (Untouched) */}
        <section id="overview" className="relative h-[120vh] w-full">
          <HeroUI />
        </section>

        {/* 1. Features */}
        <section id="features" className="relative h-[100vh] w-full">
          <FeatureCard 
            badge="01 / 06"
            title="Micro OLED Display" 
            description="Dual ultra-high-resolution displays delivering unmatched clarity."
            points={[
              {
                title: "Micro OLED",
                desc: "Unmatched clarity and precision engineering."
              }
            ]}
            align="right"
          />
        </section>

        {/* 2. Tech Specs */}
        <section id="tech-specs" className="relative h-[100vh] w-full">
          <FeatureCard 
            badge="02 / 06"
            title="Technical Specifications" 
            description="Resolution 23 Million Pixels, Refresh Rate 90Hz, Weight 600g."
            points={[
              {
                title: "Specs Overview",
                desc: "Micro OLED, 120° FOV, Glass, Aluminum, Fabric."
              }
            ]}
            align="left"
          />
        </section>

        {/* 3. Experience */}
        <section id="experience" className="relative h-[100vh] w-full">
          <FeatureCard 
            badge="03 / 06"
            title="Spatial Computing" 
            description="Eye Tracking, Hand Tracking, Gesture Navigation."
            points={[
              {
                title: "Immersive Interaction",
                desc: "Immersive Workspace and Entertainment."
              }
            ]}
            align="right"
          />
        </section>

        {/* 4. Comfort */}
        <section id="comfort" className="relative h-[100vh] w-full">
          <FeatureCard 
            badge="04 / 06"
            title="Comfort" 
            description="Premium fabric and weight distribution."
            points={[
              {
                title: "Personalized Fit",
                desc: "Padding, Fit, Breathability."
              }
            ]}
            align="left"
          />
        </section>

        {/* 5. Spatial Audio */}
        <section id="audio" className="relative h-[100vh] w-full">
          <FeatureCard 
            badge="05 / 06"
            title="Spatial Audio" 
            description="Beamforming microphones and noise reduction."
            points={[
              {
                title: "Immersive Sound",
                desc: "Crystal clear Spatial Audio."
              }
            ]}
            align="right"
          />
        </section>

        {/* 6. Pre-order */}
        <section id="pre-order" className="relative h-[100vh] w-full flex items-center justify-center">
          <div className="pointer-events-auto">
            <FeatureCard 
              badge="06 / 06"
              title="Ready to step inside?" 
              description="Pre-order your Aether One today and redefine your reality."
              align="center"
            />
          </div>
        </section>
        
      </div>
    </main>
  );
}
