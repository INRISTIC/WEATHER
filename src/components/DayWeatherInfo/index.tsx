import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import Gps from '../../assets/images/gps.svg';

const DayWeather = styled.div`
  max-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayWeatherInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const DayWeatherDateInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
`;

const DayWeatherDay = styled.span`
  margin-bottom: 0.5rem;  
  font-size: 25px;
`;

const DayWeatherDate = styled.span`
  font-size: 15px;
`;

const DayWeatherIcon = styled.div`
  width: 3.25rem;
  height: 3.75rem;

  img {
    scale: 1.75;
  }
`;

const DayInfoDegrees = styled.div`
  color: rgba(255, 255, 255);
  font-size: 90px;
  margin: 1.25rem 0 2rem;
`;

const DayInfoLocation = styled.div`
  font-size: 26px;
  gap: 1rem;
  display: flex;
  color: rgba(255, 255, 255);
`;

const DayInfoLocationIcon = styled.div`
  width: 1rem;
  height: 1.5rem;
`;

const DayWeatherInfoComponent = ({ degrees, location, imageHref }) => {
  return (
    <DayWeather>
      <DayWeatherInfo>
        <DayWeatherDateInfo>
          <DayWeatherDay>Today</DayWeatherDay>
          <DayWeatherDate>{format(new Date(), 'EEE, dd MMM')}</DayWeatherDate>
        </DayWeatherDateInfo>
        <DayWeatherIcon>
          <img src={`https://openweathermap.org/img/wn/${imageHref}@2x.png`} alt="" />
        </DayWeatherIcon>
      </DayWeatherInfo>
      <DayInfoDegrees>{degrees}</DayInfoDegrees>
      <DayInfoLocation>
        <DayInfoLocationIcon>
          <img src={Gps} alt="" />
        </DayInfoLocationIcon>
        {location.split('/').join(', ')}
      </DayInfoLocation>
    </DayWeather>
  );
};

export default DayWeatherInfoComponent;