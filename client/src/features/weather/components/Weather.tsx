import React, { useEffect, useState } from "react";
import axios from "axios";
import DegreesBar from "./DegreesBar";
import WeatherWidget from "./WeatherWidget";
import WeatherSchedule from "./WeatherSchedule";
import WeatherConditions from "./WeatherConditions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getWeather } from "../../../store/weather/WeatherThunks";
import {resetCityList, setCityListLoading, setLocation} from "../../../store/weather/WeatherSlice";

const Weather = () => {
    const dispatch = useAppDispatch();
    const {weather, location} = useAppSelector(state => state.weather);

    const getLocationFromIP = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json?token=6b1aa1d6f68d17');
            const [latitude, longitude] = response.data.loc.split(',');
            dispatch(setLocation({ lat: parseFloat(latitude), lon: parseFloat(longitude) }));
        } catch (error) {
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setLocation({ lat: latitude, lon: longitude }))
                },
                (error) => {
                    getLocationFromIP();
                }
            );
        } else {
            getLocationFromIP();
        }
    }, []);

    useEffect(() => {
        if (location && location.lat && location.lon) {
            dispatch(getWeather({ latitude: location.lat, longitude: location.lon }));
        }
    }, [location]);

    if(!weather) return null;

    return (
        <div className="weather-container" onClick={() => dispatch(resetCityList())}>
            <div className="weather-bar">
                <WeatherWidget />
                <DegreesBar />
                <WeatherConditions />
            </div>
            <WeatherSchedule  />
        </div>
    );
};

export default Weather;
