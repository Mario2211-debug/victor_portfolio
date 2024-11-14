'use client'

import { fetchStations, getSecureStationUrl } from '@/app/api/apiRadio';
import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import MapboxMap from "@/components/MapBox";
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { HeartIcon, SearchIcon, PlayIcon, PauseIcon, SunIcon, MoonIcon, VolumeUpIcon } from '@heroicons/react/solid';
import SearchBar from '@/components/radio/searchBar';
import spin from '@/components/radio/spin.gif'




type Station = {
    changeId: string // A globally unique identifier for the change of the station information
    id: string // A globally unique identifier for the station
    name: string // The name of the station
    url: string // The stream URL provided by the user
    urlResolved: string // An automatically "resolved" stream URL.
    homepage: string // URL to the homepage of the stream.
    favicon: string // URL to an icon or picture that represents the stream. (PNG, JPG)
    tags: string[] // Tags of the stream
    country: string // Full name of the country
    countryCode: string // Official countrycodes as in ISO 3166-1 alpha-2
    state: string // Full name of the entity where the station is located inside the country
    language: string[] // Languages that are spoken in this stream.
    votes: number // Number of votes for this station
    lastChangeTime: Date // Last time when the stream information was changed in the database
    codec: string // The codec of this stream recorded at the last check.
    bitrate: number // The bitrate of this stream was recorded at the last check.
    hls: boolean // Mark if this stream is using HLS distribution or non-HLS.
    lastCheckOk: boolean // The current online/offline state of this stream.
    lastCheckTime: Date // The last time when any radio-browser server checked the online state of this stream
    lastCheckOkTime: Date // The last time when the stream was checked for the online status with a positive result
    lastLocalCheckTime: Date // The last time when this server checked the online state and the metadata of this stream
    clickTimestamp: Date // The time of the last click recorded for this stream
    clickCount: number // Clicks within the last 24 hours
    clickTrend: number // The difference of the clickcounts within the last 2 days. Positive values mean an increase, negative a decrease of clicks.
    geoLat: number | null // Latitude on earth where the stream is located. Null if it doesn't exist.
    geoLong: number | null // Longitude on earth where the stream is located. Null if it doesn't exist.
}


const RadioMapPage = () => {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [selectedRadio, setSelectedRadio] = useState<any>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isFavorite, setIsFavorite] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [stations, setStations] = useState<any[]>([]);
    const [stationsWithGeo, setStationsWithGeo] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(false)
    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);
    const [time, setTime] = useState<string>('');


    useEffect(() => {
        // Função para atualizar o horário
        const updateTime = () => {
            const currentTime = new Date().toLocaleTimeString('en-US', {
                hour12: false, // Usar formato de 24 horas
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTime(currentTime);
        };

        // Chama a função para definir a hora logo após a montagem
        updateTime();

        // Atualiza o tempo a cada segundo
        const timer = setInterval(updateTime, 1000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(timer);

    }, []);



    useEffect(() => {
        const getStations = async () => {
            const { allStations, stationsWithGeo } = await fetchStations();
            setStations(allStations);
            setStationsWithGeo(stationsWithGeo);
        };

        getStations();
    }, []);


    useEffect(() => {
    }, [currentCategory]);

    useEffect(() => {
        if (audioRef.current && selectedRadio) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [selectedRadio]);

    // Memorize o debounce para que ele não seja recriado em cada renderização
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setCategorySearch(value);
            setIsloading(false);
        }, 150),
        []
    );

    const handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsloading(true);
        debouncedSearch(event?.target.value);
    };

    const filteredStations = stations.filter((station) => (
        station.name?.toLowerCase().includes(categorySearch.toLowerCase()) && station.votes >= 250 && station.lastCheckOk === true ||
        station.country?.toLowerCase().includes(categorySearch.toLowerCase()) && station.votes >= 250 && station.lastCheckOk === true ||
        station.tags?.some((tag: string) => tag.toLowerCase().includes(categorySearch.toLowerCase())) && station.votes >= 250 && station.lastCheckOk === true)
    );

    const handleRadioSelect = (station: any) => {
        setIsloading(false)
        setSelectedRadio(station);

    };


    const { theme, setTheme } = useTheme();


    console.log(filteredStations)


    return (
        <div className="relative min-h-screen items-center">
            <div className="flex-1 absolute inset-0 w-full h-full">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={theme === 'light' ? {} : {
                        opacity: 0.9,
                        //background: "linear-gradient(135deg, rgba(255, 92, 88, 0.8), rgba(88, 185, 255, 0.8), rgba(88, 255, 163, 0.8))",
                        //filter: "blur(4px)",
                        // x: 2, 
                        filter: "brightness(1.75)",
                        rotate: -0.2,
                        //y: -2,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                    }}>

                    <MapboxMap
                        radios={stationsWithGeo}
                        currentCategory={currentCategory}
                        onRadioSelect={handleRadioSelect}
                        selectedRadio={selectedRadio}
                    />
                </motion.div>

            </div>



            <motion.div>
                {isSearchOpen && <SearchBar
                    id={''}
                    isLoading={isLoading}
                    handleCategorySearch={handleCategorySearch}
                    categorySearch={categorySearch}
                    filteredStations={filteredStations}
                    handleRadioSelect={handleRadioSelect}
                    onClose={closeSearch}
                />}


            </motion.div>

            <div className="fixed w-[350px] mb-10  bottom-0 [position-area:bottom] left-0 right-0 justify-center items-center z-10 tablet:mb-5 sm:w-[420px] mx-4 rounded-lg p-4 blur-cover">
                <div className="h-fit flex gap-2  justify-between items-center p-2 w-[-webkit-fill-available]">
                    <span className='flex'>
                        {time}
                    </span>

                    <span className='flex float-right'>
                        {theme === 'light' ?
                            <MoonIcon className='w-6 h-6' onClick={() => setTheme('dark')} />
                            :
                            <SunIcon className='w-6 h-6' onClick={() => setTheme('light')} />}
                    </span>
                </div>
                {selectedRadio === null || undefined ?

                    <div className="sm:p-2 flex p-4 bg-transparent items-center rounded-sm">
                        <div className='grid gap-2 items-center w-[-webkit-fill-available]'>
                            <div className="gap-2 flex w-[-webkit-fill-available]">
                                <span className='float-left inline-grid items-center '>
                                    <p className={`text-lg font-semibold truncate`}>Comece a ouvir</p>
                                    <li className='flex gap-2 items-center'>
                                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Rádio não selecionado</p>
                                    </li>
                                </span>
                            </div>
                        </div>
                    </div>

                    :
                    selectedRadio && (
                        <div key={selectedRadio.stationuuid} className="sm:p-2 flex p-4 bg-transparent items-center rounded-sm">
                            <div className='grid gap-2 items-center w-[-webkit-fill-available]'>
                                {/* <div>
                                {selectedRadio.favicon && (
                                    <img className='w-5 h-5' src={selectedRadio.favicon} alt={`${selectedRadio.name} logo`} />
                                )}
                                </div> */}
                                <div className="h-fit w-fit">
                                    <audio controls={false} muted={isPlaying} className='w-[160px] h-8 max-w-xl sm:w-[200px] rounded-none' ref={audioRef} style={{ borderRadius: '0.125rem', background: 'transparent' }}>
                                        <source src={selectedRadio.urlResolved} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <div className="gap-2 flex w-[-webkit-fill-available]">
                                    <span className='float-left inline-grid items-center '>
                                        <p className={`text-lg font-semibold truncate`}>{selectedRadio.name}</p>

                                        <li className='flex gap-2 items-center'>
                                            <p className={`text-sm ${theme === 'light' ? '' : 'text-gray-300'}`}>{selectedRadio.country}</p>
                                            <div className='rounded-full bg-white w-1 h-1'></div>
                                            <p className={`text-sm ${theme === 'light' ? '' : 'text-gray-300'}`}>{selectedRadio.codec}</p>
                                            <div className='rounded-full bg-white w-1 h-1'></div>
                                            <p className={`text-sm ${theme === 'light' ? '' : 'text-gray-300'}`} > {selectedRadio.bitrate + "kbps"}</p>
                                        </li>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className='flex gap-4 items-center justify-end pt-2'>
                    <button className='float-right inline-flex items-center'>
                        <SearchIcon className='w-6 h-6' onClick={() => setIsSearchOpen(!isSearchOpen)} />
                    </button>
                    {isPlaying === false ?
                        <button className='float-right inline-flex items-center'>
                            <PlayIcon className='w-6 h-6' onClick={() => setIsPlaying(true)} />
                        </button>
                        :
                        <button className='float-right inline-flex items-center'>
                            <PauseIcon className='w-6 h-6' onClick={() => setIsPlaying(false)} />
                        </button>
                    }
                    <button className='float-right inline-flex items-center'>
                        <HeartIcon className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default RadioMapPage;
