
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { SmartSearchBar } from './SmartSearchBar';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToMap = () => {
    document.getElementById('pollution-map')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Language Selector - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Animated Logo */}
      <div className="mb-6 sm:mb-8">
        <AnimatedLogo />
      </div>

      <div className="text-center max-w-6xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#263238] mb-4 sm:mb-6 leading-tight px-4">
          {t('tagline')}
          <span className="bg-gradient-to-r from-[#00C853] to-[#FF6F00] bg-clip-text text-transparent block sm:inline">
            {" "}{t('appName')}
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#263238]/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          {t('heroDescription')}
        </p>
      </div>

      {/* Smart Search Bar */}
      <div className="w-full mb-8 sm:mb-12 px-4">
        <SmartSearchBar />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
        <Button 
          onClick={scrollToMap}
          className="bg-[#00C853] hover:bg-[#00C853]/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          {t('exploreData')}
        </Button>
        <Button 
          variant="outline"
          className="border-[#263238] text-[#263238] hover:bg-[#263238] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          {t('viewPredictions')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mb-6 sm:mb-8 px-4 w-full">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#00C853] mb-2">150+</div>
          <div className="text-sm sm:text-base text-[#263238]">{t('stations')}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#FF6F00] mb-2">99.2%</div>
          <div className="text-sm sm:text-base text-[#263238]">{t('accuracy')}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-[#00C853] mb-2">24/7</div>
          <div className="text-sm sm:text-base text-[#263238]">{t('monitoring')}</div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-[#263238] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer" onClick={scrollToMap} />
      </div>
    </section>
  );
};
