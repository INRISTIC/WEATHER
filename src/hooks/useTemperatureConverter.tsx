import { useCallback } from 'react';
import { WeatherUnitType } from '../../src/intarfeces';

function useTemperatureConverter(weatherUnitType: WeatherUnitType) {
  return useCallback((temp: number) => {
    if (weatherUnitType === WeatherUnitType.METRIC) {
      return Math.round(temp);
    }

    const fahrenheit = (temp * 9/5) + 32;
    return parseFloat(fahrenheit.toFixed(1));

  }, [weatherUnitType]);
}

export default useTemperatureConverter;