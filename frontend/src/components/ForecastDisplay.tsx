'use client';

import { ForecastData } from '@/types/weather';

interface ForecastDisplayProps {
  forecast: ForecastData;
}

// Weather condition backgrounds (simplified subset for forecast)
const weatherBackgrounds: Record<string, string> = {
  Clear: 'from-blue-400 to-cyan-300',
  Clouds: 'from-blue-300 to-gray-300',
  Rain: 'from-blue-600 to-gray-500',
  Drizzle: 'from-blue-500 to-gray-400',
  Thunderstorm: 'from-indigo-700 to-gray-600',
  Snow: 'from-blue-100 to-gray-200',
  Mist: 'from-gray-300 to-gray-400',
};

export default function ForecastDisplay({ forecast }: ForecastDisplayProps) {
  // Check if forecast data has the expected structure
  if (!forecast || !forecast.list || !Array.isArray(forecast.list) || forecast.list.length === 0) {
    // Return a fallback UI when data is incomplete
    return (
      <div className="mb-10 p-8 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Forecast data is incomplete or in an unexpected format. Please try searching again.
        </p>
      </div>
    );
  }

  // Helper function to format date with error handling
  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Helper function to format time with error handling
  const formatTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '--:--';
    }
  };

  // Safely group forecast items by day with error handling
  let groupedForecast: Record<string, any[]> = {};
  try {
    groupedForecast = forecast.list.reduce((acc, item) => {
      if (!item || !item.dt) return acc;
      
      const date = formatDate(item.dt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  } catch (error) {
    console.error('Error processing forecast data:', error);
    return (
      <div className="mb-10 p-8 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Error processing forecast data. Please try again later.
        </p>
      </div>
    );
  }

  // Get daily forecasts (first 5 days or all if fewer)
  const dailyForecasts = Object.keys(groupedForecast).slice(0, 5);

  // Debug forecast data structure
  console.log('Forecast data structure:', forecast);

  // If no daily forecasts were extracted, show a message
  if (dailyForecasts.length === 0) {
    return (
      <div className="mb-10 p-8 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Could not extract daily forecast data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          5-Day Forecast
        </h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4 md:space-x-6">
            {dailyForecasts.map(date => {
              const dayData = groupedForecast[date];
              if (!dayData || dayData.length === 0) return null;
              
              // Get the data for noon or the middle of the day as representative
              const midDayIndex = Math.floor(dayData.length / 2);
              const midDayData = dayData[midDayIndex] || {};
              const main = midDayData.main || {};
              const weather = midDayData.weather || [{ main: 'Clear', description: 'Unknown', icon: '01d' }];
              const weatherCondition = weather[0] || { main: 'Clear', description: 'Unknown', icon: '01d' };
              
              // Get background gradient based on weather condition with fallback
              const bgGradient = weatherBackgrounds[weatherCondition.main] || 'from-blue-500 to-indigo-500';
              
              return (
                <div key={date} className="flex-shrink-0 w-36 md:w-44 group">
                  <div className={`h-full rounded-xl overflow-hidden shadow-md bg-gradient-to-br ${bgGradient} text-white group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1`}>
                    <div className="p-4">
                      <h4 className="font-bold text-center mb-1">{date}</h4>
                      <div className="flex justify-center">
                        <img 
                          src={`https://openweathermap.org/img/wn/${weatherCondition.icon || '01d'}@2x.png`} 
                          alt={weatherCondition.description || 'Weather icon'} 
                          className="w-20 h-20 my-2 drop-shadow-md"
                        />
                      </div>
                      <p className="text-center text-sm opacity-90 mb-2">
                        {weatherCondition.description 
                          ? weatherCondition.description.charAt(0).toUpperCase() + weatherCondition.description.slice(1)
                          : 'Unknown weather'}
                      </p>
                      <div className="flex justify-around mt-3">
                        <div className="text-center">
                          <span className="text-xs opacity-80">High</span>
                          <p className="text-xl font-bold">{Math.round(main.temp_max || 0)}°</p>
                        </div>
                        <div className="text-center">
                          <span className="text-xs opacity-80">Low</span>
                          <p className="text-xl">{Math.round(main.temp_min || 0)}°</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Hourly Forecast
        </h3>
        <div className="overflow-x-auto rounded-xl">
          <div className="inline-block min-w-full rounded-xl overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                    Time
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                    Weather
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                    Temp
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                    Wind
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-300 px-6 py-4 text-left">
                    Humidity
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecast.list.slice(0, 8).map((item, index) => {
                  // Skip invalid forecast items
                  if (!item || !item.dt || !item.main || !item.weather || !item.weather[0]) {
                    return null;
                  }
                  
                  const weatherItem = item.weather[0] || {};
                  const mainData = item.main || {};
                  const windData = item.wind || { speed: 0 };
                  
                  return (
                    <tr 
                      key={item.dt} 
                      className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} 
                      border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                        {formatTime(item.dt)}
                      </td>
                      <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                        <img 
                          src={`https://openweathermap.org/img/wn/${weatherItem.icon || '01d'}.png`} 
                          alt={weatherItem.description || 'Weather icon'} 
                          className="w-10 h-10 mr-2"
                        />
                        <span>{weatherItem.main || 'Unknown'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                        <span className="font-semibold">{Math.round(mainData.temp || 0)}°C</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {Math.round((windData.speed || 0) * 3.6)} km/h
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14a7 7 0 01-7 7m-7-7a7 7 0 017-7m7 7H5"></path>
                          </svg>
                          {mainData.humidity || 0}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}