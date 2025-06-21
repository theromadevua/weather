import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";


@Injectable()
export class WeatherService{
    constructor(
        private configService: ConfigService
    ){}

    async searchCities(city) {
        const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${this.configService.get<string>('API_KEY')}&units=metric`;
        console.log('aboba')
        try {
            const response = await axios.get(url);
            const data = await response.data;
            return data;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getWeatherForCity(city: string): Promise<any>{
        try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.configService.get<string>('API_KEY')}&units=metric`
            const res = await axios.get(url);
            const data = await this.getWeather(res.data.coord.lat, res.data.coord.lon);
            return data;
        }catch(err){
            throw new Error(err)
        }
    }

    async getWeather(lat: number, lon: number) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.configService.get<string>('API_KEY')}&units=metric&lang=en`;
            const response = await axios.get(url);
            const forecast = await this.getForecast(lat, lon);

            return {
                forecast,
                ...response.data
              }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getForecast(lat: number, lon: number) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.configService.get<string>('API_KEY')}`;

        console.log(url);
        const response = await axios.get(url);

        const dailyForecast = response.data.list.reduce((acc: any, item: any) => {
            const dateObj = new Date(item.dt * 1000);
            const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayKey = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            if (!acc.daily[dayKey]) {
                acc.daily[dayKey] = {
                    day,
                    description: item.weather[0].description,
                    tempSum: 0,
                    tempMin: item.main.temp_min,
                    tempMax: item.main.temp_max,
                    count: 0,
                    humidity: item.main.humidity,
                    feels_like: item.main.feels_like,
                    wind: item.wind.speed,
                };
            }

            acc.daily[dayKey].tempSum += item.main.temp;
            acc.daily[dayKey].count++;
            acc.daily[dayKey].tempMin = Math.min(acc.daily[dayKey].tempMin, item.main.temp_min);
            acc.daily[dayKey].tempMax = Math.max(acc.daily[dayKey].tempMax, item.main.temp_max);

            acc.hourly.push({
                day: day,
                time,
                temp: item.main.temp,
            });

            return acc;
        }, { daily: {}, hourly: [] });

        const dailySummary = Object.keys(dailyForecast.daily).map(dayKey => {
            const dayData = dailyForecast.daily[dayKey];
            const avgTemp = dayData.tempSum / dayData.count;

            return {
                day: dayData.day,
                description: dayData.description,
                temp: Number(avgTemp.toFixed(2)),
                tempMin: dayData.tempMin,
                tempMax: dayData.tempMax,
                humidity: dayData.humidity,
                feels_like: dayData.feels_like,
                wind: dayData.speed,

            };
        });

        return {
            daily: dailySummary,
            hourly: dailyForecast.hourly
        };
    }
}