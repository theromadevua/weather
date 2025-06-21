import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";


export const getWeather = createAsyncThunk(
    'weather/getWeather',
    async ({latitude, longitude}: {latitude: number | undefined, longitude: number | undefined}, {rejectWithValue}): Promise<any> => {
        try {
            const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/getWeather?lat=${latitude}&lon=${longitude}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const searchCities = createAsyncThunk('weather/', async (city: string, {rejectWithValue}) => {
    try {
        const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/searchCities?city=${city}`);
        console.log(res)
        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
})