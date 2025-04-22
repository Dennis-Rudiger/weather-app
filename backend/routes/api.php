<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\WeatherController;



Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Weather endpoints
Route::get('/weather/current', [WeatherController::class, 'getCurrentWeather']);
Route::get('/weather/forecast', [WeatherController::class, 'getForecast']);