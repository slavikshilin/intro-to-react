import React, { Component } from 'react'
import PropTypes from 'prop-types'  

export class WeatherDisplay extends Component {
  
  render() {
    const weatherData = this.props.weatherData
    const city = this.props.city
    const err = this.props.err
    const isFetching = this.props.isFetching 

    if (isFetching) { 
      return (
        <div className="alert" >
            <div className="loader"></div>
        </div>
      )
    } else if (err) {
      return (
        <div className="alert alert-danger fade show" role="alert">Ошибка: {err.message}</div>
      )
    } else if (weatherData) {
      const weather = weatherData.weather[0]
      const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png"
      return (
        <div>
          <h1>
          {city} - {weather.description} 
            <img src={iconUrl} alt={weather.description} />
          </h1>
          <p>Сейчас: {weatherData.main.temp}°C</p>
          <p>Максимум: {weatherData.main.temp_max}°C</p>
          <p>Минимум: {weatherData.main.temp_min}°C</p>
          <p>Скорость ветра: {weatherData.wind.speed} м/сек</p>
        </div>
      )
    } else {
      return null
    }
  }
}

WeatherDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
} 