import { WeatherUnitType } from "../../../src/intarfeces";

export interface IWeatherState {
  error: boolean;
  loading: boolean;
  searchValue: string;
  weatherUnitType: WeatherUnitType;
  activeWeatherHourNumber: number;
  weatherData: Record<string, any>;
  suggestions: string[];
  selectedSuggestion: string;
}