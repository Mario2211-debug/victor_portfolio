'use client'
import { useState, useEffect } from "react";
import { SunIcon, CloudIcon } from "@heroicons/react/outline";


interface Weather {
    temperature: string,
    location: string
}



export const ClimateCard = (prop: Weather) => {

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    const [weather, setWeather] = useState(null)

    useEffect(() => {

    })


    return (


        <>
            <div className=" w-fit text-white h-fit">
                <div className="flex items-center gap-3">
                    <div>
                        <CloudIcon className="h-8 w-8" />
                    </div>
                    <div className="flex gap-4">
                        <span>
                            <p>Nublado</p>
                            <p className="text-xs text-neutral-400">{prop.location}</p>
                        </span>
                    </div>
                    {time.toLocaleTimeString()}
                </div>

                <div className=" items-center gap-3 pt-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <p>{prop.temperature}</p>
                        </div>
                        <div className="flex gap-4">
                            <span>
                                <h4 className="text-xs text-neutral-400 font-light">Temperature</h4>
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center pt-4">
                        <div>
                            <p>70%</p>
                        </div>
                        <div className="flex gap-4">
                            <span>
                                <h4 className="text-xs text-neutral-400 font-light">Humidity</h4>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}