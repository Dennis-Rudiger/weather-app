import WeatherAppWrapper from '@/components/WeatherAppWrapper';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto py-8 sm:py-12 px-3 sm:px-4">
        <header className="text-center mb-6 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-3 text-blue-800 dark:text-blue-300 tracking-tight">
            Weather<span className="text-indigo-600 dark:text-indigo-400">Scope</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Real-time weather insights from around the world
          </p>
        </header>
        
        <WeatherAppWrapper />
        
        <footer className="mt-12 sm:mt-20 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>Developed by Dennis Rudiga</p>
          <p>Designed with Next.js, Tailwind CSS, RippleUI, and Laravel</p>
          <p className="mt-2">Powered by OpenWeather API ⟡ {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
