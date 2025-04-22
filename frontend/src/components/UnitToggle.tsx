'use client';

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onChange: (unit: 'metric' | 'imperial') => void;
}

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="inline-flex bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-1 shadow-sm">
      <button
        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
          unit === 'metric'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
        }`}
        onClick={() => onChange('metric')}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
          unit === 'imperial'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-sm'
            : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
        }`}
        onClick={() => onChange('imperial')}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
}