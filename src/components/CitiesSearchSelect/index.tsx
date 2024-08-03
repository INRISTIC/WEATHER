import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import {
  setSearchValue,
  getWeatherData,
  getCities,
  setSuggestions,
  setSelectedSuggestion,
} from '../../redux/slices/weatherSlice';
import { WeatherUnitType } from '../../weather';
import Loupe from '../../assets/images/loupe.svg';
import useAppSelector from '../../hooks/useAppSelector';

interface ISearchInput {
  searchValue: string;
}

const SearchInputWrapper = styled.div`
  width: 100%;
  position: relative;
  grid-area: input;
  padding: 0 0 5px;
  font-size: 22px;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus-visible {
    outline: none;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 1.25rem;
  background: none;
  border: none;
  padding: 0;
`;

const Search = styled.div`
  padding: 0 0 0.75rem;
  display: flex;
  border-bottom: rgba(255, 255, 255, 0.6) 2px solid;
`;

const SearchSelect = styled.select`
  font-family: 'Helvetica Neue', sans-serif;
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid var(--input-border-color: );
  border-radius: 0.25rem;
  background-color: var(--input-background);
  color: var(--input-hover-border-color);
  appearance: none;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    border-color: var(--input-border-color);
    background-color: var(--input-hover-background);
  }

  &:focus {
    outline: none;
    border-color: var(--input-hover-border-color);
  }
`;

const SearchOption = styled.option`
  background-color: var(--input-background);
  color: var(--input-color);

  &:hover {
    background-color: var(--input-hover-background);
  }
`;

const CitiesSearchSelect: React.FC<ISearchInput> = ({ searchValue }) => {
  const [inputValue, setSearchCityInputValue] = useState(searchValue);
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  const { cities, weatherUnitType } = useAppSelector((state) => state.weather);
  const searchedCities = useAppSelector(
    (state) => state.weather.searchedCities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      dispatch(getCities(inputValue));
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  const fetchWeatherDataBySearch = (city: string) => {
    const payload = {
      location: {
        location: city,
        weatherUnitType: weatherUnitType,
      },
    };
    dispatch(setSearchValue(city));
    dispatch(getWeatherData(payload));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCityInputValue(value);
    setIsSelectVisible(true);
  };

  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>) => {
    fetchWeatherDataBySearch(inputValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWeatherDataBySearch(inputValue);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    dispatch(setSelectedSuggestion(selectedValue));
  };

  const handleSelectClick = (cityName: string) => {
    setSearchCityInputValue(cityName);
    fetchWeatherDataBySearch(cityName);
    dispatch(setSuggestions([]));
    setIsSelectVisible(false);
  };

  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsSelectVisible(false);
  };

  const handleFocus = () => {
    setIsSelectVisible(true);
  };

  return (
    <SearchInputWrapper>
      <Search>
        <StyledInput
          placeholder="E.g. Warsaw"
          onChange={handleInputChange}
          value={inputValue}
          onKeyUp={handleKeyPress}
        />
        <StyledButton onClick={handleSearchClick}>
          <img src={Loupe} alt="Search" />
        </StyledButton>
      </Search>

      {!!cities.length && (
        <SearchSelect
          value={searchedCities}
          onChange={handleSelectChange}
          size={cities.length}
          onBlur={handleBlur}
          onFocus={handleFocus}
          hidden={!isSelectVisible}
        >
          {cities.map((city) => (
            <SearchOption
              key={city.code}
              value={city.name}
              onClick={() => handleSelectClick(city.name)}
            >
              {city.name}
            </SearchOption>
          ))}
        </SearchSelect>
      )}
    </SearchInputWrapper>
  );
};

export default CitiesSearchSelect;
