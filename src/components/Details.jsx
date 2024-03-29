import React, { useState, useEffect } from 'react'
import '../styles/details.css'
import axios from 'axios';
import { FaTemperatureFull, FaDroplet  } from "react-icons/fa6";
import { FaCloudRain, FaWind  } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import KEYS from "../../keys.js"
import Logo from "../assets/images/Logo.png"

import {dayImages, nightImages} from "./imageFilter.js"
import day from "../assets/images/bg-images/day.jpg"
import night from "../assets/images/bg-images/night.jpg"

const Details = () => {
    const { cityName } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const kelvinToCelsius = kelvin => kelvin - 273.15;
    const time = weatherData && weatherData.list[0] && weatherData.list[0].sys.pod;
    const arkaplan = time === "d" ? day : night;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${KEYS.API_KEY}`);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchWeatherData();

    }, [cityName]);

    console.log(weatherData);

    const renderForecast = () => {
        if (!weatherData) return null;
    
        const dailyData = weatherData.list.filter((data, index) => index % 8 === 0 && index < 40);

        // console.log(dailyData);
    
        return dailyData.map((dayData, index) => {
            const date = new Date(dayData.dt_txt);
            const dayAbbreviation = date.toLocaleDateString('en-US', { weekday: 'short' });
            const weatherCondition = dayData.weather[0].main;

            const weatherImages = time === "d" ? dayImages : nightImages;
            const matchingImage = weatherImages.find(img => img.name === weatherCondition);
            const weatherIcon = matchingImage ? matchingImage.url : null;

            return (
                <div className="detail-day" key={index}>
                    <p>{dayAbbreviation}</p>
                    {weatherIcon && <img src={weatherIcon} alt="" className='detail-day-svg' />}
                    <p>{Math.floor(kelvinToCelsius(dayData.main.temp))}°C</p>
                    <p style={{fontSize:"13px", whiteSpace:"nowrap"}}>{Math.floor(kelvinToCelsius(dayData.main.temp_min))}°C / {Math.floor(kelvinToCelsius(dayData.main.temp_max))}°C</p>
                </div>
            );
        });
    };
    
  return (
    <div className='detail-all'>
        <Link to='/' className='home-header'>
            <img src={Logo} alt="" />
        </Link>
        {weatherData && (
        <div className="detail-up">
            <div className="detail-top"  style={{ backgroundImage: `url(${arkaplan})` }}>
                <div>
                    <h1>{cityName}, {weatherData.city.country}</h1>
                    <p>
                        {new Date(weatherData.list[0].dt_txt).toLocaleDateString('us-US')}
                    </p> 
                </div>               
                <div>
                    <h1>{Math.floor(kelvinToCelsius(weatherData.list[0].main.temp))}°C</h1>
                    <p>{Math.floor(kelvinToCelsius(weatherData.list[0].main.temp_min))}°C / {Math.floor(kelvinToCelsius(weatherData.list[0].main.temp_max))}°C</p>
                    <p style={{ textTransform: 'capitalize'}}>{weatherData.list[0].weather[0].description}</p>
                </div>
                
            </div>
            <div className="detail-middle">
                <div className="detail-middle-single-info">
                    <div className="detail-info-icon">
                        <FaTemperatureFull style={{marginRight:"3px"}}/>
                        <p>Feels like</p>
                    </div>
                    <p>{Math.floor(kelvinToCelsius(weatherData.list[0].main.feels_like))}°C</p>
                </div>
                <div className="detail-middle-single-info">
                    <div className="detail-info-icon">
                        <FaCloudRain style={{marginRight:"3px"}}/>
                        <p>Probability of rain</p>
                    </div>
                    <p>{Math.floor(weatherData.list[0].pop)}%</p>
                </div>
                <div className="detail-middle-single-info">
                    <div className="detail-info-icon">
                        <FaWind style={{marginRight:"3px"}}/>
                        <p>Wind speed</p>
                    </div>
                    <p>{Math.floor(weatherData.list[0].wind.speed)} km/h</p>
                </div>
                <div className="detail-middle-single-info">
                    <div className="detail-info-icon">
                        <FaDroplet style={{marginRight:"3px"}}/>
                        <p>Air humidity</p>
                    </div>
                    <p>{Math.floor(weatherData.list[0].main.humidity)}%</p>
                </div>
                
            </div>
        </div>
        )}
        <div className="detail-down">
             {renderForecast()}
        </div>
    </div>
  )
}

export default Details
