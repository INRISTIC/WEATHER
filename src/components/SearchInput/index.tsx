import React, { useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { getWeatherData, setSearchValue } from '../../redux/slices/weatherSlice';
import { WeatherUnitType } from '../../../src/intarfeces';

import Loupe from '../../assets/images/loupe.svg';

interface ISearchInput {
  searchValue: string;
}

const SearchInputWrapper = styled.div`
  width: 100%;
  grid-area: input;
  display: flex;
  justify-content: space-between;
  border-bottom: rgba(255, 255, 255, 0.6) 2px solid;
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

const SearchInput: React.FC<ISearchInput> = ({ searchValue }) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const dispatch = useDispatch();

  const fetchWeatherDataBySearch = (location: string): void => {
    const payload = {
      location: {
        location,
        weatherUnitType: WeatherUnitType.METRIC,
      },
    };
    dispatch(setSearchValue(location));
    dispatch(getWeatherData(payload));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>): void => {
    fetchWeatherDataBySearch(inputValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      fetchWeatherDataBySearch(inputValue);
    }
  };

  return (
    <SearchInputWrapper>
      <StyledInput
        placeholder='E.g. Warsaw'
        onChange={handleInputChange}
        value={inputValue}
        onKeyUp={handleKeyPress}
      />
      <StyledButton onClick={handleSearchClick}>
        <img src={Loupe} alt="Search" />
      </StyledButton>
    </SearchInputWrapper>
  );
};

export default SearchInput;

