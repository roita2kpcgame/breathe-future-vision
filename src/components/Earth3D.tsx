
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Satellite, Globe, Zap, MapPin, Wind } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { IndiaMap } from './IndiaMap';
import { useLanguage } from '@/contexts/LanguageContext';

export const Earth3D = () => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('Delhi');

  const cities = [
    { name: 'Delhi', pm25: 156, pm10: 234, aqi: 'Severe', color: '#FF5722', state: 'Delhi', coordinates: [77.2090, 28.6139] as [number, number] },
    { name: 'Mumbai', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [72.8777, 19.0760] as [number, number] },
    { name: 'Bangalore', pm25: 67, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [77.5946, 12.9716] as [number, number] },
    { name: 'Chennai', pm25: 78, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [80.2707, 13.0827] as [number, number] },
    { name: 'Kolkata', pm25: 134, pm10: 189, aqi: 'Very Poor', color: '#FF6F00', state: 'West Bengal', coordinates: [88.3639, 22.5726] as [number, number] },
    { name: 'Hyderabad', pm25: 92, pm10: 156, aqi: 'Moderate', color: '#FFA726', state: 'Telangana', coordinates: [78.4867, 17.3850] as [number, number] },
    { name: 'Pune', pm25: 74, pm10: 119, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [73.8567, 18.5204] as [number, number] },
    { name: 'Ahmedabad', pm25: 98, pm10: 167, aqi: 'Poor', color: '#FF8F00', state: 'Gujarat', coordinates: [72.5714, 23.0225] as [number, number] },
  ];

  const currentCity = cities.find(city => city.name === selectedCity);

  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50/95 via-indigo-50/95 to-purple-50/95 border-2 border-[#00C853]/20 shadow-2xl">
      <div className="text-center mb-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#263238] mb-2 flex items-center justify-center space-x-2 flex-wrap">
          <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-[#00C853]" />
          <span className="text-center">{t('liveSatelliteMapping')}</span>
          <Satellite className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF6F00]" />
        </h3>
        <p className="text-sm text-[#263238]/70 flex items-center justify-center space-x-2 flex-wrap">
          <span className="text-center">{t('satelliteDescription')}</span>
          <Wind className="w-4 h-4 text-blue-500" />
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <CitySelector 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
        />
      </div>

      {/* Real India Map */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="relative w-full max-w-2xl">
          <IndiaMap 
            cities={cities}
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />
        </div>
      </div>

      {currentCity && (
        <div className="mb-4 p-4 bg-gradient-to-r from-white/70 to-blue-50/70 rounded-xl border border-white/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-[#263238] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#00C853]" />
              <span className="truncate">{currentCity.name}, {currentCity.state}</span>
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

      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-4">
        <div className="p-2 sm:p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Good</span>
          </div>
          <p className="text-xs text-gray-600">0-50 AQI</p>
        </div>
        <div className="p-2 sm:p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Moderate</span>
          </div>
          <p className="text-xs text-gray-600">51-100 AQI</p>
        </div>
        <div className="p-2 sm:p-3 bg-white/60 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">Severe</span>
          </div>
          <p className="text-xs text-gray-600">201+ AQI</p>
        </div>
      </div>

      <div className="flex justify-center space-x-2 sm:space-x-4 flex-wrap gap-2">
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
