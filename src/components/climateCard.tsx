'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SunIcon, 
  CloudIcon, 
  CloudIcon as CloudRainIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
  ClockIcon,
  EyeIcon,
  ArrowUpIcon as WindIcon
} from "@heroicons/react/outline";

interface Weather {
    temperature: string,
    location: string
}

export const ClimateCard = (prop: Weather) => {
    const [time, setTime] = useState(new Date());
    const [weatherData, setWeatherData] = useState({
        condition: 'Nublado',
        humidity: 70,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        uvIndex: 3
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    // Simular atualização de dados meteorológicos
    useEffect(() => {
        const updateWeather = () => {
            setIsLoading(true);
            setTimeout(() => {
                setWeatherData(prev => ({
                    ...prev,
                    humidity: Math.floor(Math.random() * 30) + 50,
                    windSpeed: Math.floor(Math.random() * 20) + 5,
                    visibility: Math.floor(Math.random() * 5) + 8,
                    pressure: Math.floor(Math.random() * 50) + 990,
                    uvIndex: Math.floor(Math.random() * 8) + 1
                }));
                setIsLoading(false);
            }, 1000);
        };

        const interval = setInterval(updateWeather, 30000); // Atualiza a cada 30 segundos
        return () => clearInterval(interval);
    }, []);

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'nublado':
                return <CloudIcon className="h-8 w-8 text-gray-400" />;
            case 'ensolarado':
                return <SunIcon className="h-8 w-8 text-yellow-400" />;
            case 'chuva':
                return <CloudRainIcon className="h-8 w-8 text-blue-400" />;
            case 'tempestade':
                return <LightningBoltIcon className="h-8 w-8 text-purple-400" />;
            default:
                return <CloudIcon className="h-8 w-8 text-gray-400" />;
        }
    };

    const getTemperatureColor = (temp: string) => {
        const tempNum = parseInt(temp.replace('°C', ''));
        if (tempNum < 10) return 'text-blue-400';
        if (tempNum < 20) return 'text-green-400';
        if (tempNum < 30) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-white/10 rounded backdrop-blur-sm">
                    <LocationMarkerIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="text-base font-medium text-white">Clima</h2>
                    <p className="text-xs text-white/60">Informações meteorológicas</p>
                </div>
            </div>

            {/* Header com localização e tempo */}
            <motion.div 
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: isLoading ? 360 : 0 }}
                        transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                    >
                        {getWeatherIcon(weatherData.condition)}
                    </motion.div>
                    <div>
                        <p className="text-white font-medium">{weatherData.condition}</p>
                        <p className="text-sm text-gray-400">{prop.location}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        <span>{time.toLocaleTimeString()}</span>
                    </div>
                </div>
            </motion.div>

            {/* Temperatura principal */}
            <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className={`text-4xl font-bold ${getTemperatureColor(prop.temperature)}`}>
                    {prop.temperature}
                </div>
                <p className="text-sm text-gray-400 mt-1">Temperatura atual</p>
            </motion.div>

            {/* Grid de informações meteorológicas */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Umidade</span>
                    </div>
                    <div className="text-lg font-semibold text-white">{weatherData.humidity}%</div>
                </motion.div>

                <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <WindIcon className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-gray-400">Vento</span>
                    </div>
                    <div className="text-lg font-semibold text-white">{weatherData.windSpeed} km/h</div>
                </motion.div>

                <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <EyeIcon className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-gray-400">Visibilidade</span>
                    </div>
                    <div className="text-lg font-semibold text-white">{weatherData.visibility} km</div>
                </motion.div>

                <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Pressão</span>
                    </div>
                    <div className="text-lg font-semibold text-white">{weatherData.pressure} hPa</div>
                </motion.div>
            </div>

            {/* Barra de progresso para UV Index */}
            <motion.div 
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Índice UV</span>
                    <span className="text-sm font-semibold text-white">{weatherData.uvIndex}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                        className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(weatherData.uvIndex / 11) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    />
                </div>
            </motion.div>

            {/* Indicador de atualização */}
            {isLoading && (
                <motion.div 
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="text-xs text-gray-500">Atualizando dados...</div>
                </motion.div>
            )}
        </div>
    );
}