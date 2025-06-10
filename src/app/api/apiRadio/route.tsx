import { NextResponse } from 'next/server';
import { RadioBrowserApi } from 'radio-browser-api';

export async function GET(request: Request) {
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

        const responseData = {
            allStations: validStations,
            stationsWithGeo: validStations.filter((station: any) =>
                station.geoLat &&
                station.geoLong &&
                Math.abs(station.geoLat) <= 90 &&
                Math.abs(station.geoLong) <= 180
            ),
        };
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Erro ao buscar estações:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
