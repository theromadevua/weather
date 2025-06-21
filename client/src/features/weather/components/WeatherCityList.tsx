import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {resetCityList, setLocation} from "../../../store/weather/WeatherSlice";

function WeatherCityList() {
    const {cityList, cityListLoading} = useAppSelector(state => state.weather);
    const dispatch = useAppDispatch();
    if(!cityListLoading && !cityList.length) return null;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleSetCity = ({lat, lon}: {lat: number, lon: number}) => {
        dispatch(setLocation({lat, lon}))
        dispatch(resetCityList())
    }

    return (
        <div className="weather-city-list" onClick={handleClick}>
            <div className="weather-city-list__item-content">
                {cityListLoading && <p className="weather-city-list__loading">loading...</p>}
                {!cityListLoading && cityList.map((city: any) => (
                    <div onClick={() => handleSetCity({lat: city.coord.lat, lon: city.coord.lon})} key={city.id} className="weather-city-list__item">
                        <div>
                            <h2 >{city.name}</h2>
                            <h3>{city.weather[0].description}</h3>
                        </div>
                        <h4>{city.main.temp}°C</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherCityList;