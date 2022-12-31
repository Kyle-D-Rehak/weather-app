import './style.css';

const WEATHER_API_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
const GEOCODING_API_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct?';
const APP_ID = 'appid=b41468f0e1e834ab9afbc20d74bb7863';


//Take user location input and convert it into geographical coordinates
async function getCoords(location) {
    const response = await fetch(`${GEOCODING_API_BASE_URL}q=${location}&${APP_ID}`)
    const coords = await response.json();
    console.log(coords);
    return coords;
}


async function getWeather(location) {
    const coords = await getCoords(location);
    console.log(coords[0].lat);
    const response = await fetch(`${WEATHER_API_BASE_URL}lat=${coords[0].lat}&lon=${coords[0].lon}&${APP_ID}`);
    const data = await response.json();
    console.log(data);
}

getWeather('nanjing');