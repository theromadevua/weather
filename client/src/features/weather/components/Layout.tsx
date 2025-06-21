import React, {Children, ReactNode} from 'react';
import WeatherHeader from "./WeatherHeader";

function Layout({children}: {children: ReactNode}) {
    return (
        <div className="weather-layout">
            <WeatherHeader />
            {children}
        </div>
    );
}

export default Layout;