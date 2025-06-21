import icon from "../../../assets/icon.png"
import weather_icon from "../../../assets/weather.svg"
import profile_icon from "../../../assets/profile_icon.svg"
import cities_icon from "../../../assets/cities.svg"
import map_icon from "../../../assets/map.svg"
import {NavLink, useNavigate} from "react-router-dom";

const WeatherHeader = () => {

    return (
        <div className="weather-header">
            <img className="weather-header__icon" src={icon}/>
            <NavLink to="/" className="weather-header__item">
                <div>
                    <img src={weather_icon}/>
                    <h3 className="weather-header__item-title">Weather</h3>
                </div>
            </NavLink>
            <NavLink to="/profile" className="weather-header__item">
                <div>
                    <img src={profile_icon}/>
                    <h3 className="weather-header__item-title">Profile</h3>
                </div>
            </NavLink>
            <div className="weather-header__item weather-header__item--inactive">
                <img src={map_icon}/>
                <h3 className="weather-header__item-title">Map</h3>
            </div>
            <div className="weather-header__item weather-header__item--inactive">
                <img src={cities_icon}/>
                <h3 className="weather-header__item-title">Cities</h3>
            </div>
        </div>
    );
};

export default WeatherHeader;