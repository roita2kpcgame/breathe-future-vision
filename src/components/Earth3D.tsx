
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Globe, Zap } from 'lucide-react';

export const Earth3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const earthRadius = 150;

    // Pollution data points (simulated)
    const pollutionSpots = [
      { lat: 28.6, lng: 77.2, intensity: 0.8, name: 'Delhi' }, // Delhi
      { lat: 19.0, lng: 72.8, intensity: 0.6, name: 'Mumbai' }, // Mumbai
      { lat: 13.0, lng: 77.6, intensity: 0.4, name: 'Bangalore' }, // Bangalore
      { lat: 22.5, lng: 88.3, intensity: 0.7, name: 'Kolkata' }, // Kolkata
      { lat: 17.4, lng: 78.5, intensity: 0.5, name: 'Hyderabad' }, // Hyderabad
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Earth
      const gradient = ctx.createRadialGradient(centerX - 50, centerY - 50, 0, centerX, centerY, earthRadius);
      gradient.addColorStop(0, '#4FC3F7');
      gradient.addColorStop(0.3, '#29B6F6');
      gradient.addColorStop(0.7, '#0288D1');
      gradient.addColorStop(1, '#01579B');

      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw continents (simplified)
      ctx.fillStyle = '#4CAF50';
      ctx.globalAlpha = 0.7;
      
      // India approximation
      ctx.beginPath();
      ctx.ellipse(centerX + 20, centerY + 10, 30, 50, rotation * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;

      // Draw pollution spots
      pollutionSpots.forEach((spot, index) => {
        const angle = (rotation + index * 60) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * (earthRadius * 0.7);
        const y = centerY + Math.sin(angle) * (earthRadius * 0.7);

        // Pollution visualization
        const intensity = spot.intensity;
        const size = 8 + intensity * 12;
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        glowGradient.addColorStop(0, `rgba(255, ${255 - intensity * 200}, ${255 - intensity * 255}, 0.8)`);
        glowGradient.addColorStop(1, `rgba(255, ${255 - intensity * 200}, ${255 - intensity * 255}, 0.1)`);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Pulse effect
        const pulseSize = size + Math.sin(Date.now() * 0.005 + index) * 5;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = intensity > 0.6 ? '#FF5722' : intensity > 0.4 ? '#FF9800' : '#4CAF50';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw satellites
      for (let i = 0; i < 3; i++) {
        const satelliteAngle = (rotation * 2 + i * 120) * Math.PI / 180;
        const satelliteRadius = earthRadius + 40 + i * 20;
        const satX = centerX + Math.cos(satelliteAngle) * satelliteRadius;
        const satY = centerY + Math.sin(satelliteAngle) * satelliteRadius;

        // Satellite body
        ctx.fillStyle = '#FFC107';
        ctx.fillRect(satX - 3, satY - 3, 6, 6);

        // Satellite signal lines
        ctx.strokeStyle = '#00C853';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(satX, satY);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      rotation += 0.5;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-[#00C853]/20">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-[#263238] mb-2 flex items-center justify-center space-x-2">
          <Globe className="w-6 h-6 text-[#00C853]" />
          <span>Live Satellite Mapping</span>
          <Satellite className="w-6 h-6 text-[#FF6F00]" />
        </h3>
        <p className="text-sm text-[#263238]/70">Real-time Air Quality Monitoring from Space</p>
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          className="rounded-2xl shadow-lg border-4 border-white"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium">Good</span>
          </div>
          <p className="text-xs text-gray-600">0-50 AQI</p>
        </div>
        <div className="p-2 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs font-medium">Moderate</span>
          </div>
          <p className="text-xs text-gray-600">51-100 AQI</p>
        </div>
        <div className="p-2 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs font-medium">Unhealthy</span>
          </div>
          <p className="text-xs text-gray-600">101+ AQI</p>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <Badge className="bg-[#00C853] text-white">
          <Zap className="w-3 h-3 mr-1" />
          Live Data
        </Badge>
        <Badge className="bg-[#FF6F00] text-white">
          <Satellite className="w-3 h-3 mr-1" />
          3 Satellites Active
        </Badge>
      </div>
    </Card>
  );
};
