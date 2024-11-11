"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxMap = ({ radios, currentCategory, onRadioSelect, selectedRadio }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const maxMarkers = 500;  // Limite máximo de marcadores por vez


  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inicializa o mapa com a projeção 'globe' (esférica) para visualização 3D
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 20],
      zoom: 1.5,
      projection: "globe",  // Projeção esférica para 3D
      pitch: 45,  // Inclinação inicial do mapa
      bearing: 0,  // Direção inicial
    });

    // Adiciona a camada de edifícios em 3D (extrusão de prédios)
    mapRef.current.on("style.load", () => {
      const layers = mapRef.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer: any) => layer.type === "symbol" && layer.layout?.["text-field"]
      )?.id;

      if (labelLayerId) {
        mapRef.current.addLayer(
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
      layers.forEach((layer: any) => {
        if (layer.type === "symbol" && layer.layout["icon-image"]) {
          mapRef.current.setLayoutProperty(layer.id, "icon-opacity", 0);
        }
      });

    });

    // Adicionar visualização do terreno em 3D
    mapRef.current.on("load", () => {
      mapRef.current.setTerrain({
        source: "mapbox-dem", // Fonte de dados de terreno
        exaggeration: 2.5, // Intensifica a elevação para mais ênfase
      });

      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      // Habilita o controle de pitch (inclinação)
      mapRef.current.setPitch(0);
    });

    return () => mapRef.current?.remove();
  }, []);


  // Função para limpar marcadores
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };


  const setCurrent = () => {
    // Verifica se a estação é a selecionada para aplicar um estilo especial
    radios.className = selectedRadio && selectedRadio.stationuuid === currentCategory.stationuuid
        ? "w-2 h-2 bg-blue-500 border border-solid border-white rounded-full cursor-pointer" // Estilo normal para outros marcadores
        : "w-2 h-2 bg-transparent border border-solid border-white rounded-full cursor-pointer" // Estilo para o marcador destacado

  }

  // Função para adicionar novos marcadores
  const addMarkers = () => {
    clearMarkers();
    const markersToAdd = radios.slice(0, maxMarkers); // Limitar ao número máximo de marcadores

    markersToAdd.forEach((radio: any) => {
      const { geoLat, geoLong, stationuuid } = radio;
      const coordinates = [geoLong, geoLat];

      if (Array.isArray(coordinates) && coordinates.length === 2) {
        const markerElement = document.createElement("div");

        // Verifica se a estação é a selecionada para aplicar um estilo especial
        markerElement.className = "w-2 h-2 bg-transparent border border-solid border-white rounded-full cursor-pointer" // Estilo para o marcador destacado


        markerElement.addEventListener("click", () => {
          onRadioSelect(radio); // Define a estação como selecionada
        });

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([geoLong, geoLat])
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      }
    });

    // Atualiza o estado de marcadores visíveis
    setVisibleMarkers(markersRef.current);
  };

  // useEffect(() => {
  //   if (!mapRef.current || radios.length === 0) return;

  //   addMarkers();  // Adiciona os marcadores quando as estações são carregadas
  // }, [radios]);

  // Função para carregar mais marcadores quando o mapa é movimentado ou alterado
  const handleMapMove = () => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const markersInView = markersRef.current.filter((marker) => {
      const lngLat = marker.getLngLat();
      return bounds.contains(lngLat);
    });

    setVisibleMarkers(markersInView);  // Atualiza os marcadores visíveis
  };

  useEffect(() => {

    if (radios.length > 0) {
      addMarkers(); // Adiciona os marcadores com o destaque adequado
    }

    if (!mapRef.current) return;

    mapRef.current.on("moveend", handleMapMove);  // Evento para carregar mais marcadores quando o mapa se mover
    return () => {
      if (mapRef.current) {
        mapRef.current.off("moveend", handleMapMove);  // Remove o evento ao sair
      }
    };
  }, [radios, currentCategory,, setCurrent(), selectedRadio]);

  return <div id="map-container" ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapboxMap;
