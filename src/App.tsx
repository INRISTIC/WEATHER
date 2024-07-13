import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherDataByCoords, setError, setActiveWeatherHourNumber } from './redux/slices/weatherSlice';
import styled, { ThemeProvider } from 'styled-components';

import useTheme, { Theme } from './hooks/useTheme';
import useTemperatureConverter from './hooks/useTemperatureConverter';

import SearchInput from './components/SearchInput';
import TemperatureTypeToggle from './components/TemperatureTypeToggle';
import DayWeatherInfo from './components/DayWeatherInfo';
import DayTemperatureInfo from './components/DayTemperatureInfo';
import Error from './components/Error';
import Loader from './components/Loader';
import WeatherDetails from './components/WeatherDetails';
import ToggleTheme from './components/ToggleTheme';

import { darkTheme, lightTheme } from './theme';
import { GlobalStyle } from './GlobalStyles';




const AppContainer = styled.div`
  width: 100%;
  max-width: 1290px;
  padding: 2rem;
  margin: 0 auto;
  font-size: 16px;
  color: #333;
`;

const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 85% 5% auto;
  gap: 1rem;
  margin-bottom: 6rem;
  grid-template-areas:
    "input toggle theme";

  &.error {
    margin-bottom: 10rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "toggle theme"
      "input input";
  }
`;

const DayInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14rem;

  @media (max-width: 1100px) {
    justify-content: space-evenly;
  }

  @media (max-width: 726px) {
    flex-direction: column;
    gap: 5rem;

  }
`;

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



const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  const { loading, error, searchValue, weatherData, weatherUnitType, activeWeatherHourNumber } = useSelector((state: any) => state.weather);
  const convertTemperature = useTemperatureConverter(weatherUnitType);
  
  const dispatch = useDispatch();

  const fetchWeatherDataByCoords = (lat: number, lon: number): void => {
    dispatch(getWeatherDataByCoords({ lat, lon, weatherUnitType }));
  };


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoords(parseFloat(latitude.toFixed(1)), parseFloat(longitude.toFixed(1)));
        },
        () => {
          console.error('Error getting location', error);
          dispatch(setError(true));
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
    <ThemeProvider theme={theme === Theme.LIGHT ? lightTheme : darkTheme}>
    <GlobalStyle />
        <AppContainer>
          <SettingsContainer className={!!error ? 'error' : ''}>
            <SearchInput searchValue={searchValue} />
            <TemperatureTypeToggle theme={theme} weatherUnitType={weatherUnitType} />
            <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
          </SettingsContainer>

          {loading ? (
            <Loader />
          ) : (
            error || !weatherData.current ? (
              <Error />
            ) : (
              <>
                <DayInfoContainer>
                  <DayWeatherInfo
                    degrees={`${convertTemperature(weatherData.hourly[activeWeatherHourNumber].temp)}°`}
                    location={weatherData.timezone}
                    imageHref={weatherData.hourly[activeWeatherHourNumber].weather[0].icon}
                  />
                  <DayHoursInfoContainer>
                    {weatherData.hourly.slice(0, 8).map((hourWeatherInfo: any, index: number) => (
                      <DayTemperatureInfo
                        index={index}
                        key={hourWeatherInfo.dt}
                        activeWeatherHourNumber={activeWeatherHourNumber}
                        degrees={convertTemperature(hourWeatherInfo.temp)}
                        time={hourWeatherInfo.dt + weatherData.timezone_offset}
                        imageHref={hourWeatherInfo.weather[0].icon}
                        setActiveWeatherHourNumber={() => dispatch(setActiveWeatherHourNumber(index))}
                      />
                    ))}
                  </DayHoursInfoContainer>
                </DayInfoContainer>

                <WeatherDetails
                  weatherData={weatherData}
                  activeWeatherHourNumber={activeWeatherHourNumber}
                  convertTemperature={convertTemperature}
                />
              </>
            )
          )}
        </AppContainer>
      </ThemeProvider>
      
    </>
  );
};

export default App;
