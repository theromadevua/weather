import React from 'react';
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import { useAppSelector } from '../../../store/store';

const DegreesBar = () => {
    const { weather } = useAppSelector(state => state.weather);

    if (!weather) return null;

    const data = weather.forecast.hourly;

    return (
        <div className="degrees-bar" style={{ width: '100%', overflowX: 'auto'}}>
            <ResponsiveContainer width={data.length * 40} height={220}>
                <LineChart data={data} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                    <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12, fill: '#bbb' }}
                        interval={2}
                    />
                    <YAxis hide />
                    <Tooltip
                        cursor={{ stroke: 'rgba(33, 150, 243, 0.5)', strokeWidth: 1 }}
                        contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '5px', padding: '5px' }}
                        labelFormatter={(label) => `Time: ${label}`}
                        formatter={(value) => [`${value}°C`, 'Temperature']}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DegreesBar;
