import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IWeatherState } from './intarfeces';
import { WeatherUnitType } from '../../../src/intarfeces';


const initialState: IWeatherState = {
  error: false,
  loading: false,
  searchValue: '',
  weatherUnitType: WeatherUnitType.METRIC,
  activeWeatherHourNumber: 0,
  suggestions: [],
  selectedSuggestion: '',
  weatherData: {},
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
    getSuggestions(state, action: PayloadAction<string>) {
      console.log( action.payload)

    },
    setSuggestions(state, action: PayloadAction<string[]>) {
      state.suggestions = action.payload;
    },
    setSelectedSuggestion(state, action: PayloadAction<string>) {
      state.selectedSuggestion = action.payload;
    },
  },
});

export const { putWeatherData, getWeatherData, getWeatherDataByCoords, setError, setTemperatureType, setSearchValue, setActiveWeatherHourNumber, getSuggestions, setSuggestions, setSelectedSuggestion } = weatherSlice.actions;

export default weatherSlice.reducer;
