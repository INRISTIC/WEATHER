import React from 'react';
import styled from 'styled-components';
import { format, addSeconds, startOfDay } from 'date-fns';

const OclockWeather = styled.div`
  text-align: center;
`;

const OclockWeatherInfo = styled.div`
  cursor: pointer;
  width: 5rem;
  font-size: 26px;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 2.5rem;
  border: 0.5px solid #FFFFFF;
  padding: 1rem 0.625rem 1.25rem;
  display: flex;
  background-color: rgba(26, 32, 33, 0.3019607843);
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &.oclock-wether-info--active {
    background-color: #FFFFFF99;
    border: none;
  }
`;

const OclockWeatherHour = styled.span`
  display: block;
  margin-bottom: 1.125rem;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.85);
`;

const OclockWeatherIcon = styled.div`
  height: 42px;

  img {
    scale: 1.5; 
  }
`;

const DayTemperatureInfo = ({ index, time, degrees, activeWeatherHourNumber, imageHref, setActiveWeatherHourNumber }) => {

  function formatTime(seconds) {
    const time = addSeconds(startOfDay(new Date()), seconds);
    return format(time, 'h a');
  }
  

  return (
    <OclockWeather onClick={setActiveWeatherHourNumber}>
      <OclockWeatherHour>
        {index === 0 ? 'Now' : `${formatTime(time)}`}
      </OclockWeatherHour>
      <OclockWeatherInfo className={activeWeatherHourNumber === index ? 'oclock-wether-info--active' : ''}>
        <OclockWeatherIcon>
          <img src={`https://openweathermap.org/img/wn/${imageHref}@2x.png`} alt="" />
        </OclockWeatherIcon>
        {degrees}°
      </OclockWeatherInfo>
    </OclockWeather>
  );
};

export default DayTemperatureInfo;