import { NextApiRequest, NextApiResponse } from 'next';
import { RadioBrowserApi } from 'radio-browser-api';
import { setCache } from '../util/indexedDBHelper';

export default async function fetchStations() {
    try {
        const api = new RadioBrowserApi('RadioApp', true); // Força HTTPS
        api.setBaseUrl('https://de1.api.radio-browser.info'); // Define o servidor base

        const fetchedStations = await api.searchStations({
            hasGeoInfo: true,
            reverse: true,
            hideBroken: true,
            order: 'clickCount',
            removeDuplicates: true,
        }, {
            next: {
                revalidate: 60 * 60
            }
        });

        const validStations = fetchedStations.filter((station: any) => {
            const hasHttpsUrl = station.url?.startsWith('https://') || station.urlResolved?.startsWith('https://');
            const hasValidCoords = station.geoLat && station.geoLong && !isNaN(station.geoLat) && !isNaN(station.geoLong);
            return hasHttpsUrl && hasValidCoords;
        });

        setCache('stations', validStations)
        return {
            allStations: validStations,
            stationsWithGeo: validStations.filter((station: any) =>
                station.geoLat &&
                station.geoLong &&
                Math.abs(station.geoLat) <= 90 &&
                Math.abs(station.geoLong) <= 180
            ),
        };
    } catch (error) {
        console.error('Erro ao buscar estações:', error);

    }
}
