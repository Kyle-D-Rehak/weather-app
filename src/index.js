import './style.css';

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_API_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
const GEOCODING_API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?';
const APP_ID = 'appid=b41468f0e1e834ab9afbc20d74bb7863';
const mainContainer = document.getElementById('content');


//Take user location input and convert it into geographical coordinates
async function getCoords(location) {
    const response = await fetch(`${GEOCODING_API_BASE_URL}q=${location}&${APP_ID}`)
    const coords = await response.json();
    console.log(coords);
    return coords;
}

//get current weather
async function getWeather(coords) {
    const response = await fetch(`${WEATHER_API_BASE_URL}lat=${coords[0].lat}&lon=${coords[0].lon}&${APP_ID}`);
    const data = await response.json();
    return data;
}


//get 5 day forecast
async function getForecast(coords) {
    const response = await fetch(`${FORECAST_API_BASE_URL}lat=${coords[0].lat}&lon=${coords[0].lon}&${APP_ID}`);
    const data = await response.json();
    return data;
}

//Take raw weather data and format it into an object with only necessary data
function dataFormatter(rawWeatherData) {
    const formattedData = {};

}

async function getData(location) {
    renderLoader();
    const coords = await getCoords(location);
    const weather = await getWeather(coords);
    //const forecast = await getForecast(coords);
    console.log(weather);
    renderWeather(weather);

    return [weather, forecast];
}

//clear div with current weather info and rerender it with new data
function renderWeather(weather) {
    const container = document.getElementById('weatherContainer');
    const currentTemp = Math.round((weather.main.temp - 273.15) * 9 / 5 + 32);
    const high = Math.round((weather.main.temp_max - 273.15) * 9 / 5 + 32);
    const low = Math.round((weather.main.temp_min - 273.15) * 9 / 5 + 32);

    const location = document.createElement('h2');
    location.textContent = weather.name;
    
    const condition = document.createElement('p');
    condition.textContent = weather.weather[0].description;
    
    const temp = document.createElement('p');
    temp.textContent = `${currentTemp}°`;
    
    const highLow = document.createElement('p');
    highLow.textContent = `H:${high}° L:${low}°`;
    
    container.innerHTML = '';
    container.appendChild(location);
    container.appendChild(condition);
    container.appendChild(temp);
    container.appendChild(highLow);
}

function pageLoad() {
    const header = document.createElement('div');
    header.id = 'header';
    const form = document.createElement('form');

    const body = document.createElement('div');
    body.id = 'body';

    const weatherContainer = document.createElement('div');
    weatherContainer.id = 'weatherContainer';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'location');
    input.setAttribute('id', 'location');

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = 'Search';

    submit.addEventListener('click', (event) => {
        event.preventDefault();
        getData(input.value);
        console.log(input.value);
    });

    form.appendChild(input);
    form.appendChild(submit);

    mainContainer.appendChild(header);
    header.appendChild(form);
    mainContainer.appendChild(body);
    body.appendChild(weatherContainer);

}

function renderLoader() {
    const container = document.getElementById('weatherContainer');
    const loader = document.createElement('div');
    loader.classList.add('loader');

    container.innerHTML = '';
    container.appendChild(loader);

}

pageLoad();
getData('nanjing');