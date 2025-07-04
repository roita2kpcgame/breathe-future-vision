
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { SmartSearchBar } from './SmartSearchBar';

export const Hero = () => {
  const scrollToMap = () => {
    document.getElementById('pollution-map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Animated Logo */}
      <div className="mb-8">
        <AnimatedLogo />
      </div>

      <div className="text-center max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-[#263238] mb-6 leading-tight">
          Breathe the
          <span className="bg-gradient-to-r from-[#00C853] to-[#FF6F00] bg-clip-text text-transparent">
            {" "}Future
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#263238]/80 mb-8 max-w-4xl mx-auto leading-relaxed">
          AI-powered air pollution monitoring from space using satellite data, 
          machine learning, and real-time predictions to protect public health
        </p>
      </div>

      {/* Smart Search Bar */}
      <div className="w-full mb-12">
        <SmartSearchBar />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
        <Button 
          onClick={scrollToMap}
          className="bg-[#00C853] hover:bg-[#00C853]/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Explore Live Data
        </Button>
        <Button 
          variant="outline"
          className="border-[#263238] text-[#263238] hover:bg-[#263238] hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
        >
          View AI Predictions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
          <div className="text-3xl font-bold text-[#00C853] mb-2">150+</div>
          <div className="text-[#263238]">CPCB Stations</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
          <div className="text-3xl font-bold text-[#FF6F00] mb-2">99.2%</div>
          <div className="text-[#263238]">AI Accuracy</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105">
          <div className="text-3xl font-bold text-[#00C853] mb-2">24/7</div>
          <div className="text-[#263238]">Real-time Monitoring</div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-[#263238] w-8 h-8 cursor-pointer" onClick={scrollToMap} />
      </div>
    </section>
  );
};
