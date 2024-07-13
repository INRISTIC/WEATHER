import axios from 'axios';

const API_KEY = 'c0c767d0dbd4142401b9bca74616fa02'; 

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: API_KEY,
  },
});

export default weatherApi;