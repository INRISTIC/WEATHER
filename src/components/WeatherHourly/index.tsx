import React from 'react';
import styled from 'styled-components';

import DayTemperatureInfo from '../DayTemperatureInfo';
import useAppSelector from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setActiveWeatherHourNumber } from '../../redux/slices/weatherSlice';

const DayHoursInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(1, auto);
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
  }
`;

const WeatherHourly = ({ convertTemperature }) => {
  const { weatherData, activeWeatherHourNumber } = useAppSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();

  return (
    <DayHoursInfoContainer>
      {weatherData.hourly.slice(0, 8).map((hourWeatherInfo, index) => (
        <DayTemperatureInfo
          index={index}
          key={hourWeatherInfo.dt}
          activeWeatherHourNumber={activeWeatherHourNumber}
          degrees={convertTemperature(hourWeatherInfo.temp)}
          time={hourWeatherInfo.dt + weatherData.timezone_offset}
          imageSrc={hourWeatherInfo.weather[0].icon}
          setActiveWeatherHourNumber={() =>
            dispatch(setActiveWeatherHourNumber(index))
          }
        />
      ))}
    </DayHoursInfoContainer>
  );
};

export default WeatherHourly;
