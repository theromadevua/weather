import icon from "../../../assets/weather-bg.png"
import descriptionIcon from "../../../assets/description.svg"
import windIcon from "../../../assets/wind.svg"
import humidityIcon from "../../../assets/humidity.svg"
import feelsLikeIcon from "../../../assets/temperature.svg"
import { useAppSelector } from "../../../store/store";

const WeatherConditions = () => {
    const {weather} = useAppSelector(state => state.weather)

    return (
        <div className="weather-conditions">
            <h2 className="weather-conditions__title">Conditions</h2>
            <div className="weather-conditions__metrics">
                <div className="weather-conditions__item">
                    <img className="weather-conditions__item-icon" src={descriptionIcon}/>
                    <div>
                        <h3>Description</h3>
                        <h2 className="weather-conditions__item-value">{weather?.weather[0]?.description}</h2>
                    </div>
                </div>
                <div className="weather-conditions__item">
                    <img className="weather-conditions__item-icon" src={humidityIcon}/>
                    <div>
                        <h3>Humidity</h3>
                        <h2 className="weather-conditions__item-value">{weather?.main?.humidity}%</h2>
                    </div>
                </div>
                <div className="weather-conditions__item">
                    <img className="weather-conditions__item-icon" src={windIcon}/>
                    <div>
                        <h3>Wind</h3>
                        <h2 className="weather-conditions__item-value">{weather?.wind?.speed}m/s</h2>
                    </div>
                </div>
                <div className="weather-conditions__item">
                    <img className="weather-conditions__item-icon" src={feelsLikeIcon}/>
                    <div>
                        <h3>Feels Like</h3>
                        <h2 className="weather-conditions__item-value">{weather?.main?.feels_like.toFixed(0)}°</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherConditions;