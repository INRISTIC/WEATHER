import React from 'react';
import styled from 'styled-components';

import WeatherDetail from '../WeatherDetail';

import { convertDate } from '../../utils/convertDate';
import Sunrise from '../../assets/images/sunrise.svg';
import Sunset from '../../assets/images/sunset.svg';
import Precipitation from '../../assets/images/precipitation.svg';
import Humidity from '../../assets/images/humidity.svg';
import Wind from '../../assets/images/wind.svg';
import Pressure from '../../assets/images/pressure.svg';
import Temperature from '../../assets/images/temperature.svg';
import Visibility from '../../assets/images/visibility.svg';


interface WeatherDetailsProps {
  weatherData: any;
  activeWeatherHourNumber: number;
  convertTemperature: (temp: number) => number;
}

const WeatherDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 288px);
  grid-template-rows: repeat(2, auto);
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 1255px) {
    grid-template-columns: repeat(2, 288px);
    grid-template-rows: repeat(4, auto);
  }

  @media (max-width: 654px) {
    grid-template-columns: repeat(1, 288px);
    grid-template-rows: repeat(8, auto);
  }
`;

const WeatherDetailsTitle = styled.h2`
  position: relative;
  font-size: 26px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 2.5rem 0;

  @media (max-width: 1255px) {
    text-align: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1.5rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.85);
  }
`;

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData, activeWeatherHourNumber, convertTemperature }) => {
  const convertDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <WeatherDetailsTitle>Weather Details</WeatherDetailsTitle>
      <WeatherDetailsWrapper>
        <WeatherDetail title="Sunrise" info={convertDate(weatherData.current.sunrise)} icon={Sunrise} />
        <WeatherDetail title="Sunset" info={convertDate(weatherData.current.sunset)} icon={Sunset} />
        <WeatherDetail title="Precipitation" info={weatherData.minutely ? `${weatherData.minutely[0].precipitation}%` : '0%'} icon={Precipitation} />
        <WeatherDetail title="Humidity" info={`${weatherData.hourly[activeWeatherHourNumber].humidity}%`} icon={Humidity} />
        <WeatherDetail title="Wind" info={`${(weatherData.hourly[activeWeatherHourNumber].wind_speed * 3.6).toFixed(1)} km/h`} icon={Wind} />
        <WeatherDetail title="Pressure" info={`${parseFloat(weatherData.hourly[activeWeatherHourNumber].pressure)} hPa`} icon={Pressure} />
        <WeatherDetail title="Feels like" info={`${convertTemperature(weatherData.hourly[activeWeatherHourNumber].feels_like)}°`} icon={Temperature} />
        <WeatherDetail title="Visibility" info={`${(weatherData.hourly[activeWeatherHourNumber].visibility / 1000).toFixed(1)} km`} icon={Visibility} />
      </WeatherDetailsWrapper>
    </>
  );
}

export default WeatherDetails;