import { useState, useEffect } from 'react';
import { fetchPollutionData, initialCitiesData, type City } from '@/data/cities';

export const usePollutionData = () => {
  const [cities, setCities] = useState<City[]>(initialCitiesData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadPollutionData = async () => {
    setLoading(true);
    try {
      const updatedCities = await fetchPollutionData();
      setCities(updatedCities);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load pollution data:', error);
      // Keep using initial data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPollutionData();
    
    // Refresh data every 15 minutes
    const interval = setInterval(loadPollutionData, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    cities,
    loading,
    lastUpdated,
    refreshData: loadPollutionData
  };
};
