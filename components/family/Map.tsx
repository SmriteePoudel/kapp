import { useEffect, useRef } from "react";
interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  members: number[];
}

interface MapProps {
  locations: Location[];
}

export default function Map({ locations }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current!, {
        center: { lat: 27.7172, lng: 85.324 },
        zoom: 2,
      });

      locations.forEach((loc) => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.name,
        });
      });
    };

    if (window.google && locations.length) {
      initMap();
    }
  }, [locations]);

  return <div ref={mapRef} className="h-96 w-full rounded-lg" />;
}
