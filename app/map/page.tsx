"use client"
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapComponent = dynamic(() => import('./map-component'), { 
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>
});

export default function MapPage() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <MapComponent />
    </div>
  );
}

