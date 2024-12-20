'use client'
import { MoonIcon, SearchIcon, SunIcon, XIcon } from '@heroicons/react/outline';
import React, { useCallback, useMemo, useEffect, useState, useRef } from "react";
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import spin from './spin.gif'
import sample from './sample.jpg'




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

interface SearchBarProps {
    id: any,
    handleCategorySearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
    onClose: () => void;
    categorySearch: any
    filteredStations: any
    handleRadioSelect: any
}



// interface Radio {
//     name: string,
//     img: string,
//     country: string,
//     onClose: () => void
//     //onSelect: () => void

// }

export default function SearchBar({ handleCategorySearch, onClose, categorySearch, isLoading, filteredStations, handleRadioSelect }: SearchBarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);
    const { theme, setTheme } = useTheme();

    const [searchTerm, setSearchTerm] = useState("");

    const gradientBorder = theme === "light"
        ? "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-neutral-300"
        : "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-neutral-800";



    return (
        <>
            <motion.div
                className="fixed inset-0 backdrop-blur-md items-center justify-center z-50 flex"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: onClose ? 1 : 0,
                    scale: onClose ? 1 : 0.95,
                    pointerEvents: onClose ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>

                <div className={`relative p-8 rounded-2xl w-full max-w-lg border backdrop-blur-lg bg-opacity-65 shadow-lg  ${gradientBorder}`}>
                    <div className="flex items-center gap-4">
                        {/* Barra de pesquisa */}
                        <SearchIcon className="h-5 w-5 text-gray-500" />

                        <input
                            type="text"
                            onChange={handleCategorySearch}  // Usa a função handleCategorySearch
                            //value={searchTerm}
                            placeholder="Type a command or search..."
                            className={`w-full p-4 h-8 rounded-sm bg-transparent text-gray-300 placeholder-gray-500  focus:border-none focus:outline outline-none  ${theme === 'light' ? 'border-neutral-300 focus:outline-neutral-300 text-neutral-800 ' : 'border-neutral-800 focus:outline-neutral-700 '}`} />

                        {/* <div className={`flex p-4 ${isLoading === true ? "flex items-center right-1/3" : "[display:none]"}`}
                            style={{
                                backgroundImage: `url(${spin.src})`,
                                backgroundPosition: `right`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                width: "0.5rem",
                                height: "0.5rem"
                            }}>

                        </div> */}


                        {/* Botão de fechar */}
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-300"
                        >
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Opções abaixo da barra de pesquisa */}
                    <div className="mt-8 text-sm text-gray-400">
                        {categorySearch && (
                            <motion.div>
                                <div className="max-h-48 [scrollbar-width:thin] overflow-hidden overflow-y-auto rounded-lg mt-2">
                                    <div className="uppercase font-semibold text-xs text-gray-500 mb-2">
                                        Stations
                                    </div>
                                    {filteredStations.map((station: any) => (
                                        <>
                                            <div key={station.id} onClick={() => handleRadioSelect(station)}
                                                className={`flex items-center w-[-webkit-fill-available] gap-4 p-2 cursor-pointer hover:bg-opacity-20 hover:rounded-md ${theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-neutral-500'}`}>
                                                <div className='flex gap-2 items-center'>
                                                    <span className='flex bg-neutral-900 rounded w-10 h-10 '>
                                                        <img src={station.favicon || `${sample.src}`} alt={`${station.name} logo`} placeholder="blur"
                                                            // blurDataURL="./app/icons/57.jpg" // Carrega um blur até a imagem estar pronta
                                                            onError={(e) => {
                                                                e.currentTarget.src = `${sample.src}`; // Define imagem padrão em caso de erro
                                                            }} loading="lazy" width={40} height={40} className='p-2 object-cover rounded'
                                                        />
                                                    </span>
                                                </div >
                                                <div className='grid'>
                                                    <div className='flex'>
                                                        <span className={`font-medium max-w-[300px] tracking-wider  ${theme === 'light' ? 'text-neutral-600' : 'text-white'}`}>
                                                            {station.name}
                                                        </span>
                                                    </div>

                                                    <div className='flex w-[-webkit-fill-available]'>
                                                        <ul className='flex gap-2 truncate'>
                                                            <li className="text-gray-500 truncate">{station.country}</li>
                                                            <li className="text-gray-500">{station.bitrate + "kbps"}</li>
                                                            <li className="text-gray-500">{station.language}</li>
                                                            <li className="text-gray-500">{station.tags[0]}</li>

                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* <div className={`${isLoading === true ? "flex items-center right-1/4" : "[display:none]"}`}
                                                    style={{
                                                        backgroundImage: `url(${spin.src})`,
                                                        backgroundPosition: `right`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: 'cover',
                                                        width: "2rem",
                                                        height: "2rem"
                                                    }}>

                                                </div> */}
                                            </div >
                                        </>
                                    ))
                                    }
                                </div >
                            </motion.div >
                        )}
                        <div className="uppercase pt-2 font-semibold text-xs text-gray-500 mb-2">
                            Appearance
                        </div>
                        <div
                            className={`grid items-center justify-between py-2 px-2 hover:bg-opacity-20 hover:cursor-pointer rounded-md ${theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-neutral-700'}`}
                            onClick={theme === 'light' ? () => setTheme('dark') : () => setTheme('light')}>
                            <div className='flex items-center gap-4 '>
                                <div className='flex'>
                                    <span className={`rounded-md p-2 ${theme === 'light' ? 'bg-yellow-400  text-neutral-700' : 'bg-neutral-300 text-black'}`}>

                                        {theme === 'light' ? <SunIcon className='w-6 h-6' /> : <MoonIcon className='w-6 h-6' />}

                                    </span>
                                </div>
                                <div className='grid'>
                                    <span className={`font-semibold ${theme === 'light' ? 'text-neutral-600' : 'text-white'}`}>Switch to {theme == 'light' ? 'dark' : 'light'} mode</span>
                                    <span className={`text-gray-500`}>Currently in {theme} mode</span>
                                </div>

                            </div>
                        </div>

                        {/* <div className="uppercase font-semibold text-xs text-gray-500 mt-4 mb-2">
                            Tools
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className={`font-semibold ${theme === 'light' ? 'text-neutral-600' : 'text-white'}`}>Calculate</span>
                            < span className="text-gray-500">Try: 2 + 2 or 34% of 567</span>
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className={`font-semibold ${theme === 'light' ? 'text-neutral-600' : 'text-white'}`}>Check time anywhere</span>
                            <span className="text-gray-500">Try: time in Tokyo</span>
                        </div>
                        <div className="grid items-center justify-between py-1">
                            <span className={`font-semibold ${theme === 'light' ? 'text-neutral-600' : 'text-white'}`}>Current weather</span>
                            <span className="text-gray-500">Loading weather...</span>
                        </div> */}
                    </div >
                </div >
            </motion.div >
        </>
    );
}
