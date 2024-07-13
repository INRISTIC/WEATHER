import React from 'react';
import styled from 'styled-components';

interface WeatherDetailProps {
  title: string;
  info: string;
  icon: string;
}

const WeatherDetailContainer = styled.div`
  width: 288px;
  height: 146px;
  border-radius: 0.25rem;
  opacity: 0.85;
  box-shadow: 0px 0.25rem 0.5rem #00000029;
  background-color: #FFFFFF;
  padding: 2.5rem 2rem;
`;

const WeatherDetailTitle = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 19px;
  color: rgba(7, 42, 65, 0.6);
`;

const WeatherDetailInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const WeatherDetailInfoText = styled.span`
  color: rgba(7, 42, 65, 0.85);
  font-size: 34px;
`;

const WeatherDetailInfoImg = styled.div`
  width: 46px;
  height: 41px;
`;

const WeatherDetail: React.FC<WeatherDetailProps> = ({ title, info, icon }) => {
  return (
    <WeatherDetailContainer>
      <WeatherDetailTitle>{title}</WeatherDetailTitle>
      <WeatherDetailInfo>
        <WeatherDetailInfoText>{info}</WeatherDetailInfoText>
        <WeatherDetailInfoImg>
          <img src={icon} alt="" />
        </WeatherDetailInfoImg>
      </WeatherDetailInfo>
    </WeatherDetailContainer>
  );
}

export default WeatherDetail;
