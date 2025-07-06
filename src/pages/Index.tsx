
import React from 'react';
import { Hero } from '@/components/Hero';
import { PollutionMap } from '@/components/PollutionMap';
import { EnhancedDataDashboard } from '@/components/EnhancedDataDashboard';
import { AIForecasting } from '@/components/AIForecasting';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ParticleBackground } from '@/components/ParticleBackground';
import { AIAssistant } from '@/components/AIAssistant';
import { Earth3D } from '@/components/Earth3D';
import { UniqueTools } from '@/components/UniqueTools';
import { VayuRakshak2030 } from '@/components/VayuRakshak2030';
import { TechArchitecture } from '@/components/TechArchitecture';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B0BEC5] to-[#263238] relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Hero />
        
        {/* Enhanced 3D Earth Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <Earth3D />
          </div>
        </section>
        
        <PollutionMap />
        
        {/* VayuRakshak 2030 Vision Section */}
        <VayuRakshak2030 />
        
        <EnhancedDataDashboard />
        
        {/* Technical Architecture */}
        <TechArchitecture />
        
        <AIForecasting />
        <UniqueTools />
        <FeatureGrid />
      </div>

      {/* AI Assistant - Floating */}
      <AIAssistant />
    </div>
  );
};

export default Index;
