import { RadioBrowserApi } from "radio-browser-api";

export const fetchStations = async () => {
    try {
        // Configurar a API para usar apenas HTTPS
        const api = new RadioBrowserApi('RadioApp', true); // O segundo parâmetro 'true' força HTTPS

        // Configurar timeout e retry
        api.setBaseUrl('https://de1.api.radio-browser.info' || 'https://de1.api.radio-browser.info' || 'https://at1.api.radio-browser.info' || 'https://nl1.api.radio-browser.info' || 'https://at1.api.radio-browser.info'); // Força um servidor HTTPS conhecido

        const fetchedStations = await api.searchStations({
            hasGeoInfo: true,
            reverse: true,
            // Adicione filtros adicionais conforme necessário
            //limit: 1000, // Limita o número de resultados para melhor performance
            hideBroken: true, // Esconde estações quebradas
        });

        // Filtra e valida os dados
        const validStations = fetchedStations.filter(station => {
            // Verifica se as URLs são HTTPS
            const hasHttpsUrl = station.url?.startsWith('https://') ||
                station.urlResolved?.startsWith('https://');

            // Verifica coordenadas válidas
            const hasValidCoords = station.geoLat &&
                station.geoLong &&
                !isNaN(station.geoLat) &&
                !isNaN(station.geoLong);

            return hasHttpsUrl && hasValidCoords;
        });

        return {
            allStations: validStations, // Todas as estações válidas para pesquisa
            stationsWithGeo: validStations.filter(station =>
                station.geoLat &&
                station.geoLong &&
                Math.abs(station.geoLat) <= 90 &&
                Math.abs(station.geoLong) <= 180
            ) // Filtra as estações com coordenadas válidas para o mapa
        };
    } catch (error) {
        console.error('Erro ao buscar estações:', error);
        return {
            allStations: [],
            stationsWithGeo: []
        };
    }
};

// Função auxiliar para validar URLs e convertê-las para HTTPS se necessário
export const getSecureStationUrl = (station) => {
    try {
        let url = station.url_resolved || station.url;

        // Se a URL não for HTTPS, tenta usar uma URL alternativa HTTPS
        if (!url?.startsWith('https://')) {
            if (station.url_resolved?.startsWith('https://')) {
                url = station.url_resolved;
            } else if (station.homepage?.startsWith('https://')) {
                url = station.homepage;
            } else {
                // Se nenhuma URL HTTPS estiver disponível, retorna null
                return null;
            }
        }

        return url;
    } catch (error) {
        console.error('Erro ao processar URL da estação:', error);
        return null;
    }
};

// Exemplo de uso no componente
/*
import { fetchStations, getSecureStationUrl } from './radio-api-service';

const YourComponent = () => {
    const [stations, setStations] = useState({ allStations: [], stationsWithGeo: [] });
    
    useEffect(() => {
        const loadStations = async () => {
            const result = await fetchStations();
            setStations(result);
        };
        
        loadStations();
    }, []);

    // Ao reproduzir uma estação
    const playStation = (station) => {
        const secureUrl = getSecureStationUrl(station);
        if (secureUrl) {
            // Reproduzir a estação usando a URL segura
            audio.src = secureUrl;
            audio.play();
        } else {
            console.warn('Nenhuma URL segura disponível para esta estação');
        }
    };
};
*/