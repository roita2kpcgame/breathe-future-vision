
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PollutionMap = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  
  const cities = [
    { name: 'Delhi', pm25: 156, pm10: 234, aqi: 'Severe', color: '#FF6F00' },
    { name: 'Mumbai', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726' },
    { name: 'Bangalore', pm25: 67, pm10: 98, aqi: 'Satisfactory', color: '#00C853' },
    { name: 'Chennai', pm25: 78, pm10: 112, aqi: 'Moderate', color: '#FFA726' },
    { name: 'Kolkata', pm25: 134, pm10: 189, aqi: 'Very Poor', color: '#FF5722' }
  ];

  return (
    <section id="pollution-map" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            Live Pollution Mapping
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Real-time PM2.5 and PM10 concentrations across India using ISRO satellite data and AI predictions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="relative h-96 bg-gradient-to-br from-[#E0F7FA] to-[#B0BEC5] rounded-lg overflow-hidden">
                {/* Simulated India Map with pollution hotspots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {cities.map((city, index) => (
                      <div
                        key={city.name}
                        className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
                        style={{
                          backgroundColor: city.color,
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`
                        }}
                        onClick={() => setSelectedCity(city.name)}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#263238] whitespace-nowrap">
                          {city.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-semibold text-[#263238] mb-2">AQI Legend</div>
                  <div className="flex flex-col space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#00C853] rounded-full"></div>
                      <span>Good (0-50)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FFA726] rounded-full"></div>
                      <span>Moderate (51-100)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FF6F00] rounded-full"></div>
                      <span>Severe (301+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* City Details */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-2xl font-bold text-[#263238] mb-4">{selectedCity}</h3>
              {cities.find(city => city.name === selectedCity) && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#263238]/70">PM2.5</span>
                    <span className="font-bold text-[#FF6F00]">
                      {cities.find(city => city.name === selectedCity)?.pm25} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#263238]/70">PM10</span>
                    <span className="font-bold text-[#FF6F00]">
                      {cities.find(city => city.name === selectedCity)?.pm10} μg/m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#263238]/70">AQI Status</span>
                    <span className="font-bold" style={{ color: cities.find(city => city.name === selectedCity)?.color }}>
                      {cities.find(city => city.name === selectedCity)?.aqi}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            <Tabs defaultValue="satellite" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                <TabsTrigger value="ground">Ground</TabsTrigger>
              </TabsList>
              <TabsContent value="satellite">
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                  <h4 className="font-semibold text-[#263238] mb-2">ISRO Satellite Data</h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    AOD measurements from INSAT-3D/3DR satellites
                  </p>
                  <div className="text-2xl font-bold text-[#00C853]">0.78 AOD</div>
                </Card>
              </TabsContent>
              <TabsContent value="ground">
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                  <h4 className="font-semibold text-[#263238] mb-2">CPCB Ground Stations</h4>
                  <p className="text-sm text-[#263238]/70 mb-3">
                    Real-time measurements from local monitors
                  </p>
                  <div className="text-2xl font-bold text-[#FF6F00]">12 Stations</div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
