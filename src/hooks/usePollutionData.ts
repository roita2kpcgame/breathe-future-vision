import { useState, useEffect, useCallback } from 'react';
import { fetchPollutionData, initialCitiesData, type City } from '@/data/cities';

export const usePollutionData = () => {
  const [cities, setCities] = useState<City[]>(initialCitiesData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadPollutionData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Starting to fetch pollution data...');
      const updatedCities = await fetchPollutionData();
      console.log('Fetched cities data:', updatedCities.length, 'cities');
      setCities(updatedCities);
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (error) {
      console.error('Failed to load pollution data:', error);
      setError('Failed to fetch real-time data, showing cached data');
      setRetryCount(prev => prev + 1);
      // Keep using initial data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPollutionData();
    
    // More frequent updates - every 10 minutes for better accuracy
    const interval = setInterval(loadPollutionData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [loadPollutionData]);

  // Auto-retry failed requests with exponential backoff
  useEffect(() => {
    if (error && retryCount < 3) {
      const retryTimeout = setTimeout(() => {
        loadPollutionData();
      }, Math.pow(2, retryCount) * 5000); // 5s, 10s, 20s delays
      
      return () => clearTimeout(retryTimeout);
    }
  }, [error, retryCount, loadPollutionData]);

  return {
    cities,
    loading,
    lastUpdated,
    error,
    refreshData: loadPollutionData,
    retryCount
  };
};
