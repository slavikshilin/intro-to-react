import React, { Component } from "react"
import { connect } from 'react-redux'
import { fetchWeather } from '../actions/PageActions'
import { WeatherDisplay } from '../components/weatherDisplay'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

const PLACES = [
  { name: "Москва", id: "524894" },
  { name: "Минск", id: "625144" },
  { name: "Бишкек", id: "1528334" },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    
    const { page, setWeatherAction } = this.props 
    
    return (

      <div>
        <div className="container">
          <h1>Погода по городам на сегодня</h1>
          <div className="row">
            <div className="col-xl-8">
            <div className="row">
                {PLACES.map((place, index) => (
                    <div key={index} className="col">
                      <button id={index} className="btn btn-outline-success btn-lg btn-block" onClick={() => setWeatherAction(index, PLACES[index].id)}>{place.name}</button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-xl-4"></div>
          </div> 
          <div className="row mt-4">
            <div className="col-xl-8">
              <WeatherDisplay id={PLACES[page.activePlace].id} city={PLACES[page.activePlace].name} weatherData={page.weatherData} err={page.err} isFetching={page.isFetching} />
            </div>
            <div className="col-xl-4"></div>
          </div>         
        </div>
      </div>        
    );
  }
}

const mapStateToProps = store => {
  return {
    page: store.page,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWeatherAction: (index, id) => dispatch(fetchWeather(index, id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
