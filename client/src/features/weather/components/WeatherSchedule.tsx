import WeatherScheduleItem from "./WeatherScheduleItem";
import {useAppSelector} from "../../../store/store";

const WeatherSchedule = () => {
    const {weather} = useAppSelector(state => state.weather)

    return (
        <div className="weather-schedule">
            <h2 className="weather-schedule__title">Forecast: </h2>
            {weather?.forecast?.daily.map((item: any, index: number) => {
                return <div className="weather-schedule-item__container">
                    {index !== 0 && <hr className="weather-schedule-line"></hr>}
                    <WeatherScheduleItem item={item} key={index} />
                </div>
            })}
        </div>
    );
};

export default WeatherSchedule;