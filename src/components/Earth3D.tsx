import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Globe, Zap, MapPin, Wind } from 'lucide-react';
import { CitySelector } from './CitySelector';

export const Earth3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCity, setSelectedCity] = useState('Delhi');

  const cities = [
    { name: 'Delhi', pm25: 156, pm10: 234, aqi: 'Severe', color: '#FF5722', state: 'Delhi', coordinates: [77.2090, 28.6139] as [number, number] },
    { name: 'Mumbai', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [72.8777, 19.0760] as [number, number] },
    { name: 'Bangalore', pm25: 67, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [77.5946, 12.9716] as [number, number] },
    { name: 'Chennai', pm25: 78, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [80.2707, 13.0827] as [number, number] },
    { name: 'Kolkata', pm25: 134, pm10: 189, aqi: 'Very Poor', color: '#FF6F00', state: 'West Bengal', coordinates: [88.3639, 22.5726] as [number, number] },
    { name: 'Hyderabad', pm25: 92, pm10: 156, aqi: 'Moderate', color: '#FFA726', state: 'Telangana', coordinates: [78.4867, 17.3850] as [number, number] },
  ];

  const currentCity = cities.find(city => city.name === selectedCity);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    canvas.width = 450;
    canvas.height = 450;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const earthRadius = 170;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Enhanced Earth with realistic gradient
      const earthGradient = ctx.createRadialGradient(centerX - 60, centerY - 60, 0, centerX, centerY, earthRadius);
      earthGradient.addColorStop(0, '#87CEEB');
      earthGradient.addColorStop(0.2, '#4FC3F7');
      earthGradient.addColorStop(0.5, '#29B6F6');
      earthGradient.addColorStop(0.8, '#0288D1');
      earthGradient.addColorStop(1, '#01579B');

      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();

      // Enhanced continents with better detail
      ctx.fillStyle = '#2E7D32';
      ctx.globalAlpha = 0.8;
      
      // India with better shape
      const indiaPath = new Path2D();
      indiaPath.moveTo(centerX + 10, centerY - 30);
      indiaPath.quadraticCurveTo(centerX + 40, centerY - 20, centerX + 35, centerY + 10);
      indiaPath.quadraticCurveTo(centerX + 30, centerY + 40, centerX + 10, centerY + 50);
      indiaPath.quadraticCurveTo(centerX - 10, centerY + 45, centerX - 5, centerY + 20);
      indiaPath.quadraticCurveTo(centerX - 15, centerY - 10, centerX + 10, centerY - 30);
      ctx.fill(indiaPath);

      // Other continents
      ctx.beginPath();
      ctx.ellipse(centerX - 80, centerY - 20, 25, 40, rotation * 0.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(centerX + 70, centerY + 30, 20, 35, rotation * 0.03, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // Enhanced pollution visualization for cities
      cities.forEach((city, index) => {
        const angle = (rotation + index * 45) * Math.PI / 180;
        const cityRadius = earthRadius * 0.75;
        const x = centerX + Math.cos(angle) * cityRadius;
        const y = centerY + Math.sin(angle) * cityRadius;

        const intensity = city.pm25 / 200; // Normalize PM2.5 values
        const size = 6 + intensity * 15;
        
        // City marker
        const isSelected = city.name === selectedCity;
        if (isSelected) {
          // Highlight selected city
          const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, size + 10);
          highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          
          ctx.beginPath();
          ctx.arc(x, y, size + 10, 0, Math.PI * 2);
          ctx.fillStyle = highlightGradient;
          ctx.fill();
        }

        // Pollution visualization with real colors
        const pollutionGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        pollutionGradient.addColorStop(0, city.color + 'CC');
        pollutionGradient.addColorStop(0.7, city.color + '66');
        pollutionGradient.addColorStop(1, city.color + '22');
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = pollutionGradient;
        ctx.fill();

        // Pulse effect
        const pulseSize = size + Math.sin(Date.now() * 0.005 + index) * 3;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = city.color;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();

        // City label for selected city
        if (isSelected) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(city.name, x, y - size - 10);
          
          ctx.font = '10px Arial';
          ctx.fillText(`${city.pm25} PM2.5`, x, y - size - 25);
        }
      });

      // Enhanced satellites with ISRO theme
      for (let i = 0; i < 4; i++) {
        const satelliteAngle = (rotation * 1.5 + i * 90) * Math.PI / 180;
        const satelliteRadius = earthRadius + 50 + i * 15;
        const satX = centerX + Math.cos(satelliteAngle) * satelliteRadius;
        const satY = centerY + Math.sin(satelliteAngle) * satelliteRadius;

        // Satellite body with Indian colors
        const satGradient = ctx.createLinearGradient(satX - 4, satY - 4, satX + 4, satY + 4);
        satGradient.addColorStop(0, '#FF6F00');
        satGradient.addColorStop(0.5, '#FFA726');
        satGradient.addColorStop(1, '#FF8F00');

        ctx.fillStyle = satGradient;
        ctx.fillRect(satX - 4, satY - 4, 8, 8);

        // Solar panels
        ctx.fillStyle = '#1976D2';
        ctx.fillRect(satX - 8, satY - 2, 4, 4);
        ctx.fillRect(satX + 4, satY - 2, 4, 4);

        // Communication beam to selected city
        if (currentCity && i === 0) {
          const cityAngle = (rotation + cities.findIndex(c => c.name === selectedCity) * 45) * Math.PI / 180;
          const cityX = centerX + Math.cos(cityAngle) * (earthRadius * 0.75);
          const cityY = centerY + Math.sin(cityAngle) * (earthRadius * 0.75);

          ctx.strokeStyle = '#00E676';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(satX, satY);
          ctx.lineTo(cityX, cityY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Atmospheric glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, earthRadius, centerX, centerY, earthRadius + 20);
      glowGradient.addColorStop(0, 'rgba(135, 206, 235, 0.3)');
      glowGradient.addColorStop(1, 'rgba(135, 206, 235, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius + 20, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      rotation += 0.3;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [selectedCity, currentCity]);

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-purple-50/95 border-2 border-[#00C853]/20 shadow-2xl">
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-[#263238] mb-2 flex items-center justify-center space-x-2">
          <Globe className="w-7 h-7 text-[#00C853]" />
          <span>Live Satellite Mapping</span>
          <Satellite className="w-7 h-7 text-[#FF6F00]" />
        </h3>
        <p className="text-sm text-[#263238]/70 flex items-center justify-center space-x-2">
          <span>Real-time Air Quality Monitoring from Space</span>
          <Wind className="w-4 h-4 text-blue-500" />
        </p>
      </div>

      <div className="mb-6">
        <CitySelector 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
        />
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="rounded-2xl shadow-2xl border-4 border-white/80"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
            <Badge className="bg-[#00C853] text-white flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Live</span>
            </Badge>
          </div>
        </div>
      </div>

      {currentCity && (
        <div className="mb-4 p-4 bg-gradient-to-r from-white/70 to-blue-50/70 rounded-xl border border-white/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-[#263238] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#00C853]" />
              <span>{currentCity.name}, {currentCity.state}</span>
            </h4>
            <Badge style={{ backgroundColor: currentCity.color, color: 'white' }}>
              {currentCity.aqi}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#263238]/70">PM2.5:</span>
              <span className="font-bold" style={{ color: currentCity.color }}>
                {currentCity.pm25} μg/m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#263238]/70">PM10:</span>
              <span className="font-bold" style={{ color: currentCity.color }}>
                {currentCity.pm10} μg/m³
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Good</span>
          </div>
          <p className="text-xs text-gray-600">0-50 AQI</p>
        </div>
        <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Moderate</span>
          </div>
          <p className="text-xs text-gray-600">51-100 AQI</p>
        </div>
        <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Severe</span>
          </div>
          <p className="text-xs text-gray-600">201+ AQI</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 flex-wrap gap-2">
        <Badge className="bg-[#00C853] text-white flex items-center space-x-1">
          <Zap className="w-3 h-3" />
          <span>Live Data</span>
        </Badge>
        <Badge className="bg-[#FF6F00] text-white flex items-center space-x-1">
          <Satellite className="w-3 h-3" />
          <span>4 ISRO Satellites</span>
        </Badge>
        <Badge className="bg-blue-600 text-white flex items-center space-x-1">
          <Globe className="w-3 h-3" />
          <span>NavIC Enabled</span>
        </Badge>
      </div>
    </Card>
  );
};
