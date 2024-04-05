import React, { useState } from 'react'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import KEYS from "../../keys.js"
import Logo from "../assets/images/Logo.png"

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityList, setCityList] = useState([]);

  const getCityList = async (searchQuery) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${KEYS.API_KEY}&units=metric`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      // console.error('Error fetching city list:', error);
      return [];
    }
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      const cities = await getCityList(query);
      setCityList(cities);
    } else {
      setCityList([]);
    }
  };

  const handleGetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEYS.API_KEY}&units=metric`);
        const data = await response.json();
        setCityList([data]);
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='home-all'>
      <Link to='/' className='home-header'>
        <img src={Logo} alt="" />
      </Link>
      <div className='home-middle-container'>
        <div className='home-container'>
          <h2>Welcome to <span style={{color:"#8FB2F5"}}>TypeWeather</span></h2>
          <p style={{marginBlock:"10px", color:"gray"}}>Choose a location to see the weather forecast</p>
          <input 
          type="text" 
          className='home-container-input' 
          placeholder='Location...'
          value={searchQuery}
          onChange={handleInputChange}
          />
        </div>
        <div className="home-results">
          {cityList.map((city) => (
            <div key={city.id} className="home-single-result">
              <Link to={`/details/${city.name}`} className='home-result-link'>{`${city.name}, ${city.sys.country}`}</Link>
            </div>
          ))}
        </div>
        <button onClick={handleGetCurrentLocation} className='get-location'>Get Current Location</button>
      </div>
      <p></p>
    </div>
  )
}

export default Home
