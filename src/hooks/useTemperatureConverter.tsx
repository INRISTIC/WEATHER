import { useCallback } from 'react';
import { WeatherUnitType } from '../weather';

function useTemperatureConverter(weatherUnitType: WeatherUnitType) {
  return useCallback(
    (temp: number) => {
      if (weatherUnitType === WeatherUnitType.METRIC) {
        return Math.round(temp);
      }
      return parseFloat(temp.toFixed(1));
    },
    [weatherUnitType]
  );
}

export default useTemperatureConverter;
