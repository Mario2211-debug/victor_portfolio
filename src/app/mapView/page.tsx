"use client";
import { fetchStations } from '../api/apiRadio';
import React, { useEffect, useState, useRef } from "react";
import MapboxMap from "@/components/MapBox";
import BottomToolbar from "@/components/BottomToolbar";
import SearchBar from '@/components/SearchBar';
import { motion } from 'framer-motion';

const RadioMapPage = () => {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState(""); // Novo estado para a pesquisa de categorias
    const audioRef = useRef(null);

    const [stations, setStations] = useState([]);
    const [stationsWithGeo, setStationsWithGeo] = useState([])


    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);

    useEffect(() => {
        const getStations = async () => {
            const { allStations, stationsWithGeo } = await fetchStations();
            setStations(allStations); // Guarda todas as estações para a pesquisa
            setStationsWithGeo(stationsWithGeo); // Filtra as estações com coordenadas para os marcadores no mapa
        };
        getStations();
    }, []);

    // Limpa a estação selecionada ao mudar de categoria
    useEffect(() => {
        setSelectedRadio(null);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [currentCategory]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [selectedRadio]);

    // Função para manipular a mudança de categoria na barra de pesquisa
    const handleCategorySearch = (event: any) => {
        setCategorySearch(event.target.value);
    };

    // Estações filtradas com base na pesquisa por nome, país ou tags
    const filteredStations = stations.filter((station) =>
        station.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.country.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.tags.some((tag: any) => tag.toLowerCase().includes(categorySearch.toLowerCase()))
    );
    // Função para lidar com a seleção da estação no mapa
    const handleRadioSelect = (station: any) => {
        setSelectedRadio(station);
    };



    return (
        <div className="relative h-screen w-screen ">
            {/* Componente do mapa */}
            <MapboxMap
                radios={stationsWithGeo}
                currentCategory={currentCategory}
                onRadioSelect={handleRadioSelect} // Passando a função para selecionar a estação
                selectedRadio={selectedRadio} // Passa a estação selecionada para o mapa

            />

            {isSearchOpen && <SearchBar onClose={closeSearch} />}

            {/* Barra de pesquisa para categorias */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute w-[450px] end-8 bottom-8 rounded-lg p-2 blur-cover">
                <input
                    type="text"
                    value={categorySearch}
                    onChange={handleCategorySearch}
                    placeholder="Pesquisar categoria"
                    className="p-2 bg-transparent w-[-webkit-fill-available] focus:outline-0 focus:border-b focus:border-neutral-900 placeholder:text-sm text-white"
                />

                {/* Lista de sugestões de estações de rádio */}
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

                {/* Player de Rádio */}
                {selectedRadio && (
                    <div key={selectedRadio.stationuuid} className="p-2 bg-transparent rounded-sm text-white h-fit">
                        <div className='flex gap-2 items-center justify-between'>

                            <div>
                                <span className="text-sm w-28 font-semibold"><img src={selectedRadio.favicon} alt="" /></span>
                            </div>
                            <div className="float-left">
                                <p className="text-sm w-28 font-semibold truncate">{selectedRadio.name}</p>
                                <p className="text-sm text-gray-300">{selectedRadio.country}</p>
                            </div>
                            <div className="float-right h-fit w-fit self-end">
                                <audio className='w-[240px] rounded-none' ref={audioRef} controls style={{ borderRadius: '0.125rem', background: 'transparent' }} >
                                    <source src={selectedRadio.urlResolved} type="audio/mpeg" className='bg-transparent' />
                                </audio>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
            <div className="relative top-4">
                <BottomToolbar onSearchClick={openSearch} />
            </div>
        </div>
    );
};

export default RadioMapPage;