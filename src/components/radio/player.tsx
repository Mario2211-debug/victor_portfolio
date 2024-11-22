
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PlayIcon,
    PauseIcon,
    HeartIcon,
    SearchIcon,
    PlusCircleIcon,
    MoonIcon,
    SunIcon,
    XCircleIcon
} from "@heroicons/react/solid";
import { format } from 'date-fns'
import spin from './spin.gif'
import { useTheme } from "next-themes";


const PlayerComponent = ({ selectedRadio, theme, toggleTheme, toggleSearch }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [favorites, setFavorites] = useState([]);
    const [playlists, setPlaylists] = useState({});
    const [playlistPanel, setPlaylistPanel] = useState(false)
    const [time, setTime] = useState('')
    const [currentPlaylist, setCurrentPlaylist] = useState("");
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [isAddingToPlaylist, setIsAddingToPlaylist] = useState(false);
    const audioRef = useRef(null);

    // Hover animation for buttons
    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(format(new Date(), 'hh:mm:ss')), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);


    // Load from localStorage on component mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
        setFavorites(storedFavorites);
        setPlaylists(storedPlaylists);
    }, []);

    // Save favorites and playlists to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [favorites, playlists]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch((error: any) => console.error("Playback error:", error));
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    // Reproduz automaticamente a rádio selecionada
    useEffect(() => {
        if (audioRef.current && selectedRadio) {
            // Pausa qualquer reprodução em andamento
            audioRef.current.pause();
            // Atualiza a URL do áudio
            audioRef.current.src = selectedRadio.urlResolved;
            setIsLoading(true)

            // Aguarda até que o áudio esteja pronto para reprodução
            const handleCanPlay = () => {
                setIsLoading(false)
                audioRef.current
                    .play()
                    .then(() => setIsPlaying(true))
                    .catch((error: any) => console.error("Playback error:", error));

            };

            audioRef.current.addEventListener("canplay", handleCanPlay)

            return () => {
                audioRef.current.removeEventListener("canplay", handleCanPlay);
            };
        }
    }, [selectedRadio]);


    // Add to favorites
    const handleAddToFavorites = () => {
        if (!selectedRadio) return;
        const updatedFavorites = favorites.includes(selectedRadio.name)
            ? favorites.filter((fav) => fav !== selectedRadio.name)
            : [...favorites, selectedRadio.name];
        setFavorites(updatedFavorites);
    };

    // Create a new playlist
    const handleCreatePlaylist = () => {
        setPlaylistPanel(true)
        if (!newPlaylistName.trim()) return;
        if (playlists[newPlaylistName]) {
            alert("Playlist already exists!");
            return;
        }
        setPlaylists((prev) => ({
            ...prev,
            [newPlaylistName]: [],
        }));
        setNewPlaylistName("");
    };

    // Add to an existing playlist
    const handleAddToPlaylist = (playlistName: any) => {
        if (!selectedRadio) return;
        setPlaylists((prev) => ({
            ...prev,
            [playlistName]: [...(prev[playlistName] || []), selectedRadio.name],
        }));
        setIsAddingToPlaylist(false)
    };

    const handleOpenPanel = () => {
        setPlaylistPanel(true)
        setIsAddingToPlaylist(!isAddingToPlaylist)
    }

    const handleClosePanel = () => {
        setPlaylistPanel(false)
        setIsAddingToPlaylist(!isAddingToPlaylist)
    }

    const gradientBorder = theme === "light"
        ? "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-neutral-300"
        : "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-neutral-700";


    return (
        <div className={`fixed bottom-0 w-[350px] tablet:w-[420px] mb-5 shadow-lg mx-4 ${gradientBorder} rounded-lg p-4 z-10`}>
            {/* Theme toggle */}
            <div className="flex items-center justify-between pb-4">
                <span>{time}</span>
                <div className="flex gap-4">
                    <span onClick={toggleTheme}>
                        {theme === "light" ? (
                            <MoonIcon className="w-6 h-6" />
                        ) : (
                            <SunIcon className="w-6 h-6" />
                        )}
                    </span>
                    <span onClick={toggleSearch} >
                        <SearchIcon className="w-6 h-6 hover:cursor-pointer" />
                    </span>
                </div>
            </div>

            {/* Media Info */}
            {selectedRadio ? (
                <div className="flex items-center gap-4">
                    <audio
                        ref={audioRef}
                        controls={false}
                        className="w-[200px] rounded-md"
                        src={selectedRadio.urlResolved}
                    />
                    <div className="truncate">
                        <p className="font-semibold text-ellipsis overflow-hidden ...">{selectedRadio.name}</p>
                        <p className="text-sm text-gray-500">{selectedRadio.country}</p>
                    </div>
                </div>
            ) : (
                <span className="p-2 text-center">
                    <p>No radio selected. Start exploring!</p>

                </span>)}
            <AnimatePresence>

                {/* Controls */}
                <div className="flex justify-between gap-4 mt-4">

                    {
                        playlistPanel ? (
                            <motion.button
                                key="open"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                className="rounded-full"
                                onClick={handleClosePanel}>
                                <XCircleIcon className="w-6 h-6" />
                            </motion.button>
                        ) : (
                            <motion.button
                                key="closed"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                className="rounded-full" onClick={handleOpenPanel}>
                                <PlusCircleIcon className="w-8 h-8" />
                            </motion.button>
                        )
                    }

                    {isLoading ?

                        <motion.button
                            onClick={togglePlay}
                            key="pause"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            className="rounded-full self-center"
                            style={{
                                backgroundImage: `url(${spin.src})`,
                                backgroundPosition: `right`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                width: "1.5rem",
                                height: "1.5rem"
                            }}>

                        </motion.button> :
                        <motion.button
                            onClick={togglePlay}
                            key="pause"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            className="rounded-full">
                            {isPlaying ? (
                                <PauseIcon className="w-8 h-8" />
                            ) : (
                                <PlayIcon className="w-8 h-8" />
                            )}
                        </motion.button>}


                    <motion.button
                        key="heart"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        className="rounded-full"
                        onClick={handleAddToFavorites}>
                        <HeartIcon
                            className={`w-8 h-8 ${favorites.includes(selectedRadio?.name)
                                ? "text-red-500"
                                : ""
                                }`}
                        />
                    </motion.button>
                </div>
            </AnimatePresence>

            {/* Playlist Management */}
            {isAddingToPlaylist && (
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="New playlist name"
                        className={`w-3/5 flex p-2 border place-self-center focus:border-none focus:outline outline-none  ${theme === 'light' ? 'border-neutral-300 focus:outline-neutral-500 ' : 'border-neutral-800 focus:outline-neutral-600 '} rounded-md`}
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                    <button
                        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md"
                        onClick={handleCreatePlaylist}
                    >
                        Create Playlist
                    </button>

                    <div className="mt-2">
                        <p className="text-sm font-semibold mb-1">Add to existing playlist:</p>
                        {Object.keys(playlists).map((playlistName) => (
                            <button
                                key={playlistName}
                                className="block w-full text-left px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                                onClick={() => handleAddToPlaylist(playlistName)}
                            >
                                {playlistName}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerComponent;
