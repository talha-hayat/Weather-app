import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Weather = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [filteredCities, setFilteredCities] = useState([])
  const API_KEY = "6264c2af55653a7b45fcff5bd1cabf4e&units=metric"
  
  // all cities names
  const popularCities = [
      // Asia
  "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta",
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
  "Dhaka", "Kathmandu", "Colombo", "Male", "Thimphu",
  "Beijing", "Shanghai", "Hong Kong", "Tokyo", "Osaka",
  "Seoul", "Bangkok", "Singapore", "Kuala Lumpur", "Jakarta",
  "Manila", "Hanoi", "Ho Chi Minh City", "Phnom Penh", "Vientiane",
  "Yangon", "Dubai", "Abu Dhabi", "Riyadh", "Jeddah",
  "Doha", "Muscat", "Kuwait City", "Beirut", "Baghdad",
  
  // Europe
  "London", "Manchester", "Birmingham", "Edinburgh", "Glasgow",
  "Paris", "Marseille", "Lyon", "Berlin", "Munich",
  "Hamburg", "Rome", "Milan", "Venice", "Madrid",
  "Barcelona", "Lisbon", "Porto", "Brussels", "Amsterdam",
  "Rotterdam", "Vienna", "Prague", "Warsaw", "Krakow",
  "Budapest", "Bucharest", "Athens", "Stockholm", "Oslo",
  "Helsinki", "Copenhagen", "Moscow", "Saint Petersburg", "Istanbul",
  
  // North America
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "Toronto",
  "Montreal", "Vancouver", "Ottawa", "Mexico City", "Guadalajara",
  "Monterrey", "Cancun", "Havana", "Kingston", "Port-au-Prince",
  
  // South America
  "São Paulo", "Rio de Janeiro", "Buenos Aires", "Lima", "Bogotá",
  "Santiago", "Caracas", "Quito", "La Paz", "Montevideo",
  "Asunción", "Georgetown", "Paramaribo", "Cayenne",
  
  // Africa
  "Cairo", "Alexandria", "Nairobi", "Johannesburg", "Cape Town",
  "Lagos", "Kano", "Accra", "Casablanca", "Rabat",
  "Tunis", "Algiers", "Addis Ababa", "Khartoum", "Dar es Salaam",
  "Kampala", "Lusaka", "Harare", "Maputo", "Antananarivo",
  
  // Oceania
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide",
  "Auckland", "Wellington", "Christchurch", "Suva", "Port Moresby",
  "Nouméa", "Honolulu"
  ]

  // Filter cities based on search input
  useEffect(() => {
    if (city.length > 0) {
      setFilteredCities(
        popularCities.filter(c => 
          c.toLowerCase().includes(city.toLowerCase())
        )
      )
    } else {
      setFilteredCities([])
    }
  }, [city])

  async function search(city) {
    if (!city) {
      setError("Please enter a city name!")
      return
    }
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      setWeather(response.data)
      setError("")
      setIsOpen(false)
    } catch {
      setError("Please enter a correct city name!")
      setWeather(null)
    }
  }

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity)
    console.log(selectedCity)
    search(selectedCity)
    setIsOpen(false)
    setCity("")
  }

  return (
    <div className='m-2 h-[97vh] rounded-xl'>
      <div className='relative mx-1 ml-[-40px] mt-2 h-fit lg:h-auto sm:h-auto'>
        {/* Search Bar with Dropdown */}
        <div className='relative top-4 left-1/2 transform -translate-x-1/2 z-10 w-[80%] flex flex-col m-7'>
          <div className='relative'>
            <input 
              onChange={(e) => {
                setCity(e.target.value)
                setIsOpen(true)
              }}
              onFocus={() => setIsOpen(true)}
              value={city}
              className='border-2 border-blue-500 w-full p-2 rounded-t-md' 
              type="text" 
              placeholder="Search city..."
            />
            <button 
              onClick={search} 
              className='absolute right-0 top-0 bg-blue-500 text-white px-4 h-full rounded-r-md'
            >
              Search
            </button>
          </div>
          
          {/* Dropdown Options */}
          {isOpen && filteredCities.length > 0 && (
            <ul className='absolute top-full left-0 w-full bg-white border-2 border-blue-500 border-t-0 rounded-b-md max-h-60 overflow-y-auto z-20'>
              {filteredCities.map((cityName, index) => (
                <li
                  key={index}
                  onClick={() => handleCitySelect(cityName)}
                  className='p-2 hover:bg-blue-100 cursor-pointer'
                >
                  {cityName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='m-[8%] lg:mx-[25%] h-auto rounded-lg lg:w-[50%] border-2 bg-red-300 border-red-700 text-center text-red-900 lg:py-2'>
          {error}
        </div>
      )}

      {/* Weather Display */}
      {weather && (
        <div>
          <div className='m-[7.5%] h-auto rounded-3xl w-auto px-[30%] justify-center pt-2'>
            <img 
              className='lg:w-[50%] h-auto rounded-[50%] object-cover' 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt="Weather icon"
            />
          </div>
          <div className='m-[1%] my-4 h-auto flex flex-wrap justify-center align-item-center gap-2'>
            <div className='border-2 border-blue-500 text-blue-500 rounded-lg w-full sm:w-1/2 lg:w-1/3 text-center justify-center text-[1rem] sm:text-[1.5rem] pt-2'>
              Temperature <br />
              <h1 className='text-[1.5rem] sm:text-[3.5rem] text-blue-500 rounded-xl border-blue-500'>
                {Math.round(weather.main.temp)}°C
              </h1>
            </div>

            <div className='border-2 border-blue-500 text-blue-500 rounded-lg w-full sm:w-1/2 lg:w-1/3 text-center justify-center text-[1rem] sm:text-[1.5rem] pt-2'>
              Location <br />
              <h1 className='text-[1.5rem] sm:text-[3.5rem] text-blue-500 rounded-xl border-blue-500'>
                {weather.name}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather