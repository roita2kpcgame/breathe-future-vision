
import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { PollutionMap } from '@/components/PollutionMap';
import { DataDashboard } from '@/components/DataDashboard';
import { AIForecasting } from '@/components/AIForecasting';
import { FeatureGrid } from '@/components/FeatureGrid';
import { ParticleBackground } from '@/components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B0BEC5] to-[#263238] relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Hero />
        <PollutionMap />
        <DataDashboard />
        <AIForecasting />
        <FeatureGrid />
      </div>
    </div>
  );
};

export default Index;
