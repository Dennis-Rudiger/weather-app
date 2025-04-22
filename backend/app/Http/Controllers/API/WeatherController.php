<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherController extends Controller
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openweathermap.org/data/2.5';

    public function __construct()
    {
        // Get key directly from env for testing
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    /**
     * Get current weather for a location
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCurrentWeather(Request $request)
    {
        try {
            $request->validate([
                'city' => 'required|string',
                'units' => 'nullable|string|in:standard,metric,imperial',
            ]);

            $city = $request->input('city');
            $units = $request->input('units', 'metric');
            
            $cacheKey = "weather.current.{$city}.{$units}";
            
            // Get data from OpenWeather API
            $response = Http::get("{$this->baseUrl}/weather", [
                'q' => $city,
                'units' => $units,
                'appid' => $this->apiKey,
            ]);
            
            if ($response->successful()) {
                // Return the raw weather data directly without nesting it
                return response()->json($response->json());
            }
            
            return response()->json([
                'error' => 'Weather data not available',
                'message' => $response->json()['message'] ?? 'Unknown error',
            ], $response->status());
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get weather forecast for a location
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getForecast(Request $request)
    {
        $request->validate([
            'city' => 'required|string',
            'units' => 'nullable|string|in:standard,metric,imperial',
            'days' => 'nullable|integer|min:1|max:7',
        ]);

        $city = $request->input('city');
        $units = $request->input('units', 'metric');
        $days = $request->input('days', 5);
        
        $cacheKey = "weather.forecast.{$city}.{$units}.{$days}";
        
        // Cache forecast data for 1 hour
        return Cache::remember($cacheKey, 3600, function () use ($city, $units) {
            $response = Http::get("{$this->baseUrl}/forecast", [
                'q' => $city,
                'units' => $units,
                'appid' => $this->apiKey,
            ]);
            
            if ($response->successful()) {
                return response()->json($response->json());
            }
            
            return response()->json([
                'error' => 'Forecast data not available',
                'message' => $response->json()['message'] ?? 'Unknown error'
            ], $response->status());
        });
    }
}