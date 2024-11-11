import { RadioBrowserApi } from "radio-browser-api"


export const fetchStations = async () => {
    const api = new RadioBrowserApi('RadioApp');

    const fetchedStations = await api.searchStations({
        //offset: 500,
        //hideBroken: true,
        hasGeoInfo: true,
        reverse: true,
    });

    return {
        // Armazena todas as estações para a pesquisa e apenas as válidas para os marcadores
        allStations: fetchedStations,  // Guarda todas as estações para a pesquisa
        stationsWithGeo: fetchedStations.filter(station =>
            station.geoLat && station.geoLong
        ) // Filtra as estações com coordenadas para os marcadores no mapa

    }
};