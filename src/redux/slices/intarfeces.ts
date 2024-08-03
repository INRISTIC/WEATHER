import { WeatherUnitType } from '../../weather';

export interface ICityDate {
  name: string;
  code: string;
}

export interface IWeatherData {
  current: {
    sunrise: number;
    sunset: number;
  };
  minutely: {
    precipitation: number;
  }[];
  hourly: {
    dt: string;
    temp: number;
    pressure: number;
    feels_like: number;
    visibility: number;

    weather: {
      icon: string;
      wind_speed: number;
    }[];
  }[];
  timezone: string;
  timezone_offset: string;
}

export interface IWeatherState {
  error: boolean;
  loading: boolean;
  searchValue: string;
  weatherUnitType: WeatherUnitType;
  activeWeatherHourNumber: number;
  weatherData: IWeatherData;
  cities: ICityDate[];
  searchedCities: string;
}
