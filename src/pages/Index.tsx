import React, { useState } from 'react';
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
import { CityComparison } from '@/components/CityComparison';
import { CitySelector } from '@/components/CitySelector';
import { usePollutionData } from '@/hooks/usePollutionData';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { cities } = usePollutionData();
  const [selectedCityName, setSelectedCityName] = useState(cities[0]?.name || 'Delhi');
  
  const selectedCity = cities.find(city => city.name === selectedCityName) || cities[0];

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
        
        {/* City Comparison Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 bg-background/95 backdrop-blur border-border/50 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Select a city to compare:
                </h3>
                <CitySelector 
                  cities={cities} 
                  onCityChange={setSelectedCityName}
                  selectedCity={selectedCityName}
                />
              </div>
            </Card>
            <CityComparison selectedCity={selectedCity} allCities={cities} />
          </div>
        </section>
        
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
