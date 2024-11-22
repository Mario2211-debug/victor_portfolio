"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { getCache, setCache } from "@/app/util/indexedDBHelper";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface Radio {
  id: string;
  name: string;
  geoLat: number | null;
  geoLong: number | null;
}

interface MapboxMapProps {
  radios: Radio[];
  currentCategory: string;
  onRadioSelect: (station: Radio) => void;
  selectedRadio: Radio | null;
}

const CACHE_KEY = "map_radios_cache";


const MapboxMap: React.FC<MapboxMapProps> = React.memo(
  ({ radios, currentCategory, onRadioSelect, selectedRadio }) => {



    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [visibleMarkers, setVisibleMarkers] = useState<mapboxgl.Marker[]>([]);
    const maxMarkers = 500;
    const { theme } = useTheme();
    const [cachedmarkersRef, setCachedMarkersRef] = useState<mapboxgl.Marker[]>([]);
    // const [cachedRadios, setCachedRadios] = useState<Radio[]>([]);
    // const [cachedRadios, setCachedRadios] = useState<Radio[]>([]);



    console.log('Referencia dos marcadores', markersRef)
    console.log('Radios', radios)
    console.log('Marcadores visiveis', visibleMarkers)
    console.log('Referencia do mapa', mapRef)
    console.log('referencia do container', mapContainerRef)



    // Carregar dados do cache na inicialização
    useEffect(() => {
      const loadCachedRadios = async () => {
        const cachedData = await getCache(CACHE_KEY);
        if (cachedData) {
          setCachedMarkersRef(cachedData);
        } else {
          setCache(CACHE_KEY, markersRef);
          const cashedMarker = async () => {
            const data = await getCache(CACHE_KEY)
            setCachedMarkersRef(data);

          }
        }
      };
      loadCachedRadios();
    }, [radios]);



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

        // if (labelLayerId) {
        //   mapRef.current?.addLayer(
        //     {
        //       id: "3d-buildings",
        //       source: "composite",
        //       "source-layer": "building",
        //       filter: ["==", "extrude", "true"],
        //       type: "fill-extrusion",
        //       minzoom: 15,
        //       paint: {
        //         "fill-extrusion-color": "#aaa",
        //         "fill-extrusion-height": [
        //           "interpolate",
        //           ["linear"],
        //           ["zoom"],
        //           15,
        //           0,
        //           15.05,
        //           ["get", "height"],
        //         ],
        //         "fill-extrusion-base": [
        //           "interpolate",
        //           ["linear"],
        //           ["zoom"],
        //           15,
        //           0,
        //           15.05,
        //           ["get", "min_height"],
        //         ],
        //         "fill-extrusion-opacity": 0.6,
        //       },
        //     },
        //     labelLayerId
        //   );
        // }
      });
      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
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
        const { geoLat, geoLong, id } = radio;
        const coordinates = [geoLat, geoLong];

        if (Array.isArray(coordinates) && coordinates.length === 2) {
          const markerElement = document.createElement("div");


          markerElement.addEventListener("click", (event) => {
            event.stopPropagation();
            onRadioSelect(radio);
          });

          console.log('radio selecionado: ', selectedRadio)
          // console.log('radio: ', radio)


          markerElement.className =
            selectedRadio && selectedRadio.id === id
              ? "w-6 h-6 bg-green-600 bg-opacity-40 border border-green-600 shadow-sm shadow-green-600 p-2 rounded-full cursor-pointer"
              : "w-2 h-2 bg-black opacity-1 border-2 border-solid border-white rounded-full cursor-pointer";

          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([geoLong, geoLat])
            .addTo(mapRef.current);
          markersRef.current.push(marker);
        }
      });
      setVisibleMarkers(markersRef.current);
    }, [clearMarkers, radios, onRadioSelect, selectedRadio]);


    // Adicionar marcadores quando o tema ou cache muda
    useEffect(() => {
      if (mapRef.current) {
        addMarkers();
      }
    }, [addMarkers, theme]);


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