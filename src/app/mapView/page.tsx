'use client'

import { fetchStations } from '@/app/api/apiRadio';
import React, { useEffect, useState, useRef } from "react";
import MapboxMap from "@/components/MapBox";
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { HeartIcon, SearchIcon, PlayIcon, PauseIcon, VolumeUpIcon } from '@heroicons/react/outline';
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

    // Definir o debounce fora do useCallback para evitar problemas de renderização
    const debouncedSearch = debounce((value: string) => {
        setCategorySearch(value);
        setIsloading(false)

    }, 150);

    const
        handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsloading(true)
            debouncedSearch(event.target.value);
        };

    const filteredStations = stations.filter((station) =>
        station.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.country.toLowerCase().includes(categorySearch.toLowerCase()) ||
        station.tags.some((tag: string) => tag.toLowerCase().includes(categorySearch.toLowerCase()))
    );

    const handleRadioSelect = (station: any) => {
        setIsloading(true)
        setSelectedRadio(station);
        setIsloading(false)

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
            >
                {isSearchOpen && <SearchBar
                    key={""}
                    isLoading={isLoading}
                    handleCategorySearch={handleCategorySearch}
                    categorySearch={categorySearch}
                    filteredStations={filteredStations}
                    handleRadioSelect={handleRadioSelect}
                    onClose={closeSearch} />}


            </motion.div>

            <div className="fixed w-[350px] mb-10  bottom-0 [position-area:bottom] left-0 right-0 justify-center items-center z-10 tablet:mb-5 sm:w-[420px] mx-4 rounded-lg p-2 blur-cover">

                {selectedRadio && (
                    <div key={selectedRadio.stationuuid} className="sm:p-2 flex pt-4 bg-transparent items-center rounded-sm h-10">
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
                            {selectedRadio != null && isPlaying === false ?
                                <div className={`flex p-4 ${isLoading === true ? "flex items-center right-1/3" : "[display:none]"}`}
                                    style={{
                                        backgroundImage: `url(${spin.src})`,
                                        backgroundPosition: `right`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        width: "2rem",
                                        height: "2rem"
                                    }}>
                                </div> : ""}
                        </div>
                    </div>
                )}

                <div className=' flex gap-4 items-center justify-end p-2'>
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
