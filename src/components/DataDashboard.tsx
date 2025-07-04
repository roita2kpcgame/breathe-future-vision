
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const timeSeriesData = [
  { time: '00:00', pm25: 45, pm10: 67 },
  { time: '04:00', pm25: 52, pm10: 78 },
  { time: '08:00', pm25: 89, pm10: 134 },
  { time: '12:00', pm25: 76, pm10: 112 },
  { time: '16:00', pm25: 94, pm10: 145 },
  { time: '20:00', pm25: 67, pm10: 98 }
];

const cityData = [
  { city: 'Delhi', value: 156 },
  { city: 'Mumbai', value: 89 },
  { city: 'Kolkata', value: 134 },
  { city: 'Chennai', value: 78 },
  { city: 'Bangalore', value: 67 }
];

export const DataDashboard = () => {
  return (
    <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#263238] mb-4">
            Real-time Analytics
          </h2>
          <p className="text-xl text-[#263238]/70 max-w-3xl mx-auto">
            Advanced data visualization combining satellite observations with ground truth measurements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-bold text-[#263238] mb-4">24-Hour PM2.5 Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#263238" opacity={0.2} />
                <XAxis dataKey="time" stroke="#263238" />
                <YAxis stroke="#263238" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="pm25" 
                  stroke="#FF6F00" 
                  strokeWidth={3}
                  dot={{ fill: '#FF6F00', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-bold text-[#263238] mb-4">City Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#263238" opacity={0.2} />
                <XAxis dataKey="city" stroke="#263238" />
                <YAxis stroke="#263238" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="value" fill="#00C853" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="text-3xl font-bold text-[#00C853] mb-2">98.5%</div>
            <div className="text-[#263238]/70">Model Accuracy</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="text-3xl font-bold text-[#FF6F00] mb-2">247</div>
            <div className="text-[#263238]/70">Active Sensors</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="text-3xl font-bold text-[#00C853] mb-2">15min</div>
            <div className="text-[#263238]/70">Update Frequency</div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="text-3xl font-bold text-[#FF6F00] mb-2">500k+</div>
            <div className="text-[#263238]/70">Data Points/Day</div>
          </Card>
        </div>
      </div>
    </section>
  );
};
