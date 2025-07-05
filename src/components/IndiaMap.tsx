
import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap } from 'lucide-react';

interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
}

interface IndiaMapProps {
  cities: City[];
  selectedCity: string;
  onCitySelect: (cityName: string) => void;
}

export const IndiaMap = ({ cities, selectedCity, onCitySelect }: IndiaMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 500, height: 400 });

  // Enhanced city positions based on actual geography
  const cityPositions = {
    'Delhi': { x: 0.45, y: 0.25 },
    'Mumbai': { x: 0.35, y: 0.55 },
    'Bangalore': { x: 0.48, y: 0.75 },
    'Chennai': { x: 0.55, y: 0.78 },
    'Kolkata': { x: 0.68, y: 0.45 },
    'Hyderabad': { x: 0.50, y: 0.65 },
    'Pune': { x: 0.40, y: 0.58 },
    'Ahmedabad': { x: 0.30, y: 0.40 }
  };

  const citiesWithPositions = cities.map(city => ({
    ...city,
    position: cityPositions[city.name as keyof typeof cityPositions] || { x: 0.5, y: 0.5 }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const width = Math.min(containerWidth - 32, 600);
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

    // Enhanced India map outline with better detail
    const drawIndiaMap = () => {
      ctx.fillStyle = '#E8F5E8';
      ctx.strokeStyle = '#00C853';
      ctx.lineWidth = 2;

      // Main India outline (simplified but more accurate)
      ctx.beginPath();
      
      // Kashmir region
      ctx.moveTo(mapDimensions.width * 0.35, mapDimensions.height * 0.15);
      ctx.quadraticCurveTo(mapDimensions.width * 0.40, mapDimensions.height * 0.12, mapDimensions.width * 0.45, mapDimensions.height * 0.15);
      ctx.quadraticCurveTo(mapDimensions.width * 0.50, mapDimensions.height * 0.18, mapDimensions.width * 0.52, mapDimensions.height * 0.20);
      
      // Northern border
      ctx.lineTo(mapDimensions.width * 0.70, mapDimensions.height * 0.25);
      
      // Eastern border (through West Bengal, Assam)
      ctx.quadraticCurveTo(mapDimensions.width * 0.75, mapDimensions.height * 0.30, mapDimensions.width * 0.78, mapDimensions.height * 0.40);
      ctx.quadraticCurveTo(mapDimensions.width * 0.75, mapDimensions.height * 0.50, mapDimensions.width * 0.70, mapDimensions.height * 0.60);
      
      // Eastern coast (Odisha, Andhra Pradesh)
      ctx.lineTo(mapDimensions.width * 0.65, mapDimensions.height * 0.70);
      ctx.quadraticCurveTo(mapDimensions.width * 0.60, mapDimensions.height * 0.80, mapDimensions.width * 0.55, mapDimensions.height * 0.85);
      
      // Southern tip (Kanyakumari)
      ctx.quadraticCurveTo(mapDimensions.width * 0.50, mapDimensions.height * 0.90, mapDimensions.width * 0.45, mapDimensions.height * 0.85);
      
      // Western coast (Kerala, Karnataka, Goa)
      ctx.quadraticCurveTo(mapDimensions.width * 0.40, mapDimensions.height * 0.80, mapDimensions.width * 0.38, mapDimensions.height * 0.70);
      ctx.lineTo(mapDimensions.width * 0.35, mapDimensions.height * 0.60);
      
      // Maharashtra coast
      ctx.quadraticCurveTo(mapDimensions.width * 0.32, mapDimensions.height * 0.50, mapDimensions.width * 0.30, mapDimensions.height * 0.40);
      
      // Gujarat coast
      ctx.quadraticCurveTo(mapDimensions.width * 0.25, mapDimensions.height * 0.35, mapDimensions.width * 0.22, mapDimensions.height * 0.30);
      ctx.quadraticCurveTo(mapDimensions.width * 0.25, mapDimensions.height * 0.25, mapDimensions.width * 0.30, mapDimensions.height * 0.20);
      
      // Back to Kashmir
      ctx.quadraticCurveTo(mapDimensions.width * 0.32, mapDimensions.height * 0.17, mapDimensions.width * 0.35, mapDimensions.height * 0.15);
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Add some internal state boundaries for detail
      ctx.strokeStyle = '#00C853';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      
      // Gujarat-Rajasthan border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.28, mapDimensions.height * 0.25);
      ctx.lineTo(mapDimensions.width * 0.35, mapDimensions.height * 0.35);
      ctx.stroke();
      
      // Maharashtra-Karnataka border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.35, mapDimensions.height * 0.62);
      ctx.lineTo(mapDimensions.width * 0.55, mapDimensions.height * 0.62);
      ctx.stroke();
      
      // Andhra-Tamil Nadu border
      ctx.beginPath();
      ctx.moveTo(mapDimensions.width * 0.48, mapDimensions.height * 0.72);
      ctx.lineTo(mapDimensions.width * 0.60, mapDimensions.height * 0.75);
      ctx.stroke();
      
      ctx.globalAlpha = 1;
    };

    drawIndiaMap();

    // Draw cities
    citiesWithPositions.forEach((city) => {
      const x = city.position.x * mapDimensions.width;
      const y = city.position.y * mapDimensions.height;
      const isSelected = city.name === selectedCity;
      const baseSize = 8;
      const intensity = city.pm25 / 200;
      const size = baseSize + intensity * 12;

      // City glow effect
      if (isSelected) {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size + 15);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, size + 15, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Pollution visualization
      const pollutionGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      pollutionGradient.addColorStop(0, city.color + 'FF');
      pollutionGradient.addColorStop(0.6, city.color + 'AA');
      pollutionGradient.addColorStop(1, city.color + '33');
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = pollutionGradient;
      ctx.fill();

      // City border
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#FFFFFF' : city.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // Pulse animation for high pollution
      if (city.pm25 > 100) {
        const pulseSize = size + Math.sin(Date.now() * 0.005) * 4;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = city.color + '80';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

  }, [mapDimensions, citiesWithPositions, selectedCity]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if click is near any city
    citiesWithPositions.forEach((city) => {
      const cityX = city.position.x * mapDimensions.width;
      const cityY = city.position.y * mapDimensions.height;
      const distance = Math.sqrt((clickX - cityX) ** 2 + (clickY - cityY) ** 2);
      
      if (distance < 25) { // Click tolerance
        onCitySelect(city.name);
      }
    });
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="cursor-pointer rounded-xl shadow-lg border-2 border-white/50 bg-gradient-to-br from-blue-50/80 to-green-50/80"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      {/* Live indicator */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <Badge className="bg-[#00C853] text-white">
          <Zap className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>

      {/* City labels for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs">
        {citiesWithPositions.slice(0, 8).map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className={`p-2 rounded-lg transition-all duration-200 text-left ${
              selectedCity === city.name
                ? 'bg-white/90 border-2 border-[#00C853]/50 shadow-md'
                : 'bg-white/60 border border-white/50 hover:bg-white/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: city.color }}
              />
              <div>
                <div className="font-medium text-[#263238]">{city.name}</div>
                <div className="text-[#263238]/60">{city.aqi}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
