import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { City } from '@/data/cities';
import { useMemo } from 'react';

interface CityComparisonProps {
  selectedCity: City;
  allCities: City[];
}

export const CityComparison = ({ selectedCity, allCities }: CityComparisonProps) => {
  // Find neighboring cities (same state or nearby based on coordinates)
  const neighboringCities = useMemo(() => {
    const neighbors = allCities
      .filter(city => city.name !== selectedCity.name)
      .map(city => {
        // Calculate distance (simple Euclidean distance for demo)
        const distance = Math.sqrt(
          Math.pow(city.coordinates[0] - selectedCity.coordinates[0], 2) +
          Math.pow(city.coordinates[1] - selectedCity.coordinates[1], 2)
        );
        return { ...city, distance };
      })
      .sort((a, b) => {
        // Prioritize same state, then by distance
        if (a.state === selectedCity.state && b.state !== selectedCity.state) return -1;
        if (a.state !== selectedCity.state && b.state === selectedCity.state) return 1;
        return a.distance - b.distance;
      })
      .slice(0, 5); // Get top 5 neighbors

    return [selectedCity, ...neighbors];
  }, [selectedCity, allCities]);

  // Prepare data for different pollutants
  const pm25Data = neighboringCities.map(city => ({
    name: city.name,
    PM2_5: city.pm25 || 0,
  }));

  const pm10Data = neighboringCities.map(city => ({
    name: city.name,
    PM10: city.pm10 || 0,
  }));

  const gaseousData = neighboringCities.map(city => ({
    name: city.name,
    NO2: city.no2 || 0,
    O3: city.o3 || 0,
    SO2: city.so2 || 0,
    CO: city.co || 0,
  }));

  const aqiData = neighboringCities.map(city => ({
    name: city.name,
    AQI: city.actualAqi || 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          City Pollution Comparison
        </h2>
        <p className="text-muted-foreground">
          Comparing {selectedCity.name} with neighboring cities
        </p>
      </div>

      {/* AQI Comparison */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Overall AQI Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aqiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="AQI" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Particulate Matter Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌫️</span>
              PM2.5 Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pm25Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="PM2_5" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💨</span>
              PM10 Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pm10Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="PM10" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gaseous Pollutants Comparison */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">⚗️</span>
            Gaseous Pollutants (NO₂, O₃, SO₂, CO)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={gaseousData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="NO2" fill="hsl(var(--chart-3))" />
              <Bar dataKey="O3" fill="hsl(var(--chart-4))" />
              <Bar dataKey="SO2" fill="hsl(var(--chart-5))" />
              <Bar dataKey="CO" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
