
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CitySelector } from './CitySelector';
import { Badge } from '@/components/ui/badge';
import { Satellite, MapPin, Wind, Eye, TrendingUp } from 'lucide-react';

export const PollutionMap = () => {
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

  const [selectedCity, setSelectedCity] = useState('Delhi');
  const currentCity = cities.find(city => city.name === selectedCity);

  return (
    <section id="pollution-map" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4 flex items-center justify-center space-x-3">
            <MapPin className="w-10 h-10 text-[#00C853]" />
            <span>Live Pollution Mapping</span>
            <Satellite className="w-10 h-10 text-[#FF6F00]" />
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Real-time PM2.5 and PM10 concentrations across India using ISRO satellite data and AI predictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm border-[#00C853]/20 shadow-xl">
              <div className="mb-4">
                <CitySelector 
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  cities={cities}
                />
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-[#E8F5E8] via-[#E0F2F1] to-[#F3E5F5] rounded-lg overflow-hidden border-2 border-white/50">
                {/* Enhanced India Map with better city positioning */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* India outline (simplified) */}
                    <div className="absolute inset-0 opacity-20">
                      <svg viewBox="0 0 400 300" className="w-full h-full">
                        <path
                          d="M100 80 Q120 60 140 70 Q160 65 180 75 Q200 70 220 80 Q240 75 260 85 Q280 90 290 110 Q295 130 285 150 Q280 170 270 185 Q260 200 240 210 Q220 215 200 210 Q180 205 160 200 Q140 195 120 185 Q100 175 95 155 Q90 135 95 115 Q98 95 100 80 Z"
                          fill="currentColor"
                          className="text-[#00C853]/30"
                        />
                      </svg>
                    </div>
                    
                    {cities.map((city, index) => {
                      const isSelected = city.name === selectedCity;
                      return (
                        <div
                          key={city.name}
                          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            isSelected ? 'scale-150 z-10' : 'hover:scale-125'
                          }`}
                          style={{
                            left: `${20 + (index % 4) * 20}%`,
                            top: `${25 + Math.floor(index / 4) * 15 + (index % 2) * 10}%`
                          }}
                          onClick={() => setSelectedCity(city.name)}
                        >
                          <div 
                            className={`w-6 h-6 rounded-full animate-pulse border-2 border-white shadow-lg ${
                              isSelected ? 'ring-4 ring-white/50' : ''
                            }`}
                            style={{ backgroundColor: city.color }}
                          >
                            {isSelected && (
                              <div className="absolute -inset-2 border-2 border-white rounded-full animate-ping"></div>
                            )}
                          </div>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[#263238] whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                            {city.name}
                          </div>
                          {isSelected && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#263238] whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                              AQI: {city.aqi}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-semibold text-[#263238] mb-2 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>AQI Legend</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                      <span>Good (0-50)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FFA726] rounded-full"></div>
                      <span>Moderate (51-100)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FF8F00] rounded-full"></div>
                      <span>Poor (101-200)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FF5722] rounded-full"></div>
                      <span>Severe (301+)</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <Badge className="bg-[#00C853] text-white">
                    <Wind className="w-3 h-3 mr-1" />
                    Live Data
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced City Details */}
          <div className="space-y-6">
            {currentCity && (
              <Card className="p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-[#00C853]/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#263238] flex items-center space-x-2">
                    <MapPin className="w-6 h-6 text-[#00C853]" />
                    <span>{currentCity.name}</span>
                  </h3>
                  <Badge className="text-sm" style={{ backgroundColor: currentCity.color, color: 'white' }}>
                    {currentCity.aqi}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-[#263238]/70 font-medium">PM2.5</span>
                    <span className="font-bold text-lg" style={{ color: currentCity.color }}>
                      {currentCity.pm25} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-[#263238]/70 font-medium">PM10</span>
                    <span className="font-bold text-lg" style={{ color: currentCity.color }}>
                      {currentCity.pm10} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-[#263238]/70 font-medium">State</span>
                    <span className="font-medium text-[#263238]">
                      {currentCity.state}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-[#00C853]/10 to-[#FF6F00]/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#00C853]" />
                    <span className="text-sm font-semibold text-[#263238]">Health Advisory</span>
                  </div>
                  <p className="text-xs text-[#263238]/70">
                    {currentCity.aqi === 'Good' ? 'Air quality is satisfactory for outdoor activities.' :
                     currentCity.aqi === 'Moderate' ? 'Sensitive individuals should limit outdoor activities.' :
                     'Consider wearing masks and limiting outdoor exposure.'}
                  </p>
                </div>
              </Card>
            )}

            <Tabs defaultValue="satellite" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80">
                <TabsTrigger value="satellite" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">
                  Satellite
                </TabsTrigger>
                <TabsTrigger value="ground" className="data-[state=active]:bg-[#FF6F00] data-[state=active]:text-white">
                  Ground Stations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="satellite">
                <Card className="p-4 bg-gradient-to-br from-blue-50/90 to-white/90 backdrop-blur-sm border-[#00C853]/20">
                  <h4 className="font-semibold text-[#263238] mb-2 flex items-center space-x-2">
                    <Satellite className="w-4 h-4 text-[#00C853]" />
                    <span>ISRO Satellite Data</span>
                  </h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    AOD measurements from INSAT-3D/3DR satellites
                  </p>
                  <div className="text-2xl font-bold text-[#00C853] mb-2">0.78 AOD</div>
                  <Badge className="bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20">
                    Updated 15 min ago
                  </Badge>
                </Card>
              </TabsContent>
              <TabsContent value="ground">
                <Card className="p-4 bg-gradient-to-br from-orange-50/90 to-white/90 backdrop-blur-sm border-[#FF6F00]/20">
                  <h4 className="font-semibold text-[#263238] mb-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#FF6F00]" />
                    <span>CPCB Ground Stations</span>
                  </h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    Real-time measurements from local monitors
                  </p>
                  <div className="text-2xl font-bold text-[#FF6F00] mb-2">12 Stations</div>
                  <Badge className="bg-[#FF6F00]/10 text-[#FF6F00] border-[#FF6F00]/20">
                    All Active
                  </Badge>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
