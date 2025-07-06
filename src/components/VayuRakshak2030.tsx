
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Satellite, Globe, Brain, MapPin, Leaf, Shield, Users, Camera, 
  BookOpen, Bell, TreePine, Microscope, Clock, School, Calculator,
  Award, Building, Zap, Heart, Target, Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const VayuRakshak2030 = () => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const coreFeatures = [
    {
      id: 'vayunet',
      title: 'VayuNet: Bharat-Wide Environmental Grid',
      description: 'Unified live air quality map of India (urban + rural) powered by AI fusion of CPCB, OpenAQ, IoT sensors, and ISRO satellites',
      icon: Globe,
      color: '#00C853',
      status: 'active',
      alignment: 'Digital India, Smart Cities'
    },
    {
      id: 'breathecast',
      title: 'BreatheCast AI – 5-Day Personalized Forecast',
      description: 'AI predicts pollutant levels + health risk zones using LSTM + Prophet + attention networks',
      icon: Brain,
      color: '#FF6F00',
      status: 'active',
      alignment: 'AI for All, Healthcare'
    },
    {
      id: 'janaqi',
      title: 'JanAQI – India\'s Public Air App',
      description: 'Location-based AQI with color-coded health flags, exposure tracker, and QR village boards',
      icon: MapPin,
      color: '#2196F3',
      status: 'active',
      alignment: 'Make in India, PWA'
    },
    {
      id: 'ayuraqi',
      title: 'AyurAQI – Wellness Mode',
      description: 'AI suggests yoga, food, lifestyle tweaks based on AQI, linking ancient wisdom with modern data',
      icon: Heart,
      color: '#9C27B0',
      status: 'coming-soon',
      alignment: 'Ayushman Bharat, Fit India'
    },
    {
      id: 'agroclean',
      title: 'AgroClean Module',
      description: 'Village AQI trends, low-smoke crop practices, air-health impact on agriculture',
      icon: Leaf,
      color: '#4CAF50',
      status: 'coming-soon',
      alignment: 'Atmanirbhar Krishi, Kisan eMitra'
    },
    {
      id: 'vayuguard',
      title: 'VayuGuard: National AI Alert System',
      description: 'Real-time ML-based pollution emergency alerts connecting to NDMA, NGT, district collectors',
      icon: Shield,
      color: '#F44336',
      status: 'development',
      alignment: 'Disaster Management, Smart Cities'
    }
  ];

  const innovativeFeatures = [
    {
      title: 'DNA of Your City\'s Air',
      description: 'Historical AQI + pollutant fingerprinting for each location',
      icon: Microscope,
      color: '#E91E63'
    },
    {
      title: 'Satellite Time Machine',
      description: 'Historical satellite imagery showing pollution growth over time',
      icon: Clock,
      color: '#3F51B5'
    },
    {
      title: 'AQI for Schools & Children',
      description: 'Kid-safe portal with games and daily play-outside alerts',
      icon: School,
      color: '#FF9800'
    },
    {
      title: 'Pollution Footprint Calculator',
      description: 'Calculate personal AQI impact and get reduction suggestions',
      icon: Calculator,
      color: '#795548'
    },
    {
      title: 'Kisan Paryavaran Portal',
      description: 'AQI + crop advisories for rural India',
      icon: Leaf,
      color: '#8BC34A'
    },
    {
      title: 'Digital AQI Certificates',
      description: 'Monthly Clean Air Report Cards with QR verification',
      icon: Award,
      color: '#FFC107'
    },
    {
      title: 'Local Government Dashboard',
      description: 'Special portal for district magistrates and urban planners',
      icon: Building,
      color: '#607D8B'
    },
    {
      title: 'AI Copilot for Policies',
      description: 'AI suggests environmental policies based on local data',
      icon: Brain,
      color: '#9E9E9E'
    },
    {
      title: 'Live Pollution Cam',
      description: 'Traffic cameras + ML for real-time haze detection',
      icon: Camera,
      color: '#FF5722'
    },
    {
      title: 'Clean Air Knowledge Hub',
      description: 'Educational content supporting UPSC, NEET, engineering prep',
      icon: BookOpen,
      color: '#673AB7'
    },
    {
      title: 'Festival Pollution Tracker',
      description: 'Real-time spikes during Diwali, Holi, crop burning',
      icon: Sparkles,
      color: '#E91E63'
    },
    {
      title: 'WhatsApp/SMS AQI Alerts',
      description: 'AI alerts in local language for rural and senior citizens',
      icon: Bell,
      color: '#4CAF50'
    },
    {
      title: 'Adopt-a-Tree Impact',
      description: 'Sponsor trees and track CO₂ removal via satellite',
      icon: TreePine,
      color: '#2E7D32'
    }
  ];

  const digitalIndiaAlignment = [
    {
      goal: 'Digital India',
      support: 'Real-time air intelligence layer for BharatNet',
      color: '#FF6F00'
    },
    {
      goal: 'Make in India',
      support: 'Indigenous sensors + open-source tools',
      color: '#00C853'
    },
    {
      goal: 'Smart Cities Mission',
      support: 'Plug into city control rooms via dashboards',
      color: '#2196F3'
    },
    {
      goal: 'Swachh Bharat 2.0',
      support: 'Air cleanliness index for districts',
      color: '#4CAF50'
    },
    {
      goal: 'Ayushman Bharat',
      support: 'Predict & alert air-health crises',
      color: '#9C27B0'
    },
    {
      goal: 'PM Gati Shakti',
      support: 'Geo-map AQI with logistics & infra planning',
      color: '#FF5722'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Satellite className="w-12 h-12 text-[#00C853] animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00C853] via-[#FF6F00] to-[#2196F3] bg-clip-text text-transparent">
              VayuRakshak 2030
            </h2>
            <Globe className="w-12 h-12 text-[#FF6F00] animate-spin" />
          </div>
          <p className="text-xl md:text-2xl text-[#263238] mb-4 font-semibold">
            India's AI-Powered Environmental Guardian
          </p>
          <p className="text-lg text-[#263238]/70 max-w-4xl mx-auto leading-relaxed">
            "Empowering Bharat to breathe cleaner, live longer, and act smarter — with AI, satellites, and local data at your fingertips."
          </p>
          <div className="flex justify-center mt-6">
            <Badge className="bg-gradient-to-r from-[#00C853] to-[#FF6F00] text-white px-6 py-2 text-lg animate-pulse">
              <Target className="w-4 h-4 mr-2" />
              2030-Ready Platform
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="core-features" className="mb-16">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm mb-8">
            <TabsTrigger value="core-features" className="data-[state=active]:bg-[#00C853] data-[state=active]:text-white">
              Core Features
            </TabsTrigger>
            <TabsTrigger value="innovation-lab" className="data-[state=active]:bg-[#FF6F00] data-[state=active]:text-white">
              Innovation Lab
            </TabsTrigger>
            <TabsTrigger value="digital-india" className="data-[state=active]:bg-[#2196F3] data-[state=active]:text-white">
              Digital India
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-[#9C27B0] data-[state=active]:text-white">
              2030 Roadmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="core-features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <Card 
                  key={feature.id}
                  className={`p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer animate-fade-in ${
                    activeFeature === feature.id ? 'border-[#00C853] shadow-xl scale-105' : 'border-white/50'
                  }`}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <feature.icon 
                      className="w-8 h-8 animate-pulse" 
                      style={{ color: feature.color }} 
                    />
                    <Badge 
                      className={`text-xs ${
                        feature.status === 'active' ? 'bg-green-100 text-green-800' :
                        feature.status === 'development' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {feature.status === 'active' ? 'Live' : 
                       feature.status === 'development' ? 'In Dev' : 'Coming Soon'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#263238] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#263238]/70 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-xs text-[#00C853] font-semibold">
                    🇮🇳 {feature.alignment}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="innovation-lab" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#263238] mb-4 flex items-center justify-center space-x-2">
                <Zap className="w-6 h-6 text-[#FF6F00]" />
                <span>15+ Future-Proof Innovations</span>
                <Sparkles className="w-6 h-6 text-[#FF6F00]" />
              </h3>
              <p className="text-lg text-[#263238]/70">
                Next-generation features aligned with Digital India 2030
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {innovativeFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-4 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/50 hover:shadow-lg hover:scale-105 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <feature.icon 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ color: feature.color }} 
                    />
                    <h4 className="font-semibold text-[#263238] text-sm leading-tight">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#263238]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="digital-india" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#263238] mb-4">
                🇮🇳 Digital India & Make-in-India Alignment
              </h3>
              <p className="text-lg text-[#263238]/70">
                How VayuRakshak supports national missions and initiatives
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalIndiaAlignment.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border-2 border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                    <h4 className="font-bold text-[#263238]">
                      {item.goal}
                    </h4>
                  </div>
                  <p className="text-sm text-[#263238]/70 leading-relaxed">
                    {item.support}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#263238] mb-4">
                🛣️ VayuRakshak 2030 Development Roadmap
              </h3>
              <p className="text-lg text-[#263238]/70">
                From concept to India's premier environmental intelligence platform
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00C853] via-[#FF6F00] to-[#2196F3]"></div>
              
              <div className="space-y-8 ml-16">
                {[
                  { phase: "Phase 1: Foundation (2024)", items: ["Core AQI mapping", "WAQI API integration", "Basic forecasting"], color: "#00C853" },
                  { phase: "Phase 2: Intelligence (2025)", items: ["AI/ML predictions", "VayuGuard alerts", "Mobile PWA launch"], color: "#FF6F00" },
                  { phase: "Phase 3: Integration (2026-27)", items: ["Government dashboards", "ISRO satellite data", "Rural expansion"], color: "#2196F3" },
                  { phase: "Phase 4: Ecosystem (2028-29)", items: ["AyurAQI wellness", "IoT sensor network", "Policy AI copilot"], color: "#9C27B0" },
                  { phase: "Phase 5: Vision 2030", items: ["National deployment", "International expansion", "AI environmental governance"], color: "#E91E63" }
                ].map((phase, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border-l-4 hover:shadow-xl transition-all duration-300 animate-slide-in-right"
                    style={{ 
                      borderLeftColor: phase.color,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      />
                      <h4 className="text-lg font-bold text-[#263238]">
                        {phase.phase}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2 text-sm text-[#263238]/70">
                          <div className="w-2 h-2 rounded-full bg-[#00C853]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#00C853]/10 via-[#FF6F00]/10 to-[#2196F3]/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-[#263238] mb-4">
              Join the VayuRakshak Revolution
            </h3>
            <p className="text-lg text-[#263238]/70 mb-6 max-w-3xl mx-auto">
              Be part of India's journey towards cleaner air and smarter environmental intelligence. 
              Together, we'll build the 2030-ready platform that Bharat deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#00C853] to-[#00A844] hover:from-[#00A844] hover:to-[#00C853] text-white px-8 py-3 text-lg">
                <Users className="w-5 h-5 mr-2" />
                Become a VayuFellow
              </Button>
              <Button variant="outline" className="border-[#FF6F00] text-[#FF6F00] hover:bg-[#FF6F00] hover:text-white px-8 py-3 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Support the Mission
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
