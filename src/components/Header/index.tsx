import styled from 'styled-components';
import CitiesSearchSelect from '../CitiesSearchSelect';
import SwitchTheme from '../SwitchTheme';
import TemperatureTypeToggle from '../TemperatureTypeToggle';
import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useTheme from '../../hooks/useTheme';

const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 85% 5% auto;
  gap: 1rem;
  margin-bottom: 6rem;
  grid-template-areas: 'input toggle theme';

  &.error {
    margin-bottom: 10rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'toggle theme'
      'input input';
  }
`;

const Header = () => {
  const { error, searchValue, weatherUnitType } = useAppSelector(
    (state) => state.weather
  );

  return (
    <SettingsContainer className={!!error ? 'error' : ''}>
      <CitiesSearchSelect searchValue={searchValue} />
      <TemperatureTypeToggle weatherUnitType={weatherUnitType} />
      <SwitchTheme />
    </SettingsContainer>
  );
};

export default Header;
