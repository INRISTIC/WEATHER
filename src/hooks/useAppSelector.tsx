import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IWeatherState } from '../redux/slices/intarfeces';

export interface IWeatherSelectorState {
  weather: IWeatherState;
}

const useAppSelector: TypedUseSelectorHook<IWeatherSelectorState> = useSelector;

export default useAppSelector;
