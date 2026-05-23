import { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import './CountryGlobe.css';

// Utility: convert latlng array to {lat, lng}
const toCoords = (latlng) => {
  if (!latlng || latlng.length < 2) return null;
  return { lat: latlng[0], lng: latlng[1] };
};

export default function CountryGlobe({ countries = [], height = 380 }) {
  const globeRef = useRef();
  const wrapRef = useRef();
  const [width, setWidth] = useState(400);
  const [ready, setReady] = useState(false);

  // Responsive width
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) {
        setWidth(Math.floor(e.contentRect.width));
      }
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // Once globe is ready, point camera at first country
  const handleGlobeReady = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !globeRef.current || countries.length === 0) return;

    const globe = globeRef.current;

    if (countries.length === 1) {
      const c = toCoords(countries[0].latlng);
      if (c) {
        globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.8 }, 1200);
      }
    } else if (countries.length === 2) {
      const c1 = toCoords(countries[0].latlng);
      const c2 = toCoords(countries[1].latlng);
      if (c1 && c2) {
        // Midpoint between the two countries
        const midLat = (c1.lat + c2.lat) / 2;
        const midLng = (c1.lng + c2.lng) / 2;
        // Higher altitude to fit both in view
        const dist = Math.sqrt(Math.pow(c1.lat - c2.lat, 2) + Math.pow(c1.lng - c2.lng, 2));
        const alt = Math.min(3.5, Math.max(1.8, dist / 60));
        globe.pointOfView({ lat: midLat, lng: midLng, altitude: alt }, 1200);
      }
    }
  }, [ready, countries]);

  // Build markers for each country
  const markers = countries
    .map((c, i) => {
      const coords = toCoords(c.latlng);
      if (!coords) return null;
      return {
        lat: coords.lat,
        lng: coords.lng,
        label: c.name?.common || '',
        color: i === 0 ? '#6c63ff' : '#00d4aa',
        size: 0.6,
      };
    })
    .filter(Boolean);

  // Arc between two countries
  const arcs = countries.length === 2 && toCoords(countries[0].latlng) && toCoords(countries[1].latlng)
    ? [{
        startLat: countries[0].latlng[0],
        startLng: countries[0].latlng[1],
        endLat: countries[1].latlng[0],
        endLng: countries[1].latlng[1],
        color: ['#6c63ff', '#00d4aa'],
      }]
    : [];

  return (
    <div className="globe-wrap" ref={wrapRef}>
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#6c63ff"
        atmosphereAltitude={0.15}
        onGlobeReady={handleGlobeReady}
        // Markers
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.02}
        pointRadius="size"
        pointLabel="label"
        // Arcs
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcAltitude={0.25}
        arcStroke={0.5}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        // Controls
        enablePointerInteraction={true}
      />
      {/* Legend */}
      {countries.length > 0 && (
        <div className="globe-legend">
          {countries.map((c, i) => (
            <div key={c.cca3 || i} className="globe-legend-item">
              <span
                className="globe-legend-dot"
                style={{ background: i === 0 ? '#6c63ff' : '#00d4aa' }}
              />
              <span>{c.name?.common}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
