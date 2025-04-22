'use client';

import { WeatherData } from '@/types/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
}

// Weather condition backgrounds
const weatherBackgrounds: Record<string, string> = {
  Clear: 'from-blue-400 to-cyan-300 dark:from-blue-800 dark:to-cyan-900',
  Clouds: 'from-blue-300 to-gray-300 dark:from-blue-900 dark:to-gray-800',
  Rain: 'from-blue-600 to-gray-500 dark:from-blue-950 dark:to-gray-900',
  Drizzle: 'from-blue-500 to-gray-400 dark:from-blue-900 dark:to-gray-800',
  Thunderstorm: 'from-indigo-900 to-gray-700 dark:from-indigo-950 dark:to-gray-900',
  Snow: 'from-blue-100 to-gray-200 dark:from-blue-800 dark:to-gray-600',
  Mist: 'from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700',
  Smoke: 'from-gray-500 to-gray-600 dark:from-gray-900 dark:to-gray-800',
  Haze: 'from-yellow-200 to-gray-300 dark:from-yellow-800 dark:to-gray-700',
  Dust: 'from-yellow-300 to-gray-400 dark:from-yellow-900 dark:to-gray-800',
  Fog: 'from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700',
  Sand: 'from-yellow-400 to-gray-400 dark:from-yellow-900 dark:to-gray-800',
  Ash: 'from-gray-500 to-gray-600 dark:from-gray-900 dark:to-gray-800',
  Squall: 'from-blue-600 to-gray-500 dark:from-blue-950 dark:to-gray-900',
  Tornado: 'from-red-700 to-gray-700 dark:from-red-950 dark:to-gray-900',
};

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  // Check if weather data has the expected structure
  if (!weather || !weather.main || !weather.weather || !weather.weather[0]) {
    // Return a fallback UI when data is incomplete
    return (
      <div className="mb-10 p-8 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Weather data is incomplete or in an unexpected format. Please try searching again.
        </p>
      </div>
    );
  }

  // Safely extract the data from the weather object with fallbacks
  const name = weather.name || 'Unknown Location';
  const main = weather.main || {};
  const conditions = weather.weather || [];
  const wind = weather.wind || { speed: 0, deg: 0 };
  const sys = weather.sys || { country: '', sunrise: 0, sunset: 0 };
  
  // Safely destructure from main with default values
  const {
    temp = 0,
    feels_like = 0,
    temp_min = 0,
    temp_max = 0,
    humidity = 0,
    pressure = 0
  } = main;
  
  // Check if conditions array is not empty
  const condition = conditions.length > 0 ? conditions[0] : { main: 'Clear', description: 'Unknown', icon: '01d' };
  
  // Helper function to format timestamps to readable time
  const formatTime = (timestamp: number) => {
    if (!timestamp) return '--:--';
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '--:--';
    }
  };

  // Get the weather icon with fallback
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon || '01d'}@4x.png`;
  
  // Get background gradient based on weather condition
  const bgGradient = weatherBackgrounds[condition.main] || 'from-blue-500 to-indigo-500 dark:from-blue-800 dark:to-indigo-900';

  // Debug weather data format (log to console for debugging)
  console.log('Weather data structure:', weather);

  return (
    <div className="mb-10 overflow-hidden rounded-xl">
      <div className={`bg-gradient-to-r ${bgGradient} shadow-lg text-white dark:text-gray-100`}>
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-3xl font-bold">{name}</h2>
                {sys.country && (
                  <span className="ml-2 text-xl bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">{sys.country}</span>
                )}
              </div>
              <p className="text-lg mt-1 opacity-90">
                {condition.description && condition.description.charAt(0).toUpperCase() + condition.description.slice(1)}
              </p>
              <div className="text-7xl font-bold my-4">{Math.round(temp)}°</div>
              <p className="text-lg opacity-90">Feels like: {Math.round(feels_like)}°</p>
            </div>
            
            <div className="mt-6 flex gap-3">
              <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg px-3 py-1">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
                <span>{Math.round(temp_max)}°</span>
              </div>
              <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg px-3 py-1">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span>{Math.round(temp_min)}°</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
            <img 
              src={iconUrl} 
              alt={condition.description || 'Weather icon'} 
              className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-lg transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-4 md:p-6 bg-black/10 dark:bg-white/5 backdrop-blur-sm">
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Humidity</span>
            <div className="flex items-center mt-1">
              <svg className="w-5 h-5 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14a7 7 0 01-7 7m-7-7a7 7 0 017-7m7 7H5"></path>
              </svg>
              <span className="text-xl font-semibold">{humidity}%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Wind</span>
            <div className="flex items-center mt-1">
              <svg className="w-5 h-5 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-xl font-semibold">{Math.round((wind.speed || 0) * 3.6)} km/h</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Pressure</span>
            <div className="flex items-center mt-1">
              <svg className="w-5 h-5 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-xl font-semibold">{pressure} hPa</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Sun</span>
            <div className="flex flex-col items-center mt-1">
              <div className="flex items-center mb-1">
                <span className="mr-1">🌅</span>
                <span className="text-sm">{formatTime(sys.sunrise)}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">🌇</span>
                <span className="text-sm">{formatTime(sys.sunset)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}