export const REQUESTED_WEATHER = 'REQUESTED_WEATHER'
export const REQUESTED_WEATHER_SUCCEEDED = 'REQUESTED_WEATHER_SUCCEEDED'
export const REQUESTED_WEATHER_FAILED = 'REQUESTED_WEATHER_FAILED'

function requestWeather() {
  return {
    type: REQUESTED_WEATHER,
  }
}

function requestWeatherSuccess(data, index) {
  return {
    type: REQUESTED_WEATHER_SUCCEEDED,
    payload: { data, index}
  }
}

function requestWeatherError(err) {
  return {
    type: REQUESTED_WEATHER_FAILED,
    payload: err
  }
}

/*eslint-disable */
export function fetchWeather (index, id) {
  return (dispatch) => {
    dispatch(requestWeather());
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric&lang=ru`)
      .then(
        function(res) {

          if(res.ok) {
            return res.json()  
          }

          throw new Error(`Network response was not ok. ${res.status} ${res.statusText}`)
        }       
      )
      .then(
        data => dispatch(requestWeatherSuccess(data, index)),
        err => dispatch(requestWeatherError(err))
      );
  }
};
/*eslint-enable */