# WeatherScope

A modern, responsive weather application that provides real-time weather information and forecasts for locations worldwide.

## Features

- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: View weather predictions for the upcoming days
- **Hourly Forecast**: Check detailed hourly weather changes
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Beautiful UI**: Modern interface with intuitive weather visualizations
- **Dark Mode Support**: Comfortable viewing in any lighting condition

## Technology Stack

### Backend
- **Laravel**: PHP framework for the backend API
- **OpenWeather API**: Source for accurate weather data


### Frontend
- **Next.js**: React framework for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **RippleUI**: Component library for enhanced UI elements

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18.0 or higher
- npm or yarn
- OpenWeather API key ([Get one here](https://openweathermap.org/api))

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Dennis-Rudiger/weather-app.git
   cd weather-app/backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Add your OpenWeather API key to the .env file:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

6. Set up the database:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment file:
   ```bash
   # Create a .env.local file with:
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Enter a city name in the search bar
3. View the current weather conditions and forecast
4. Explore hourly predictions and detailed weather information

## API Documentation

The backend provides two main endpoints:

### Current Weather
```
GET /api/weather/current?city={cityName}&units={units}
```
- `cityName`: The name of the city (required)
- `units`: The unit system (optional, defaults to "metric")

### Weather Forecast
```
GET /api/weather/forecast?city={cityName}&units={units}
```
- `cityName`: The name of the city (required)
- `units`: The unit system (optional, defaults to "metric")

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons from [OpenWeather Icons](https://openweathermap.org/weather-conditions)