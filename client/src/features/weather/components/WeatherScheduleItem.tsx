const WeatherScheduleItem = ({item}: {item: any}) => {
    return (
        <div className="weather-schedule-item">
            <h3 className="weather-schedule-item__day-title">{item?.day}</h3>
            <img width="50px" src={require("../../../assets/weather-bg.png")}/>
            <h4 className="weather-schedule-item__temp">{item?.tempMax.toFixed(0)}/{item?.tempMin.toFixed(0)}</h4>
        </div>
    );
};

export default WeatherScheduleItem;