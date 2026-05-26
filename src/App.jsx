import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherMain from './components/WeatherMain'
import WeatherDetails from './components/WeatherDetails'
import HourlyForecast from './components/HourlyForecast'
import ForecastSection from './components/ForecastSection'
import ErrorCard from './components/ErrorCard'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('metric') 

  const fetchByCity = async (city, u = unit) => {
    setLoading(true)
    setError(null)
    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${u}`),
        fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${u}`),
      ])
      if (!wRes.ok) {
        const err = await wRes.json()
        throw new Error(err.message || 'City not found')
      }
      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()])
      setWeather(wData)
      setForecast(fData)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchByCoords = async (lat, lon, u = unit) => {
    setLoading(true)
    setError(null)
    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${u}`),
        fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${u}`),
      ])
      if (!wRes.ok) throw new Error('Unable to fetch weather for your location')
      const [wData, fData] = await Promise.all([wRes.json(), fRes.json()])
      setWeather(wData)
      setForecast(fData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (city) => {
    if (city.trim()) fetchByCity(city.trim())
  }

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => setError('Permission denied. Please allow location access.')
    )
  }

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'
    setUnit(newUnit)
    if (weather) fetchByCity(weather.name, newUnit)
  }

  // Load default city on mount
  useEffect(() => {
    fetchByCity('Lagos')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const unitSymbol = unit === 'metric' ? '°C' : '°F'
  const windUnit = unit === 'metric' ? 'm/s' : 'mph'

  return (
    <div className="app-wrapper">
      <div className="bg-image" />
      <div className="bg-overlay" />

      <Header
        unit={unit}
        unitSymbol={unitSymbol}
        onToggleUnit={toggleUnit}
      />

      <main className="main-content">
        <div className="fade-up fade-up-1">
          <SearchBar
            onSearch={handleSearch}
            onGeolocate={handleGeolocate}
          />
        </div>

        {loading && (
          <div className="loading-wrapper">
            <div className="spinner-ring" />
            <span className="loading-text">Fetching weather data…</span>
          </div>
        )}

        {error && !loading && (
          <div className="fade-up">
            <ErrorCard message={error} />
          </div>
        )}

        {weather && !loading && (
          <>
            <div className="fade-up fade-up-1">
              <WeatherMain weather={weather} unitSymbol={unitSymbol} />
            </div>
            <div className="fade-up fade-up-2">
              <WeatherDetails weather={weather} windUnit={windUnit} unitSymbol={unitSymbol} />
            </div>
            {forecast && (
              <div className="fade-up fade-up-3">
                <HourlyForecast forecast={forecast} unitSymbol={unitSymbol} />
              </div>
            )}
            {forecast && (
              <div className="fade-up fade-up-4">
                <ForecastSection forecast={forecast} unitSymbol={unitSymbol} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
