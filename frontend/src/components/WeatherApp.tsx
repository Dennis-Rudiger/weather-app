'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherDisplay from '@/components/WeatherDisplay';
import ForecastDisplay from '@/components/ForecastDisplay';
import { WeatherData, ForecastData } from '@/types/weather';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function WeatherApp() {
  const [city, setCity] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
    setLoading(true);
    setError(null);

    try {
      // Get current weather
      const currentWeatherResponse = await fetch(
        `${apiBaseUrl}/weather/current?city=${encodeURIComponent(searchCity)}&units=metric`
      );
      
      if (!currentWeatherResponse.ok) {
        throw new Error(`Error fetching current weather: ${currentWeatherResponse.statusText}`);
      }
      
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentWeather(currentWeatherData);
      
      // Get forecast
      const forecastResponse = await fetch(
        `${apiBaseUrl}/weather/forecast?city=${encodeURIComponent(searchCity)}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Error fetching forecast: ${forecastResponse.statusText}`);
      }
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/70 backdrop-blur-md dark:bg-gray-800/70 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        <div className="px-6 py-8 md:px-10 md:py-10">
          <SearchBar onSearch={handleSearch} />
          
          {loading && (
            <div className="flex justify-center my-12">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-200 dark:border-blue-900 opacity-25"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 dark:border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="my-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {currentWeather && !loading && (
            <div className="animate-fadeIn">
              <WeatherDisplay weather={currentWeather} />
            </div>
          )}
          
          {forecast && !loading && (
            <div className="animate-slideUp">
              <ForecastDisplay forecast={forecast} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}