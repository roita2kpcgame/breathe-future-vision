
import React from 'react';
import { Satellite, Globe, Zap } from 'lucide-react';

export const AnimatedLogo = () => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="relative">
        {/* Satellite with orbit animation */}
        <div className="relative w-12 h-12 animate-spin" style={{ animationDuration: '8s' }}>
          <Satellite className="w-6 h-6 text-[#00C853] absolute inset-0 m-auto transform group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 border-2 border-[#00C853]/30 rounded-full animate-pulse"></div>
        </div>
        
        {/* Signal waves */}
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-[#FF6F00] rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-[#FF6F00] rounded-full absolute top-0 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00C853] via-[#FF6F00] to-[#263238] bg-clip-text text-transparent animate-pulse">
          AakaashSetu
        </h1>
        <p className="text-xs text-[#263238]/70 font-medium tracking-wide">
          Sky Bridge • Air Quality Intelligence
        </p>
      </div>

      {/* Floating elements */}
      <div className="hidden md:flex space-x-2">
        <Globe className="w-4 h-4 text-[#00C853] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <Zap className="w-4 h-4 text-[#FF6F00] animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};
