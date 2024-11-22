import { setCache } from "../util/indexedDBHelper";

export const fetchStations = async () => {
    try {
        const response = await fetch('/api/apiRadio');
        const data = await response.json()
        setCache('stations in service', data);
        console.log('Estações:', data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar estações:', error);
        return { allStations: [], stationsWithGeo: [] };
    }
};
