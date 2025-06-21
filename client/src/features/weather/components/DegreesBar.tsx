import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setCurrentDay } from '../../../store/weather/WeatherSlice';

const DegreesBar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const {weather, currentDay} = useAppSelector((state: any) => state.weather)
    
    const data = weather.forecast.hourly;
    const dailyData = weather.forecast.daily;
    
    const getDayStartIndex = (day: string) => {
        return data.findIndex((item: any) => item.day === day);
    };

    const scrollToDay = (day: string) => {
        dispatch(setCurrentDay(day));
        const dayIndex = getDayStartIndex(day);
        if (dayIndex !== -1 && containerRef.current) {
            const scrollPosition = dayIndex * 40; 
            containerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToDay(currentDay)
    }, [currentDay]);
    
    const processedData = data.map((item: any) => ({
        ...item,
        isCurrentDay: item.day === currentDay,
        displayTime: `${item.day} ${item.time}`
    }));
    
    const CustomDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (payload.isCurrentDay) {
            return (
                <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#ff6b35"
                    stroke="#fff"
                    strokeWidth={2}
                />
            );
        }
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#2196f3"
            />
        );
    };
    
    return (
        <div className="degrees-bar">
            <div className="degrees-bar__navigation">
                {dailyData.map((dayInfo: any) => (
                    <button
                        key={dayInfo.day}
                        onClick={() => scrollToDay(dayInfo.day)}
                        className={`degrees-bar__day-button ${
                            currentDay === dayInfo.day ? 'degrees-bar__day-button--active' : ''
                        }`}
                    >
                        <div className="degrees-bar__day-info">
                            <div className="degrees-bar__day-name">{dayInfo.day}</div>
                            <div className="degrees-bar__day-temp">{Math.round(dayInfo.temp)}°C</div>
                        </div>
                    </button>
                ))}
            </div>
            
            <div 
                ref={containerRef}
                className="degrees-bar__container"
                style={{ width: '100%' }}
            >
                <ResponsiveContainer width={processedData.length * 40} height={220}>
                    <LineChart 
                        data={processedData} 
                        margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
                    >
                        <XAxis
                            dataKey="displayTime"
                            tick={{ fontSize: 10, fill: '#bbb' }}
                            interval={1}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ stroke: 'rgba(33, 150, 243, 0.5)', strokeWidth: 1 }}
                            contentStyle={{ 
                                backgroundColor: '#333', 
                                color: '#fff', 
                                borderRadius: '8px', 
                                padding: '10px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                            labelFormatter={(label) => `${label}`}
                            formatter={(value, name, props) => [
                                `${value}°C`, 
                                props.payload.isCurrentDay ? 'Temperature (Selected Day)' : 'Temperature'
                            ]}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="temp" 
                            stroke="#2196f3" 
                            strokeWidth={2} 
                            dot={<CustomDot />}
                            activeDot={{ r: 8, fill: '#ff6b35' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="degrees-bar__current-info">
                {(() => {
                    const currentDayData = dailyData.find((d: any) => d.day === currentDay);
                    return currentDayData ? (
                        <div className="degrees-bar__weather-info">
                            {currentDayData.description} • 
                            {Math.round(currentDayData.tempMin)}°C - 
                            {Math.round(currentDayData.tempMax)}°C
                        </div>
                    ) : null;
                })()}
            </div>
        </div>
    );
};

export default DegreesBar;