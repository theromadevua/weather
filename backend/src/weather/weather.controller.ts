import { Body, Controller, Get, HttpException, HttpStatus, Query, Res } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { Response } from "express";


@Controller('weather')
export class WeatherController {
    constructor(
        private weatherService: WeatherService
    ){}

    @Get('/getWeather')
    async getWeather(@Query() data: any, @Res() res: Response) {
        try {
            const response = await this.weatherService.getWeather(data.lat, data.lon)
            return res.json({...response})
        } catch (error) {
            throw new Error(error)
        }
    }

    @Get('/searchCities')
    async searchCities(@Query() data: any, @Res() res: Response) {
        try {
            if (!data.city) {
                throw new Error('City not found')
            }
            const response = await this.weatherService.searchCities(data.city)
            return res.json({...response})
        } catch (error) {
            throw new Error(error)
        }
    }

    @Get('/getWeatherForCity')
    async getWeatherForCity(@Query() data: any, @Res() res: Response) {
        try {
            if (!data.city) {
                throw new Error('City not found')
            }
            const response = await this.weatherService.getWeatherForCity(data.city)
            return res.json({...response})
        } catch (error) {
            throw new Error(error)
        }
    }
}