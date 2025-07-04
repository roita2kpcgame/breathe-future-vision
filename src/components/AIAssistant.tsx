
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, Zap, Brain, Search, X } from 'lucide-react';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m AakaashSetu AI. I can help you with air quality predictions, health recommendations, and environmental insights. What would you like to know?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'air quality': 'Based on current satellite data, PM2.5 levels in your area are moderate (35 μg/m³). I recommend limiting outdoor activities between 2-6 PM when pollution peaks.',
    'prediction': 'AI Forecast: Air quality will improve by 15% tomorrow due to incoming wind patterns. Best outdoor time: 6-9 AM.',
    'health': 'Health Alert: Current AQI suggests wearing N95 masks outdoors. Stay hydrated and consider indoor exercises today.',
    'weather': 'Weather Impact: Rain expected in 2 hours will help clear particulate matter. AQI should drop to \'Good\' category by evening.',
    'location': 'Location Analysis: Your area shows 23% higher pollution than city average. Consider air purifiers and indoor plants.',
    'solutions': 'Smart Solutions: 1) Use public transport 2) Plant air-purifying plants 3) Support clean energy initiatives 4) Report pollution sources'
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowercaseInput = inputValue.toLowerCase();
      let response = 'I understand your query. Based on real-time satellite data and AI analysis, I\'m processing the best recommendations for you.';
      
      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowercaseInput.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: 'Air Quality Now', icon: Zap, action: () => setInputValue('What is the current air quality?') },
    { label: 'Health Advice', icon: Brain, action: () => setInputValue('Give me health recommendations') },
    { label: 'Tomorrow Forecast', icon: Search, action: () => setInputValue('What is tomorrow\'s air quality prediction?') }
  ];

  return (
    <>
      {/* Floating AI Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00C853] to-[#FF6F00] hover:shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </Button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 z-40 animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#00C853]/10 to-[#FF6F00]/10 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00C853] to-[#FF6F00] rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#263238]">AakaashSetu AI</h3>
                <p className="text-xs text-[#263238]/70">Real-time Air Quality Intelligence</p>
              </div>
              <Badge className="ml-auto bg-[#00C853] text-white">Online</Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-[300px] overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-[#00C853] text-white' 
                    : 'bg-gray-100 text-[#263238]'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-2 border-t border-gray-200">
            <div className="flex space-x-2 mb-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs hover:bg-[#00C853]/10"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about air quality, health tips..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-[#00C853] hover:bg-[#00C853]/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
