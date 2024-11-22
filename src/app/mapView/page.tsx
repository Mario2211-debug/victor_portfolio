'use client';

import React, { Suspense, useEffect, useCallback, useState, useRef, useMemo } from "react";
import MapboxMap from "@/components/MapBox";
import SearchBar from "@/components/radio/searchBar";
import debounce from "lodash.debounce";
import fetchStations from "../api/apiRadio";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { setCache, getCache } from "../util/indexedDBHelper";

import PlayerComponent from "@/components/radio/player";

export default function MapViewPage() {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState("");
    const [stations, setStations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { theme, setTheme } = useTheme();



    const loadCachedStations = async () => {
        try {
            const cachedStations = await getCache('stations');
            if (!cachedStations || cachedStations.length === 0) {
                // Cache está vazio ou indefinido
                console.log('Cache vazio: ', cachedStations);
                setIsLoading(true);
                const { stationsWithGeo } = await fetchStations(); // Busca estações
                await setCache('stations', stationsWithGeo); // Salva no cache
                setStations(stationsWithGeo); // Atualiza o estado com as novas estações
            } else {
                // Cache já está cheio
                setStations(cachedStations); // Usa estações do cache
            }
            return cachedStations; // Retorna as estações carregadas
        } catch (error) {
            setIsLoading(false); // Garante que o estado de carregamento seja atualizado
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadCachedStations();
        };
        fetchData(); // Chama a função assíncrona
        setTheme(`dark`)
    }, []); // Sem dependências, executa apenas no mount


    // Automatically play selected radio
    useEffect(() => {
        if (audioRef.current && selectedRadio) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [selectedRadio]);

    // Debounced search handler
    const debouncedSearch = useMemo(() => debounce((value: string) => {
        setCategorySearch(value);
        setIsLoading(false);
    }, 150), []);

    const handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        debouncedSearch(event.target.value);
    };

    // Filter stations based on search
    const filteredStations = stations.filter((station: any) => (
        station.name?.toLowerCase().includes(categorySearch.toLowerCase()) && station.votes >= 250 && station.lastCheckOk === true ||
        station.country?.toLowerCase().includes(categorySearch.toLowerCase()) && station.votes >= 250 && station.lastCheckOk === true ||
        station.tags?.some((tag: string) => tag.toLowerCase().includes(categorySearch.toLowerCase())) && station.votes >= 250 && station.lastCheckOk === true)
    );
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)


    return (
        <div className="relative min-h-screen flex flex-col items-center">
            {/* Map Container */}
            <div className="flex-1 absolute inset-0 w-full h-full">
                <Suspense fallback={<p>Loading map...</p>}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <MapboxMap
                            radios={stations}
                            currentCategory={currentCategory}
                            onRadioSelect={setSelectedRadio}
                            selectedRadio={selectedRadio}
                        />
                    </motion.div>
                </Suspense>
            </div>

            {/* Search Bar */}
            <Suspense fallback={<p>Loading stations...</p>}>
                {isSearchOpen && (
                    <SearchBar
                        id={isSearchOpen ? 1 : 2}
                        // isLoading={isLoading}
                        handleCategorySearch={handleCategorySearch}
                        categorySearch={categorySearch}
                        filteredStations={filteredStations}
                        handleRadioSelect={setSelectedRadio}
                        onClose={() => setIsSearchOpen(false)}
                    />
                )}
            </Suspense>


            <Suspense fallback={<p>Loading player...</p>}>
                <PlayerComponent
                    key={selectedRadio ? 1 : 2}
                    selectedRadio={selectedRadio}
                    theme={theme}
                    toggleSearch={toggleSearch}
                    toggleTheme={toggleTheme}
                />
            </Suspense>

        </div>
    );

};