import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

console.log('API Key:', process.env.REACT_APP_WEATHER_API_KEY); // выводит undefined
console.log('Autocomplete API URL:', process.env.REACT_APP_AUTOCOMPLETE_API); // выводит undefined

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: API_KEY,
  },
});

export default weatherApi;
