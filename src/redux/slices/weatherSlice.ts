import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICityDate, IWeatherData, IWeatherState } from './intarfeces';
import { WeatherUnitType } from '../../weather';

const initialState: IWeatherState = {
  error: false,
  loading: false,
  searchValue: '',
  weatherUnitType: WeatherUnitType.METRIC,
  activeWeatherHourNumber: 0,
  cities: [],
  searchedCities: '',
  weatherData: {} as IWeatherData,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    putWeatherData(state, action: PayloadAction<any>) {
      state.weatherData = action.payload;

      state.loading = false;
      state.error = false;
    },
    getWeatherData(state) {
      state.loading = true;
      state.error = false;
    },
    getWeatherDataByCoords(state) {
      state.loading = true;
      state.error = false;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
      state.loading = false;
    },
    setTemperatureType(state, action: PayloadAction<WeatherUnitType>) {
      state.weatherUnitType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActiveWeatherHourNumber(state, action: PayloadAction<number>) {
      state.activeWeatherHourNumber = action.payload;
    },
    getCities(state, action: PayloadAction<string>) {},
    setSuggestions(state, action: PayloadAction<ICityDate[]>) {
      state.cities = action.payload;
    },
    setSelectedSuggestion(state, action: PayloadAction<string>) {
      state.searchedCities = action.payload;
    },
  },
});

export const {
  putWeatherData,
  getWeatherData,
  getWeatherDataByCoords,
  setError,
  setTemperatureType,
  setSearchValue,
  setActiveWeatherHourNumber,
  getCities,
  setSuggestions,
  setSelectedSuggestion,
} = weatherSlice.actions;

export default weatherSlice.reducer;
