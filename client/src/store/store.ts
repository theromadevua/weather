import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/AuthSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import weatherSlice from './weather/WeatherSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        weather: weatherSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


