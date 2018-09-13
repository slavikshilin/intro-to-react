import { REQUESTED_WEATHER, REQUESTED_WEATHER_SUCCEEDED, REQUESTED_WEATHER_FAILED } from '../actions/PageActions'

const initialState = {
  activePlace: 0,
  weatherData: null,
  err: null,
  city: null,
  isFetching: false
}

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_WEATHER:
      {
        let newState = { ...state, err: null, isFetching: true };
        return newState;
      }

      case REQUESTED_WEATHER_SUCCEEDED:
      {
        let newState = { ...state, weatherData: action.payload.data, activePlace: action.payload.index, isFetching: false };
        return newState;
      }

      case REQUESTED_WEATHER_FAILED:
      {
        let newState = { ...state, err: action.payload, isFetching: false };
        return newState;
      }      
      
    default:
      return state
  }
}
