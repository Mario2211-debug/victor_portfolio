import axios from "axios";
import { useGeolocated } from "react-geolocated";
import React from "react";

const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
});

const [location, setLocation] = React.useState('');
const [temperature, setTemperature] = React.useState('')
const [weather, setWeather] = React.useState(null);

React.useEffect(() => {
    if (coords) {
        fetchLocation(coords.latitude, coords.longitude);
    }
}, [coords]);

export const fetchLocation = async (lat, lon) => {
    try {

    } catch (error) {
        console.error("Error fetching location:", error);
    }


};
