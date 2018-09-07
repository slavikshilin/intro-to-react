import React, { Component } from "react";
import "bootswatch/journal/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Москва", id: "524894" },
  { name: "Минск", id: "625144" },
  { name: "Бишкек", id: "1528334" },
];

class WeatherDisplay extends Component {
  
  constructor() {
    super();
    this.state = {
      weatherData: null,
      city: null
    };
  }

  componentDidMount() {
    const id = this.props.id;
    const city = this.props.city;
    const URL = "https://api.openweathermap.org/data/2.5/weather?id=" +
      id +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric&lang=ru";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json, city: city });
    });
  }
  
  render() {
    const weatherData = this.state.weatherData;
    const city = this.state.city;
    if (!weatherData) return <div>Загрузка</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "https://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.description} в {city}
          <img src={iconUrl} />
        </h1>
        <p>Сейчас: {weatherData.main.temp}°C</p>
        <p>Максимум: {weatherData.main.temp_max}°C</p>
        <p>Мнимум: {weatherData.main.temp_min}°C</p>
        <p>Скорость ветра: {weatherData.wind.speed} м/сек</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Погода по городам на сегодня
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Выберите город</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} id={PLACES[activePlace].id} city={PLACES[activePlace].name} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
