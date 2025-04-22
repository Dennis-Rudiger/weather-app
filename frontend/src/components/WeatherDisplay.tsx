'use client';

import { useState, useEffect, useMemo } from 'react';
import { WeatherData } from '@/types/weather';
import { ReactNode } from 'react';

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
  Mist: 'from-gray-300 to-gray-400 dark:from-gray-800 dark:from-gray-700',
  Smoke: 'from-gray-500 to-gray-600 dark:from-gray-900 dark:to-gray-800',
  Haze: 'from-yellow-200 to-gray-300 dark:from-yellow-800 dark:to-gray-700',
  Dust: 'from-yellow-300 to-gray-400 dark:from-yellow-900 dark:to-gray-800',
  Fog: 'from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700',
  Sand: 'from-yellow-400 to-gray-400 dark:from-yellow-900 dark:to-gray-800',
  Ash: 'from-gray-500 to-gray-600 dark:from-gray-900 dark:to-gray-800',
  Squall: 'from-blue-600 to-gray-500 dark:from-blue-950 dark:to-gray-900',
  Tornado: 'from-red-700 to-gray-700 dark:from-red-950 dark:to-gray-900',
};

// Format time function (moved to be accessible to all components)
const formatTime = (timestamp: number): string => {
  if (!timestamp) return '--:--';
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    return '--:--';
  }
};

// Dynamic weather animations
type WeatherAnimationFunction = (isDay?: boolean) => ReactNode;
const weatherAnimations: Record<string, WeatherAnimationFunction> = {
  Clear: (isDay = true): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {isDay ? (
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-yellow-300 animate-pulse-slow opacity-70 blur-md"></div>
      ) : (
        <>
          <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gray-300 opacity-70 blur-sm"></div>
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </>
      )}
    </div>
  ),
  Clouds: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white dark:bg-gray-300 rounded-full opacity-20 animate-float"
          style={{ 
            width: `${Math.random() * 100 + 80}px`, 
            height: `${Math.random() * 60 + 40}px`,
            top: `${Math.random() * 50}%`, 
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 20}s`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  ),
  Rain: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-0.5 bg-blue-200 dark:bg-blue-300 animate-rain"
          style={{ 
            height: `${Math.random() * 20 + 10}px`, 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.2,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  ),
  Snow: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 bg-white dark:bg-blue-100 rounded-full animate-snow"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  ),
  Thunderstorm: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animate-lightning"></div>
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-0.5 bg-blue-300 dark:bg-blue-400 animate-rain"
          style={{ 
            height: `${Math.random() * 20 + 10}px`, 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.2,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  ),
  Drizzle: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-0.5 bg-blue-200 dark:bg-blue-300 animate-rain"
          style={{ 
            height: `${Math.random() * 10 + 5}px`, 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
            animationDuration: `${Math.random() * 1 + 0.8}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  ),
  Mist: (): ReactNode => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white dark:bg-gray-300 rounded-full blur-md opacity-20 animate-float-slow"
          style={{ 
            width: `${Math.random() * 200 + 100}px`, 
            height: `${Math.random() * 80 + 40}px`,
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 60 + 30}s`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  ),
};

// Component for temperature indicator
const TemperatureIndicator = ({ temp }: { temp: number }) => {
  // Determine color based on temperature
  let color = 'bg-blue-500';
  if (temp > 30) color = 'bg-red-500';
  else if (temp > 20) color = 'bg-orange-500';
  else if (temp > 10) color = 'bg-yellow-500';
  else if (temp <= 0) color = 'bg-blue-700';
  
  // Height percentage based on temperature (0-40°C range)
  const heightPercent = Math.min(Math.max((temp + 10) * 2, 0), 100);
  
  return (
    <div className="relative w-3 h-16 bg-white/30 dark:bg-black/30 rounded-full overflow-hidden">
      <div 
        className={`absolute bottom-0 w-full rounded-t-full transition-all duration-1000 ease-out ${color}`} 
        style={{ height: `${heightPercent}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white drop-shadow-md">
        {Math.round(temp)}°
      </div>
    </div>
  );
};

// Component for wind direction indicator
const WindDirectionIndicator = ({ speed, degrees }: { speed: number, degrees: number }) => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute w-10 h-10 rounded-full border border-white/30 dark:border-white/20"></div>
      <div 
        className="absolute w-0.5 h-5 bg-white/80 dark:bg-white/70 rounded-full origin-bottom transform transition-transform duration-1000"
        style={{ transform: `rotate(${degrees}deg) translateY(-4px)` }}
      ></div>
      <div 
        className="absolute w-1.5 h-1.5 bg-white/80 dark:bg-white/70 rounded-full transform transition-transform duration-1000"
        style={{ 
          transform: `rotate(${degrees}deg) translateY(-7px)`,
          borderRadius: '50% 50% 0 0'
        }}
      ></div>
      <div className="text-[8px] text-white/70 mt-8">{Math.round(speed)} km/h</div>
    </div>
  );
};

// Component for humidity indicator
const HumidityIndicator = ({ humidity }: { humidity: number }) => {
  return (
    <div className="relative w-full h-3 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 dark:bg-blue-400 rounded-r-full transition-all duration-1000 ease-out"
        style={{ width: `${humidity}%` }}
      ></div>
    </div>
  );
};

// Component for day/night cycle
const DayNightCycleIndicator = ({ 
  current, 
  sunrise, 
  sunset 
}: { 
  current: number, 
  sunrise: number, 
  sunset: number 
}) => {
  // Calculate the progress of the day (0% = sunrise, 100% = sunset)
  const dayLength = sunset - sunrise;
  let progress = 0;
  
  if (current > sunrise && current < sunset) {
    // It's daytime
    progress = ((current - sunrise) / dayLength) * 100;
  } else if (current < sunrise) {
    // Before sunrise (night)
    const nightLength = sunrise + 86400 - sunset;
    progress = ((current + 86400 - sunset) / nightLength) * 100;
  } else {
    // After sunset (night)
    const nightLength = sunrise + 86400 - sunset;
    progress = ((current - sunset) / nightLength) * 100;
  }
  
  const isDaytime = current > sunrise && current < sunset;
  
  return (
    <div className="w-full">
      <div className="relative w-full h-6 bg-gradient-to-r from-indigo-900 via-orange-300 to-indigo-900 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-transparent to-indigo-900/80"></div>
        <div 
          className={`absolute top-0 h-6 w-6 rounded-full transform transition-all duration-1000 ease-linear ${isDaytime ? 'bg-yellow-300' : 'bg-gray-300'}`}
          style={{ left: `calc(${progress}% - 12px)` }}
        ></div>
      </div>
      <div className="flex justify-between text-[10px] mt-1 text-white/80">
        <span>{formatTime(sunrise)}</span>
        <span>{formatTime(sunset)}</span>
      </div>
    </div>
  );
};

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const [currentTime, setCurrentTime] = useState<number>(Math.floor(Date.now() / 1000));

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

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
  
  // Get the weather icon with fallback
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon || '01d'}@4x.png`;
  
  // Get background gradient based on weather condition
  const bgGradient = weatherBackgrounds[condition.main] || 'from-blue-500 to-indigo-500 dark:from-blue-800 dark:to-indigo-900';

  // Check if it's day or night based on icon code (d/n suffix)
  const isDay = (condition.icon || '').includes('d');
  
  // Get weather animation based on condition
  const weatherAnimation = useMemo(() => {
    const animationFn = weatherAnimations[condition.main];
    if (animationFn) {
      return animationFn(isDay);
    }
    return null;
  }, [condition.main, isDay]);

  return (
    <div className="mb-10 overflow-hidden rounded-xl">
      <div className={`relative bg-gradient-to-r ${bgGradient} shadow-lg text-white dark:text-gray-100`}>
        {/* Dynamic weather animation */}
        {weatherAnimation}
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 p-6 md:p-8">
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
              <div className="flex items-center gap-4 my-4">
                <div className="text-7xl font-bold">{Math.round(temp)}°</div>
                <TemperatureIndicator temp={temp} />
              </div>
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
        
        {/* Day/night cycle indicator */}
        <div className="px-6 md:px-8 pb-4">
          <DayNightCycleIndicator 
            current={currentTime} 
            sunrise={sys.sunrise} 
            sunset={sys.sunset} 
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-4 md:p-6 bg-black/10 dark:bg-white/5 backdrop-blur-sm">
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Humidity</span>
            <div className="flex items-center mt-1 w-full">
              <svg className="w-5 h-5 mr-1 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14a7 7 0 01-7 7m-7-7a7 7 0 017-7m7 7H5"></path>
              </svg>
              <span className="text-xl font-semibold mr-2">{humidity}%</span>
            </div>
            <div className="w-full mt-2">
              <HumidityIndicator humidity={humidity} />
            </div>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Wind</span>
            <WindDirectionIndicator speed={(wind.speed || 0) * 3.6} degrees={wind.deg || 0} />
          </div>
          
          <div className="flex flex-col items-center p-3 bg-white/10 dark:bg-black/20 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
            <span className="text-xs uppercase tracking-wider opacity-80">Pressure</span>
            <div className="flex items-center mt-1">
              <svg className="w-5 h-5 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-xl font-semibold">{pressure} hPa</span>
            </div>
            <div className="mt-2 w-full bg-white/20 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 dark:bg-green-400 transition-all duration-1000"
                style={{ width: `${(pressure - 950) / 150 * 100}%` }}
              ></div>
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