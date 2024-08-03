import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getWeatherDataByCoords, setError } from './redux/slices/weatherSlice';

import useTemperatureConverter from './hooks/useTemperatureConverter';

import DayWeatherInfo from './components/DayWeatherInfo';
import Error from './components/Error';
import Loader from './components/Loader';
import WeatherDetails from './components/WeatherDetails';
import Header from './components/Header';
import WeatherHourly from './components/WeatherHourly';
import useAppSelector from './hooks/useAppSelector';

import ThemeProvider from './Theme';
import { GlobalStyle } from './GlobalStyles';

const AppContainer = styled.div`
  width: 100%;
  max-width: 1290px;
  padding: 2rem;
  margin: 0 auto;
  font-size: 16px;
  color: #333;
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

const App: React.FC = () => {
  const {
    loading,
    error,
    weatherData,
    weatherUnitType,
    activeWeatherHourNumber,
  } = useAppSelector((state) => state.weather);

  const convertTemperature = useTemperatureConverter(weatherUnitType);

  const dispatch = useDispatch();

  const fetchWeatherDataByCoords = (lat: number, lon: number) => {
    dispatch(getWeatherDataByCoords({ lat, lon, weatherUnitType }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoords(
            parseFloat(latitude.toFixed(1)),
            parseFloat(longitude.toFixed(1))
          );
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
      <ThemeProvider>
        <GlobalStyle />
        <AppContainer>
          <Header />

          {loading ? (
            <Loader />
          ) : error || !weatherData.current ? (
            <Error />
          ) : (
            <>
              <DayInfoContainer>
                <DayWeatherInfo
                  degrees={`${convertTemperature(
                    weatherData.hourly[activeWeatherHourNumber].temp
                  )}°`}
                  location={weatherData.timezone}
                  imageSrc={
                    weatherData.hourly[activeWeatherHourNumber].weather[0].icon
                  }
                />
                <WeatherHourly convertTemperature={convertTemperature} />
              </DayInfoContainer>
              <WeatherDetails
                convertTemperature={convertTemperature}
                weatherData={weatherData}
                activeWeatherHourNumber={activeWeatherHourNumber}
              />
            </>
          )}
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
