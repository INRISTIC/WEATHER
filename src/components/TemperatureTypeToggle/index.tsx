import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setTemperatureType } from '../../redux/slices/weatherSlice';
import { WeatherUnitType } from '../../../src/intarfeces';
import { Theme } from '../../../src/hooks/useTheme';

interface ITemperatureTypeToggle {
  weatherUnitType: WeatherUnitType;
  theme: Theme
}

const Toggle = styled.div<{ theme: string }>`
  grid-area: toggle;
  max-width: 163px;
  width: 100%;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme === Theme.LIGHT ? 'white' : '#d8dbe0'};;
  padding: 0.5rem;
  gap: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button<{ theme: string }>`
  color: #13264A33;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
  
  &.toggle-btn--active {
    color: ${({ theme }) =>  theme === Theme.LIGHT ? '#1AAFE0' : '#28292c'};
  }
`;

const TemperatureTypeToggle: React.FC<ITemperatureTypeToggle> = ({ weatherUnitType, theme }) => {
  const dispatch = useDispatch();
  return (
    <Toggle theme={theme}>
      <ToggleButton 
        theme={theme}
        className={weatherUnitType === WeatherUnitType.METRIC ? 'toggle-btn--active' : ''} 
        onClick={() => dispatch(setTemperatureType(WeatherUnitType.METRIC))}>
        C
      </ToggleButton>
      /
      <ToggleButton 
        theme={theme}
        className={weatherUnitType === WeatherUnitType.IMPERIAL ? 'toggle-btn--active' : ''} 
        onClick={() => dispatch(setTemperatureType(WeatherUnitType.IMPERIAL))}>
        F
      </ToggleButton>
    </Toggle>
  );
};

export default TemperatureTypeToggle;