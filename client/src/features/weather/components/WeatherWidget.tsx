import {useAppDispatch, useAppSelector} from "../../../store/store";
import {ChangeEvent, useState} from "react";
import search_icon from "../../../assets/search_icon.svg";
import {searchCities} from "../../../store/weather/WeatherThunks";
import WeatherCityList from "./WeatherCityList";
import {setCityListLoading} from "../../../store/weather/WeatherSlice";

const WeatherWidget = () => {
    const {weather} = useAppSelector(state => state.weather)
    let timeout: NodeJS.Timeout | undefined;
    const dispatch = useAppDispatch();

    const handleSetCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeout)
        const userCity = event.target.value;
        dispatch(setCityListLoading());

        timeout = setTimeout(() => {
            dispatch(searchCities(userCity))
        }, 300)
    }

    return (
        <div className="weather-widget">
            <div className="weather-widget__main-block">

                <span className="weather-widget__title">
                    <h1>{weather.main.temp.toFixed(0)}</h1>
                </span>
                <h2>Weather in {weather?.name}</h2>
                <div className="weather-widget__input-wrapper">
                    <img src={search_icon} className="weather-widget__input-icon" />
                    <input onChange={handleSetCity} className="weather-widget__input" type="text" placeholder="search your city" />
                    <WeatherCityList/>
                </div>
            </div>
            <img className="weather-widget__image" src={require("../../../assets/weather-bg.png")}/>
        </div>
    );
};

export default WeatherWidget;