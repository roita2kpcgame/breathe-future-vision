
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CitySelector } from './CitySelector';
import { Badge } from '@/components/ui/badge';
import { IndiaMap } from './IndiaMap';
import { Satellite, MapPin, Wind, Eye, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const PollutionMap = () => {
  const { t } = useLanguage();
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
    <section id="pollution-map" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#263238] mb-4 flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#00C853]" />
            <span className="text-center">{t('livePollutionMapping')}</span>
            <Satellite className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF6F00]" />
          </h2>
          <p className="text-lg sm:text-xl text-[#263238]/70 max-w-3xl mx-auto px-4">
            {t('pollutionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Enhanced Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50/90 to-green-50/90 backdrop-blur-sm border-[#00C853]/20 shadow-xl">
              <div className="mb-4">
                <CitySelector 
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  cities={cities}
                />
              </div>
              
              {/* Real India Map */}
              <IndiaMap 
                cities={cities}
                selectedCity={selectedCity}
                onCitySelect={setSelectedCity}
              />
            </Card>
          </div>

          {/* Enhanced City Details */}
          <div className="space-y-4 sm:space-y-6">
            {currentCity && (
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-[#00C853]/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#263238] flex items-center space-x-2">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00C853]" />
                    <span className="truncate">{currentCity.name}</span>
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
                    <span className="font-medium text-[#263238] truncate">
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
                    {currentCity.aqi === 'Good' || currentCity.aqi === 'Satisfactory' ? 'Air quality is satisfactory for outdoor activities.' :
                     currentCity.aqi === 'Moderate' ? 'Sensitive individuals should limit outdoor activities.' :
                     'Consider wearing masks and limiting outdoor exposure.'}
                  </p>
                </div>
              </Card>
            )}

            <Tabs defaultValue="satellite" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80">
                <TabsTrigger value="satellite" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white text-sm">
                  Satellite
                </TabsTrigger>
                <TabsTrigger value="ground" className="data-[state=active]:bg-[#FF6F00] data-[state=active]:text-white text-sm">
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
