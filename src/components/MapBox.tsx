"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { easeInOut, easeOut, motion } from 'framer-motion'


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Radio {
  stationuuid: any;
  name: string;
  longitude: number;
  latitude: number;
  className: string;
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
          fadeDuration: 30000, // Controla a duração do fade in/out
          pitch: 4,
          bearing: 0,
        });
      } else {
        // Aplica uma animação suave ao mudar de tema
        mapRef.current.getContainer().style.transition = "opacity 0.8s ease";
        mapRef.current.getContainer().style.opacity = "0.5"; // Fade out
    
        setTimeout(() => {
          mapRef.current?.setStyle(
            theme === "light"
              ? "mapbox://styles/mapbox/light-v10"
              : "mapbox://styles/mapbox/dark-v10"
          );
          mapRef.current.getContainer().style.opacity = "1"; // Fade in
        }, 500); // Tempo para sincronizar com a animação de fade
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
    
      mapRef.current.on("load", () => {
        mapRef.current?.setTerrain({
          source: "mapbox-dem",
          exaggeration: 2.5,
        });
    
        mapRef.current?.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
        mapRef.current?.setPitch(0);
      });
    
      // Cleanup: remove o mapa e eventos se o componente desmontar
      return () => {
        if (mapRef.current) {
          mapRef.current.off("load", () => {});
          mapRef.current.off("style.load", () => {});
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

      markersToAdd.forEach((radio: any) => {
        const { geoLat, geoLong, stationuuid } = radio;
        const coordinates = [geoLat, geoLong];

        if (Array.isArray(coordinates) && coordinates.length === 2) {
          const markerElement = document.createElement("div");
          markerElement.className =
            selectedRadio && selectedRadio.stationuuid === stationuuid
              ? "w-1.5 h-1.5 bg-blue-500 border border-solid border-white rounded-full cursor-pointer"
              : "w-1.5 h-1.5 bg-black opacity-1 border border-solid border-white rounded-full cursor-pointer";

          markerElement.addEventListener("click", () => onRadioSelect(radio));
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([geoLong, geoLat])
            .addTo(mapRef.current);

          markersRef.current.push(marker);
        }
      });
      setVisibleMarkers(markersRef.current);
    }, [clearMarkers, radios, onRadioSelect, selectedRadio]);


    // Efeito para atualizar os marcadores quando as estações ou categoria mudam
    useEffect(() => {
      if (radios.length > 0) {
        addMarkers();
      }
      handleMapMove
      if (mapRef.current) {
        mapRef.current.on("moveend", () => {
          const bounds = mapRef.current?.getBounds();
          const markersInView = markersRef.current.filter((marker) => {
            const lngLat = marker.getLngLat();
            return bounds?.contains(lngLat);
          });
          setVisibleMarkers(markersInView);
        });
        return () => {
          mapRef.current?.off("moveend", () => { });
        };
      }
    }, [radios, currentCategory, addMarkers]);

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

function handleMapMove(event: { type: "moveend"; target: Map<string, any>; } & { originalEvent?: MouseEvent | WheelEvent | TouchEvent; }): void {
  throw new Error("Function not implemented.");
}
