
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Camera, 
  Shield, 
  Target, 
  Smartphone, 
  Leaf, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

export const UniqueTools = () => {
  const [selectedTool, setSelectedTool] = useState('air-scanner');

  const tools = [
    {
      id: 'air-scanner',
      title: 'AI Air Scanner',
      description: 'Scan your environment using your camera to get instant air quality analysis',
      icon: Camera,
      color: '#00C853',
      features: ['Real-time visual analysis', 'Particulate detection', 'Health risk assessment']
    },
    {
      id: 'health-shield',
      title: 'Personal Health Shield',
      description: 'Personalized protection recommendations based on your health profile',
      icon: Shield,
      color: '#2196F3',
      features: ['Custom health alerts', 'Activity recommendations', 'Medical condition support']
    },
    {
      id: 'pollution-predictor',
      title: 'Pollution Time Machine',
      description: 'Predict air quality for any location and time using advanced AI models',
      icon: Brain,
      color: '#FF6F00',
      features: ['7-day forecasts', 'Hourly predictions', 'Event impact analysis']
    },
    {
      id: 'eco-advisor',
      title: 'Eco Impact Advisor',
      description: 'Track your carbon footprint and get personalized sustainability tips',
      icon: Leaf,
      color: '#4CAF50',
      features: ['Carbon tracking', 'Green alternatives', 'Community challenges']
    }
  ];

  const realtimeMetrics = [
    { label: 'Cities Monitored', value: '150+', trend: '+12%' },
    { label: 'Data Points/Hour', value: '50K+', trend: '+25%' },
    { label: 'AI Predictions', value: '99.2%', trend: '+0.3%' },
    { label: 'Users Protected', value: '2M+', trend: '+40%' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#E3F2FD] to-[#E8F5E8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            Future-Proof Tools
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Advanced AI-powered tools designed to keep you ahead of air pollution challenges
          </p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {realtimeMetrics.map((metric, index) => (
            <Card key={index} className="p-4 text-center bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="text-2xl font-bold text-[#00C853] mb-1">{metric.value}</div>
              <div className="text-sm text-[#263238]/70 mb-2">{metric.label}</div>
              <Badge className="bg-green-100 text-green-800 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {metric.trend}
              </Badge>
            </Card>
          ))}
        </div>

        {/* AI Tools Showcase */}
        <Tabs value={selectedTool} onValueChange={setSelectedTool} className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-white/50">
            {tools.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col items-center p-4">
                <tool.icon className="w-6 h-6 mb-2" style={{ color: tool.color }} />
                <span className="text-xs font-medium">{tool.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="p-3 rounded-2xl"
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#263238]">{tool.title}</h3>
                        <Badge style={{ backgroundColor: tool.color, color: 'white' }}>
                          AI Powered
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[#263238]/70 mb-6">{tool.description}</p>
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }}></div>
                          <span className="text-sm text-[#263238]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="rounded-full px-8"
                      style={{ backgroundColor: tool.color }}
                    >
                      Try {tool.title}
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4" style={{ color: tool.color }}>
                      <tool.icon className="w-24 h-24 mx-auto animate-pulse" />
                    </div>
                    <p className="text-sm text-[#263238]/70">
                      Interactive demo coming soon
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Multi-AI Integration Showcase */}
        <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#263238] mb-4">Multi-AI Intelligence</h3>
            <p className="text-[#263238]/70 max-w-2xl mx-auto">
              Powered by the world's most advanced AI models for unprecedented accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/80 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#263238] mb-2">ChatGPT Integration</h4>
              <p className="text-sm text-[#263238]/70">Natural language processing for intuitive interactions</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#263238] mb-2">Gemini AI</h4>
              <p className="text-sm text-[#263238]/70">Advanced reasoning for complex environmental analysis</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#263238] mb-2">Copilot AI</h4>
              <p className="text-sm text-[#263238]/70">Code assistance for custom environmental solutions</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
