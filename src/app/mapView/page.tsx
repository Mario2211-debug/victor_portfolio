'use client'

import { fetchStations } from '@/app/api/apiRadio';
import React, { useEffect, useState, useRef } from "react";
import MapboxMap from "@/components/MapBox";
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const RadioMapPage = () => {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [selectedRadio, setSelectedRadio] = useState<any>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [stations, setStations] = useState<any[]>([]);
    const [stationsWithGeo, setStationsWithGeo] = useState<any[]>([]);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);

    useEffect(() => {
        const getStations = async () => {
            const { allStations, stationsWithGeo } = await fetchStations();
            setStations(allStations);
            setStationsWithGeo(stationsWithGeo);
        };
        getStations();
    }, []);

    useEffect(() => {
        setSelectedRadio(null);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [currentCategory]);

    useEffect(() => {
        if (audioRef.current && selectedRadio) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [selectedRadio]);

    // Definir o debounce fora do useCallback para evitar problemas de renderização
    const debouncedSearch = debounce((value: string) => {
        setCategorySearch(value);
    }, 150);

    const handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value);
    };

    const filteredStations = stations.filter((station) =>
        station.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.country.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.tags.some((tag: string) => tag.toLowerCase().includes(categorySearch.toLowerCase()))
    );

    const handleRadioSelect = (station: any) => {
        setSelectedRadio(station);
    };

    const { theme } = useTheme();

    return (
        <div className="relative min-h-screen items-center">
            <div className="flex-1 absolute inset-0 w-full h-full">
                <MapboxMap
                    radios={stationsWithGeo}
                    currentCategory={currentCategory}
                    onRadioSelect={handleRadioSelect}
                    selectedRadio={selectedRadio}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="fixed w-[350px] mb-10 bottom-0 [position-area:bottom] left-0 right-0 justify-center items-center z-10 tablet:mb-5 sm:w-[420px] mx-4 rounded-lg p-2 blur-cover">

                <input
                    type="text"
                    onChange={handleCategorySearch}  // Usa a função handleCategorySearch
                    placeholder="Pesquisar categoria"
                    className="p-2 bg-transparent w-[-webkit-fill-available] focus:outline-0 focus:border-b focus:border-neutral-900 placeholder:text-sm text-white"
                />

                {categorySearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }} >
                        <ul className="max-h-48 [scrollbar-width:thin] transition-transform ease-in-out delay-700 overflow-y-auto rounded-lg mt-2 text-white">
                            {filteredStations.map((station) => (
                                <li
                                    key={station.stationuuid}
                                    className="p-2 cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 hover:rounded-md"
                                    onClick={() => handleRadioSelect(station)}
                                >
                                    <p className="font-semibold truncate">{station.name}</p>
                                    <p className="text-sm text-gray-300">{station.country}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {selectedRadio && (
                    <div key={selectedRadio.stationuuid} className="sm:p-2 bg-transparent rounded-sm h-fit">
                        <div className='flex gap-2 items-center justify-between'>
                            <div>
                                {selectedRadio.favicon && (
                                    <img src={selectedRadio.favicon} alt={`${selectedRadio.name} logo`} />
                                )}
                            </div>
                            <div className="float-left">
                                <p className="sm:text-sm sm:w-28 w-20 text-xs sm:font-semibold truncate">{selectedRadio.name}</p>
                                <p className={`text-sm ${theme === 'light' ? '' : 'text-gray-300'}`}>{selectedRadio.country}</p>
                            </div>
                            <div className="float-right h-fit w-fit self-end">
                                <audio className='w-[160px] max-w-xl sm:w-[200px] rounded-none' ref={audioRef} controls style={{ borderRadius: '0.125rem', background: 'transparent' }}>
                                    <source src={selectedRadio.urlResolved} type="audio/mpeg" />
                                </audio>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default RadioMapPage;
