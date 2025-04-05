import { createSlice } from '@reduxjs/toolkit'
import {getWeather, searchCities} from './WeatherThunks'

interface initialStateType {
    error: string | null,
    isLoading: boolean,
    weather: any,
    location: {lat: number, lon: number} | null,
    cityList: [],
    cityListLoading: boolean,
}

const initialState: initialStateType = {
    isLoading: false,
    weather: null,
    error: null,
    cityList: [],
    location: null,
    cityListLoading: false,
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
      resetCityList: (state) => {
          state.cityList = []
      },
        clearError: (state) => {
          state.error = null
        },
        setLocation: (state, { payload: { lat, lon } }) => {

            if (lat !== undefined && lon !== undefined) state.location = {lat, lon}
        },
      setCityListLoading: (state) => {
          state.cityListLoading = true
      }
  },
  extraReducers: (builder) => {
    const pendingReducer = (state: initialStateType) => {
      state.isLoading = true
      state.error = null
    }

    const rejectedReducer = (state: initialStateType, action: any) => {
      state.isLoading = false
      state.error = action.error?.message || 'An error occurred'
    }

    builder
     .addCase(getWeather.fulfilled, (state, action) => {
        console.log(action.payload)
         const data = action.payload
         state.weather = data

     })
    .addCase(searchCities.fulfilled, (state, action) => {
        state.cityList = action.payload?.list
        state.cityListLoading = false
    })
    .addCase(searchCities.pending, (state, action) => {
        state.cityListLoading = true
    })
    .addCase(searchCities.rejected, (state, action) => {
        state.cityList = []
        state.cityListLoading = false
    })
  }
})

export const { clearError, setLocation, setCityListLoading, resetCityList } = weatherSlice.actions

export default weatherSlice.reducer
