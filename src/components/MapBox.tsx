"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Radio {
  changeId: string // A globally unique identifier for the change of the station information
  id: string // A globally unique identifier for the station
  name: string // The name of the station
  url: string // The stream URL provided by the user
  urlResolved: string // An automatically "resolved" stream URL.
  homepage: string // URL to the homepage of the stream.
  favicon: string // URL to an icon or picture that represents the stream. (PNG, JPG)
  tags: string[] // Tags of the stream
  country: string // Full name of the country
  countryCode: string // Official countrycodes as in ISO 3166-1 alpha-2
  state: string // Full name of the entity where the station is located inside the country
  language: string[] // Languages that are spoken in this stream.
  votes: number // Number of votes for this station
  lastChangeTime: Date // Last time when the stream information was changed in the database
  codec: string // The codec of this stream recorded at the last check.
  bitrate: number // The bitrate of this stream was recorded at the last check.
  hls: boolean // Mark if this stream is using HLS distribution or non-HLS.
  lastCheckOk: boolean // The current online/offline state of this stream.
  lastCheckTime: Date // The last time when any radio-browser server checked the online state of this stream
  lastCheckOkTime: Date // The last time when the stream was checked for the online status with a positive result
  lastLocalCheckTime: Date // The last time when this server checked the online state and the metadata of this stream
  clickTimestamp: Date // The time of the last click recorded for this stream
  clickCount: number // Clicks within the last 24 hours
  clickTrend: number // The difference of the clickcounts within the last 2 days. Positive values mean an increase, negative a decrease of clicks.
  geoLat: number | null // Latitude on earth where the stream is located. Null if it doesn't exist.
  geoLong: number | null // Longitude on earth where the stream is located. Null if it doesn't exist.
}

interface MapboxMapProps {
  radios: Radio[];
  currentCategory: string;
  onRadioSelect: (station: Radio) => void;
  selectedRadio: Radio | null;
}

const MapboxMap: React.FC<MapboxMapProps> = React.memo(
  ({ radios, currentCategory, onRadioSelect, selectedRadio }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [visibleMarkers, setVisibleMarkers] = useState<mapboxgl.Marker[]>([]);
    const maxMarkers = 100;
    const { theme } = useTheme();

    // Efeito para inicializar o mapa com o tema correto
    useEffect(() => {
      if (!mapContainerRef.current) return;

      if (!mapRef.current) {
        // Inicializa o mapa apenas uma vez
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: theme === "light"
            ? "mapbox://styles/mapbox/light-v10"
            : "mapbox://styles/mapbox/dark-v10",
          center: [0, 20],
          zoom: 1.5,
          projection: "globe",
          //fadeDuration: 30000, // Controla a duração do fade in/out
          pitch: 4,
          bearing: 0,
        },);
      } else {
        // Aplica uma animação suave ao mudar de tema
        // mapRef.current.getContainer().style.transition = "opacity 0.8s ease";
        // mapRef.current.getContainer().style.opacity = "0.5"; // Fade out

        // setTimeout(() => {
        //   mapRef.current?.setStyle(
        //     theme === "light"
        //       ? "mapbox://styles/mapbox/light-v10"
        //       : "mapbox://styles/mapbox/dark-v10"
        //   );
        //   mapRef.current.getContainer().style.opacity = "1"; // Fade in
        // }, 500); // Tempo para sincronizar com a animação de fade
      }

      mapRef.current.on("style.load", () => {
        // Configuração do mapa (edifícios em 3D)
        const layers = mapRef.current?.getStyle().layers || [];
        const labelLayerId = layers.find(
          (layer: any) =>
            layer.type === "symbol" && layer.layout?.["text-field"]
        )?.id;

        if (labelLayerId) {
          mapRef.current?.addLayer(
            {
              id: "3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": "#aaa",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.6,
              },
            },
            labelLayerId
          );
        }

        // Oculta os ícones de cidade (marcadores) mas mantém os nomes visíveis
        // layers.forEach((layer: any) => {
        //   if (layer.type === "symbol" && layer.layout["icon-image"]) {
        //     mapRef.current?.setLayoutProperty(layer.id, "visibility", "none");
        //   }
        // });
      });

      // mapRef.current.on("load", () => {
      //   mapRef.current?.setTerrain({
      //     source: "mapbox-dem",
      //     exaggeration: 2.5,
      //   });

      //   mapRef.current?.addSource("mapbox-dem", {
      //     type: "raster-dem",
      //     url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      //     tileSize: 512,
      //     maxzoom: 14,
      //   });
      //   mapRef.current?.setPitch(0);
      // });

      //Cleanup: remove o mapa e eventos se o componente desmontar
      return () => {
        if (mapRef.current) {
          mapRef.current.off("load", () => { });
          mapRef.current.off("style.load", () => { });
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, [theme]);

    // Função para limpar os marcadores do mapa
    const clearMarkers = useCallback(() => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    }, []);

    // Função para adicionar novos marcadores ao mapa
    const addMarkers = useCallback(() => {
      clearMarkers();
      const markersToAdd = radios.slice(0, maxMarkers);

      markersToAdd.map((radio: any) => {
        const { geoLat, geoLong, id } = radio;
        const coordinates = [geoLat, geoLong];

        if (Array.isArray(coordinates) && coordinates.length === 2) {
          const markerElement = document.createElement("div");
          markerElement.className =
            selectedRadio && selectedRadio.id === id
              ? "w-6 h-6 bg-green-600 p-2 border-[1rem] border-opacity-95 border-neutral-600 rounded-full cursor-pointer"
              : "w-2 h-2 bg-black opacity-1 border-2 border-solid border-white rounded-full cursor-pointer";

          markerElement.addEventListener("click", () => onRadioSelect(radio));
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([geoLong, geoLat])
            .addTo(mapRef.current);

          markersRef.current.push(marker);
        }
      });
      setVisibleMarkers(markersRef.current);
    }, [clearMarkers, radios, selectedRadio,]);


    // Efeito para atualizar os marcadores quando as estações ou categoria mudam
    useEffect(() => {
      addMarkers();
    }, [(addMarkers)]);

    return (

      <>
        <div
          id="map-container"
          ref={mapContainerRef}
          className="min-h-screen"
        />
      </>
    );
  }
);

export default MapboxMap;
MapboxMap.displayName = "Radio Streaming";


