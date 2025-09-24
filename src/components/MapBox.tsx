import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'next-themes';
import "mapbox-gl/dist/mapbox-gl.css";

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

const MapComponent: React.FC<MapboxMapProps> = ({ radios, currentCategory, onRadioSelect, selectedRadio }) => {
  const mapRef = useRef(null);
  const { theme } = useTheme()

  useEffect(() => {

    if (!mapRef.current) {
      // Inicializa o mapa apenas uma vez
      mapRef.current = new mapboxgl.Map({
        container: 'map',
        style: `mapbox://styles/mapbox/${theme}-v8`,
        // Mapbox style URL
        // theme === "light"
        //   ? "mapbox://styles/mapbox/light-v11"
        //   : "mapbox://styles/mapbox/dark-v11",
        center: [0, 20],
        zoom: 1.5,
        projection: "globe",
        pitch: 4,
        bearing: 0,


      });
      mapRef.current.on('load', () => {
        const geoJsonData = {
          type: "FeatureCollection",
          features: radios.map((radio: any) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [radio.geoLong, radio.geoLat], // Coordenadas do marcador
            },
            properties: {
              id: radio.id,
              name: radio.name,
            },
          })),
        };

        // Adiciona a fonte de dados GeoJSON
        mapRef.current?.addSource("radios", {
          type: "geojson",
          data: geoJsonData,
        });

        // Adiciona uma camada para os pontos
        mapRef.current?.addLayer({
          "id": "radio-points",
          "type": "circle",
          "source": "radios",
          "paint": {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 3, 15, 12],
            "circle-color": [
              "match",
              ["get", "tags"],
              "rock", "#FF5733",
              "pop", "#33FF57",
              theme === 'light' ? '#0f0f0f' : "#66696b"
            ],
            "circle-opacity": 0.8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-opacity": 0.5
          }
        });

        // Adiciona evento de clique nos pontos
        mapRef.current?.on("click", "radio-points", (e: any) => {
          const features = e.features[0];
          const { id } = features.properties;
          // Busca a estação correspondente
          const selectedStation = radios.find((radio) => radio.id === id);
          if (selectedStation) {
            onRadioSelect(selectedStation);

          }
        });

        // Altera o cursor ao passar sobre os pontos
        mapRef.current?.on("mouseenter", "radio-points", () => {
          if (mapRef.current) {
            mapRef.current.getCanvas().style.cursor = "pointer";
          }
        });

        mapRef.current?.on("mouseleave", "radio-points", () => {
          if (mapRef.current) {
            mapRef.current.getCanvas().style.cursor = "";
          }
        });
      });
    }



    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [theme, radios, onRadioSelect]);



  useEffect(() => {
    if (mapRef.current && selectedRadio) {
      const selectedFeature = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [selectedRadio.geoLong, selectedRadio.geoLat],
            },
            properties: {
              id: selectedRadio.id,
              name: selectedRadio.name,
            },
          },
        ],
      };

      if (mapRef.current.getSource("selected-radio")) {
        mapRef.current.getSource("selected-radio").setData(selectedFeature);
      } else {
        mapRef.current.addSource("selected-radio", {
          type: "geojson",
          data: selectedFeature,
        });

        mapRef.current.addLayer({
          id: "selected-radio-point",
          type: "circle",
          source: "selected-radio",
          paint: {
            "circle-radius": 14,
            "circle-color": "#37f337",
            "circle-opacity": 0.8,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#37ff37",
            "circle-stroke-opacity": 0.5
          },
        });
      }
    }
  }, [selectedRadio]);


  return <div id="map" className="min-h-screen" />;
};

export default MapComponent;
