import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon broken in Vite builds
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  from: [number, number];
  to: [number, number];
  truckPos: [number, number];
  height?: number;
}

export function LiveMap({ from, to, truckPos, height = 230 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 }
    ).addTo(map);

    mapRef.current = map;

    // Origin dot
    const originIcon = L.divIcon({
      html: `<div style="
        width:12px;height:12px;border-radius:50%;
        background:#E8631A;
        border:2px solid #fff;
        box-shadow:0 0 0 3px rgba(232,99,26,.35);
      "></div>`,
      className: "",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    // Destination dot
    const destIcon = L.divIcon({
      html: `<div style="
        width:12px;height:12px;border-radius:50%;
        background:#0F1B2D;
        border:2px solid #E8631A;
        box-shadow:0 0 0 3px rgba(232,99,26,.25);
      "></div>`,
      className: "",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    L.marker(from, { icon: originIcon }).addTo(map);
    L.marker(to, { icon: destIcon }).addTo(map);

    // Truck marker
    const truckIcon = L.divIcon({
      html: `<div style="
        width:32px;height:32px;border-radius:50%;
        background:#E8631A;
        display:flex;align-items:center;justify-content:center;
        font-size:16px;line-height:1;
        box-shadow:0 0 0 6px rgba(232,99,26,.25),0 0 18px 4px rgba(232,99,26,.4);
      ">🚛</div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    truckMarkerRef.current = L.marker(truckPos, { icon: truckIcon }).addTo(map);

    // Route polyline
    polylineRef.current = L.polyline([from, truckPos, to], {
      color: "#E8631A",
      weight: 4,
      lineJoin: "round",
      lineCap: "round",
    }).addTo(map);

    // Fit bounds
    const bounds = L.latLngBounds([from, to, truckPos]);
    map.fitBounds(bounds, { padding: [36, 36] });

    return () => {
      map.remove();
      mapRef.current = null;
      truckMarkerRef.current = null;
      polylineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update truck marker and polyline when truckPos changes
  useEffect(() => {
    if (!mapRef.current || !truckMarkerRef.current || !polylineRef.current) return;
    truckMarkerRef.current.setLatLng(truckPos);
    polylineRef.current.setLatLngs([from, truckPos, to]);
  }, [truckPos, from, to]);

  return (
    <div
      ref={containerRef}
      style={{
        height,
        width: "100%",
        borderRadius: 0,
        border: "none",
        display: "block",
      }}
    />
  );
}
