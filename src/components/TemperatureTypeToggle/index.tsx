import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  getWeatherData,
  getWeatherDataByCoords,
  setError,
  setTemperatureType,
} from '../../redux/slices/weatherSlice';
import { WeatherUnitType } from '../../weather';
import useAppSelector from '../../hooks/useAppSelector';

interface ITemperatureTypeToggle {
  weatherUnitType: WeatherUnitType;
}

const ToggleContainer = styled.div`
  grid-area: toggle;
  max-width: 163px;
  width: 100%;
  border-radius: 1.5rem;
  background-color: var(--toggle-background);
  padding: 0.5rem;
  gap: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button`
  color: #13264a33;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;

  &.toggle-btn--active {
    color: var(--toggle-text-color);
  }
`;

const TemperatureTypeToggle: React.FC<ITemperatureTypeToggle> = () => {
  const { searchValue, weatherUnitType, error } = useAppSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();
  const updateData = (weatherUnitTypeProps: WeatherUnitType) => {
    if (weatherUnitType === weatherUnitTypeProps) return;

    dispatch(setTemperatureType(weatherUnitTypeProps));

    if (!searchValue && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(
            getWeatherDataByCoords({
              lat: parseFloat(latitude.toFixed(1)),
              lon: parseFloat(longitude.toFixed(1)),
              weatherUnitType: weatherUnitTypeProps,
            })
          );
        },
        () => {
          console.error('Error getting location', error);
          dispatch(setError(true));
        }
      );
      return;
    }

    const payload = {
      location: {
        location: searchValue,
        weatherUnitType: weatherUnitTypeProps,
      },
    };
    dispatch(getWeatherData(payload));
  };

  return (
    <ToggleContainer>
      <ToggleButton
        className={
          weatherUnitType === WeatherUnitType.METRIC ? 'toggle-btn--active' : ''
        }
        onClick={() => updateData(WeatherUnitType.METRIC)}
      >
        C
      </ToggleButton>
      /
      <ToggleButton
        className={
          weatherUnitType === WeatherUnitType.IMPERIAL
            ? 'toggle-btn--active'
            : ''
        }
        onClick={() => updateData(WeatherUnitType.IMPERIAL)}
      >
        F
      </ToggleButton>
    </ToggleContainer>
  );
};

export default TemperatureTypeToggle;
