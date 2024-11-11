"use client";

import React, { useState } from "react";
import MapboxMap from "@/components/MapBox";
import { radios } from "@/app/util/radio"; // Supondo que `radios` seja uma lista de rádios

const RadioMapPage = () => {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [selectedRadio, setSelectedRadio] = useState(null);

    return (
        <div className="relative h-screen w-screen">
            {/* Componente do mapa */}
            <MapboxMap
                radios={radios}
                currentCategory={currentCategory}
                onRadioSelect={setSelectedRadio}
            />

            {/* Interface de Categorias */}
            <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-75 p-4 rounded-lg space-x-2">
                {["All", "Pop", "Rock", "Jazz"].map((category) => (
                    <button
                        key={category}
                        onClick={() => setCurrentCategory(category)}
                        className={`px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 ${currentCategory === category ? "bg-blue-500" : ""
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Player de Rádio */}
            {selectedRadio && (
                <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white space-y-2">
                    <p className="text-lg font-semibold">{selectedRadio.name}</p>
                    <p className="text-sm text-gray-300">{selectedRadio.country}</p>
                    <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">
                        Play
                    </button>
                </div>
            )}
        </div>
    );
};

export default RadioMapPage;
