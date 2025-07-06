
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, Activity } from 'lucide-react';
import { cityPositions } from '@/data/cities';

interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
  actualAqi?: number;
  temperature?: number;
  humidity?: number;
}

interface EnhancedIndiaMapProps {
  cities: City[];
  selectedCity: string;
  onCitySelect: (cityName: string) => void;
}

export const EnhancedIndiaMap = ({ cities, selectedCity, onCitySelect }: EnhancedIndiaMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mapDimensions, setMapDimensions] = useState({ width: 600, height: 480 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const citiesWithPositions = useMemo(() => cities.map(city => ({
    ...city,
    position: cityPositions[city.name as keyof typeof cityPositions] || { x: 0.5, y: 0.5 }
  })), [cities]);

  const drawRealisticIndiaMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Enhanced gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#E3F2FD');
    bgGradient.addColorStop(0.5, '#E8F5E8');
    bgGradient.addColorStop(1, '#F3E5F5');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Main India outline with better accuracy
    ctx.fillStyle = '#E8F5E8';
    ctx.strokeStyle = '#00C853';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(0, 200, 83, 0.3)';
    ctx.shadowBlur = 8;

    ctx.beginPath();
    
    // More detailed and accurate India outline
    const points = [
      [0.35, 0.15], [0.40, 0.12], [0.45, 0.15], [0.50, 0.18], [0.52, 0.20],
      [0.70, 0.25], [0.75, 0.30], [0.78, 0.40], [0.75, 0.50], [0.70, 0.60],
      [0.65, 0.70], [0.60, 0.80], [0.55, 0.85], [0.50, 0.90], [0.45, 0.85],
      [0.40, 0.80], [0.38, 0.70], [0.35, 0.60], [0.32, 0.50], [0.30, 0.40],
      [0.25, 0.35], [0.22, 0.30], [0.25, 0.25], [0.30, 0.20], [0.32, 0.17]
    ];

    points.forEach(([x, y], index) => {
      const plotX = x * width;
      const plotY = y * height;
      
      if (index === 0) {
        ctx.moveTo(plotX, plotY);
      } else {
        // Add curves for smoother coastline
        const prevX = points[index - 1][0] * width;
        const prevY = points[index - 1][1] * height;
        const cpX = (prevX + plotX) / 2;
        const cpY = (prevY + plotY) / 2;
        ctx.quadraticCurveTo(cpX, cpY, plotX, plotY);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Add state boundaries for more realism
    ctx.strokeStyle = '#00C853';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    
    // Major state boundaries
    const stateBoundaries = [
      [[0.28, 0.25], [0.35, 0.35]], // Gujarat-Rajasthan
      [[0.35, 0.62], [0.55, 0.62]], // Maharashtra-Karnataka
      [[0.48, 0.72], [0.60, 0.75]], // Andhra-Tamil Nadu
      [[0.45, 0.35], [0.55, 0.45]], // Central India
      [[0.50, 0.25], [0.65, 0.40]]  // North-East connection
    ];

    stateBoundaries.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(start[0] * width, start[1] * height);
      ctx.lineTo(end[0] * width, end[1] * height);
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  };

  const drawAnimatedCities = (ctx: CanvasRenderingContext2D, time: number) => {
    citiesWithPositions.forEach((city, index) => {
      const x = city.position.x * mapDimensions.width;
      const y = city.position.y * mapDimensions.height;
      const isSelected = city.name === selectedCity;
      const isHovered = city.name === hoveredCity;
      const baseSize = 6;
      const intensity = Math.min(city.pm25 / 200, 1);
      const size = baseSize + intensity * 12;

      // Breathing animation for severe pollution
      const breathingScale = city.pm25 > 150 ? 
        1 + Math.sin(time * 0.003 + index * 0.5) * 0.2 : 1;
      const animatedSize = size * breathingScale;

      // Enhanced glow effect for selected/hovered cities
      if (isSelected || isHovered) {
        const glowSize = animatedSize + 20;
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glowGradient.addColorStop(0.5, isSelected ? 'rgba(0, 200, 83, 0.4)' : 'rgba(255, 255, 255, 0.3)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Pollution cloud visualization
      const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, animatedSize + 8);
      const alpha = Math.min(intensity * 0.8 + 0.2, 0.9);
      cloudGradient.addColorStop(0, city.color + 'FF');
      cloudGradient.addColorStop(0.4, city.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
      cloudGradient.addColorStop(1, city.color + '00');
      
      ctx.beginPath();
      ctx.arc(x, y, animatedSize + 8, 0, Math.PI * 2);
      ctx.fillStyle = cloudGradient;
      ctx.fill();

      // Main city marker
      const cityGradient = ctx.createRadialGradient(x, y, 0, x, y, animatedSize);
      cityGradient.addColorStop(0, '#FFFFFF');
      cityGradient.addColorStop(0.3, city.color);
      cityGradient.addColorStop(1, city.color + '88');
      
      ctx.beginPath();
      ctx.arc(x, y, animatedSize, 0, Math.PI * 2);
      ctx.fillStyle = cityGradient;
      ctx.fill();

      // Enhanced border
      ctx.beginPath();
      ctx.arc(x, y, animatedSize, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#FFFFFF' : city.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // AQI value display for selected city
      if (isSelected && city.actualAqi) {
        ctx.fillStyle = '#263238';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(city.actualAqi.toString(), x, y + 3);
      }

      // City name for selected/hovered cities
      if (isSelected || isHovered) {
        ctx.fillStyle = '#263238';
        ctx.font = isSelected ? 'bold 13px sans-serif' : '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, x, y - animatedSize - 12);
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const width = Math.min(containerWidth - 32, 700);
        const height = width * 0.8;
        setMapDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = mapDimensions.width;
    canvas.height = mapDimensions.height;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, mapDimensions.width, mapDimensions.height);
      
      drawRealisticIndiaMap(ctx, mapDimensions.width, mapDimensions.height);
      drawAnimatedCities(ctx, time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mapDimensions, citiesWithPositions, selectedCity, hoveredCity]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((clickX - cityX) ** 2 + (clickY - cityY) ** 2);
      
      if (distance < 25) {
        onCitySelect(city.name);
      }
    });
  };

  const handleCanvasHover = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const hoverY = event.clientY - rect.top;

    let foundCity = null;
    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((hoverX - cityX) ** 2 + (hoverY - cityY) ** 2);
      
      if (distance < 25) {
        foundCity = city.name;
      }
    });

    setHoveredCity(foundCity);
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasHover}
          onMouseLeave={() => setHoveredCity(null)}
          className="cursor-pointer rounded-xl shadow-xl border-2 border-white/60 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-2">
        <Badge className="bg-[#00C853] text-white animate-pulse">
          <Activity className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
        <Badge className="bg-[#FF6F00] text-white">
          <Zap className="w-3 h-3 mr-1" />
          Real-time
        </Badge>
      </div>

      {/* Enhanced city selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4 text-xs max-h-56 overflow-y-auto custom-scrollbar">
        {citiesWithPositions.slice(0, 25).map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`p-2 rounded-lg transition-all duration-300 text-left transform hover:scale-105 ${
              selectedCity === city.name
                ? 'bg-gradient-to-r from-[#00C853]/20 to-[#00C853]/10 border-2 border-[#00C853]/50 shadow-lg scale-105'
                : hoveredCity === city.name
                ? 'bg-white/80 border border-[#00C853]/30 shadow-md'
                : 'bg-white/60 border border-white/50 hover:bg-white/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0 animate-pulse"
                style={{ backgroundColor: city.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-[#263238] truncate">{city.name}</div>
                <div className="text-[#263238]/60 truncate flex items-center space-x-1">
                  <span>{city.aqi}</span>
                  {city.actualAqi && (
                    <span className="text-[#00C853] font-semibold">({city.actualAqi})</span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {citiesWithPositions.length > 25 && (
        <div className="text-center mt-2">
          <span className="text-xs text-[#263238]/60">
            Showing 25 of {citiesWithPositions.length} cities. Click map or search for more.
          </span>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #00C853 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #00C853;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};
