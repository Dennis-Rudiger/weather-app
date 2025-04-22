'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid hydration issues with the weather components
const WeatherApp = dynamic(() => import('@/components/WeatherApp'), { ssr: false });

export default function WeatherAppWrapper() {
  return <WeatherApp />;
}